const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const verifyToken = require("../middleware/verifyToken");
const Kyc = require("../models/Kyc");
const User = require("../models/User");

const router = express.Router();

/* ---------- Multer storage ---------- */
const uploadDir = path.join(__dirname, "../uploads/kyc");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});
const upload = multer({ storage });

/* ---------- GET /api/kyc/me ---------- */
/* Returns profile prefill (from User) + any existing KYC */
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("fullName email dob username");
    if (!user) return res.status(404).json({ msg: "User not found" });

    const kyc = await Kyc.findOne({ userId: req.user.id });

    return res.json({
      // Prefill fields:
      fullName: user.fullName || "",
      email: user.email || "",
      dob: user.dob || "",

      // Existing KYC (if any):
      documentType: kyc?.documentType || "",
      idFront: kyc?.idFront || "",
      idBack: kyc?.idBack || "",
      status: kyc?.status || "not_submitted",
      kycId: kyc?._id || null,
    });
  } catch (err) {
    console.error("GET /api/kyc/me error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ---------- POST /api/kyc ---------- */
/* Submit KYC once; prevents duplicates except rejected ones */
router.post(
  "/",
  verifyToken,
  upload.fields([{ name: "idFront", maxCount: 1 }, { name: "idBack", maxCount: 1 }]),
  async (req, res) => {
    try {
      const { fullName, email, dob, documentType } = req.body;

      if (!fullName || !email || !dob || !documentType) {
        return res.status(400).json({ msg: "All fields are required" });
      }
      if (!req.files || !req.files.idFront) {
        return res.status(400).json({ msg: "ID Front image is required" });
      }

      // Check existing KYC
      const existingKyc = await Kyc.findOne({ userId: req.user.id });
      if (existingKyc && existingKyc.status !== "rejected") {
        return res.status(400).json({ msg: "KYC already submitted", status: existingKyc.status });
      }

      const idFront = `/uploads/kyc/${req.files.idFront[0].filename}`;
      const idBack = req.files.idBack?.length ? `/uploads/kyc/${req.files.idBack[0].filename}` : "";

      let kycData = {
        userId: req.user.id,
        fullName,
        email,
        dob,
        documentType,
        idFront,
        idBack,
        status: "pending",
      };

      let created;
      if (existingKyc) {
        existingKyc.set(kycData);
        created = await existingKyc.save();
      } else {
        created = await Kyc.create(kycData);
      }

      return res.json({
        msg: "KYC submitted successfully",
        idFront: created.idFront,
        idBack: created.idBack,
        status: created.status,
      });
    } catch (err) {
      console.error("POST /api/kyc error:", err);
      res.status(500).json({ msg: "Server error" });
    }
  }
);
/* ---------- GET /api/kyc/all (Admin Only) ---------- */
router.get("/all", verifyToken, async (req, res) => {
  try {
    // ✅ Optional: Check if the user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied. Admin only." });
    }

    const kycs = await Kyc.find().populate("userId", "username email");
    res.json(kycs);
  } catch (err) {
    console.error("GET /api/kyc/all error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});
// Approve / Reject KYC (Admin only)
router.put("/:id/status", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied. Admin only." });
    }

    const { status, rejectionReason } = req.body;
    const kyc = await Kyc.findById(req.params.id);
    if (!kyc) return res.status(404).json({ msg: "KYC not found" });

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    kyc.status = status;
    if (status === "rejected") kyc.rejectionReason = rejectionReason;

    await kyc.save();

    res.json({ msg: `KYC ${status}`, kyc });
  } catch (err) {
    console.error("PUT /api/kyc/:id/status error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ---------- PATCH /api/kyc ---------- */
/* Allow user to update files ONLY if not approved yet */
router.patch(
  "/",
  verifyToken,
  upload.fields([{ name: "idFront", maxCount: 1 }, { name: "idBack", maxCount: 1 }]),
  async (req, res) => {
    try {
      const kyc = await Kyc.findOne({ userId: req.user.id });
      if (!kyc) return res.status(404).json({ msg: "KYC not found" });
      if (kyc.status === "approved") {
        return res.status(400).json({ msg: "KYC already approved; cannot update" });
      }

      if (req.body.fullName) kyc.fullName = req.body.fullName;
      if (req.body.email) kyc.email = req.body.email;
      if (req.body.dob) kyc.dob = req.body.dob;
      if (req.body.documentType) kyc.documentType = req.body.documentType;

      if (req.files?.idFront) kyc.idFront = `/uploads/kyc/${req.files.idFront[0].filename}`;
      if (req.files?.idBack) kyc.idBack = `/uploads/kyc/${req.files.idBack[0].filename}`;

      await kyc.save();

      res.json({ msg: "KYC updated", idFront: kyc.idFront, idBack: kyc.idBack, status: kyc.status });
    } catch (err) {
      console.error("PATCH /api/kyc error:", err);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
