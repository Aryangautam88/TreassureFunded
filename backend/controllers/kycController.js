const Kyc = require("../models/Kyc");

// @desc    Submit new KYC
// @route   POST /api/kyc
// @access  Private (assumes user is authenticated)
exports.submitKyc = async (req, res) => {
  try {
    const { idType, idFrontUrl, idBackUrl } = req.body;

    // Validate
    if (!idType || !idFrontUrl) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Check if KYC already exists for user
    const existing = await Kyc.findOne({ userId: req.user.id });
    if (existing) {
      return res.status(400).json({ message: "KYC already submitted" });
    }

    const newKyc = new Kyc({
      userId: req.user.id,
      idType,
      idFrontUrl,
      idBackUrl: idType !== "Passport" ? idBackUrl : undefined,
    });

    await newKyc.save();
    res.status(201).json({ message: "KYC submitted successfully", kyc: newKyc });
  } catch (err) {
    console.error("Error in submitKyc:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get current user's KYC status
// @route   GET /api/kyc
// @access  Private
exports.getMyKyc = async (req, res) => {
  try {
    const kyc = await Kyc.findOne({ userId: req.user.id });
    if (!kyc) return res.status(404).json({ message: "No KYC found" });

    res.status(200).json(kyc);
  } catch (err) {
    console.error("Error in getMyKyc:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Approve or reject KYC (admin only)
// @route   PUT /api/kyc/:id
// @access  Admin
exports.updateKycStatus = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;

    const kyc = await Kyc.findById(req.params.id);
    if (!kyc) return res.status(404).json({ message: "KYC not found" });

    kyc.status = status;
    kyc.reviewedAt = new Date();
    if (status === "rejected") kyc.rejectionReason = rejectionReason;

    await kyc.save();
    res.status(200).json({ message: "KYC status updated", kyc });
  } catch (err) {
    console.error("Error in updateKycStatus:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
