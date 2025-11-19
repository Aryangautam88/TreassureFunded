import React, { useState, useEffect } from "react";
import "./Profile.css";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const defaultImage = "/default-image1.png";
  const API_BASE =
    process.env.REACT_APP_BACKEND_URL?.replace(/\/+$/, "") || "https://api.treassurefunded.com";
    // process.env.REACT_APP_BACKEND_URL?.replace(/\/+$/, "") || "http://treassurefunded:5000";
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    dob: "",
    address: "",
    profession: "",
    profileImage: null,
    imagePreview: defaultImage,
    linkedin: "",
    github: "",
    social: "",
    bio: "",
    skills: "",
    experience: "",
    education: "",
    website: "",
  });

  /** ---------------- Toast ---------------- **/
  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "" }), 3000);
  };

  /** ---------------- Fetch Profile ---------------- **/
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!username || !token) {
          setLoading(false);
          return;
        }
        const res = await fetch(`${API_BASE}/api/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to fetch profile");

        setProfile((prev) => ({
          ...prev,
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          country: data.country || "",
          dob: data.dob || "",
          address: data.address || "",
          profession: data.profession || "",
          linkedin: data.linkedin || "",
          github: data.github || "",
          social: data.social || "",
          bio: data.bio || "",
          skills: data.skills || "",
          experience: data.experience || "",
          education: data.education || "",
          website: data.website || "",
          imagePreview: data.profileImage
            ? data.profileImage.startsWith("http")
              ? data.profileImage
              : `${API_BASE}/uploads/${data.profileImage}`
            : defaultImage,
        }));
      } catch (err) {
        showToast(err.message, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [API_BASE, username, token]);

  /** ---------------- Handlers ---------------- **/
  const handleProfileChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfile({
        ...profile,
        profileImage: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleImageError = () =>
    setProfile((prev) => ({ ...prev, imagePreview: defaultImage }));

  /** ---------------- Validation ---------------- **/
  const validateStep1 = () => {
    const required = [
      "fullName",
      "email",
      "phone",
      "country",
      "dob",
      "address",
      "profession",
    ];
    for (const field of required) {
      if (!profile[field]) {
        showToast(`Please fill in ${field}`, "error");
        return false;
      }
    }
    return true;
  };

  const validateStep2 = () => true; // optional fields, no strict validation

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(step + 1);
  };

  /** ---------------- Submit ---------------- **/
  const handleSubmitAll = async () => {
    if (!validateStep1() || !validateStep2()) return;
    if (!username || !token) {
      showToast("User not logged in", "error");
      return;
    }

    let useFormData = !!profile.profileImage;
    let body;
    let headers = { Authorization: `Bearer ${token}` };

    if (useFormData) {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => {
        if (key === "profileImage" && value) formData.append("profileImage", value);
        else if (key !== "imagePreview") formData.append(key, value || "");
      });
      body = formData;
    } else {
      body = JSON.stringify({ ...profile, profileImage: undefined });
      headers["Content-Type"] = "application/json";
    }

    try {
      const res = await fetch(`${API_BASE}/api/users/profile`, {
        method: "PUT",
        headers,
        body,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || "Failed to complete profile");

      // ✅ Thank You toast
      showToast("Thank you! Your profile has been updated successfully.", "success");

      // Reset back to Step 1
      setStep(1);

      if (result?.user?.profileImage) {
        setProfile((prev) => ({
          ...prev,
          imagePreview: result.user.profileImage.startsWith("http")
            ? result.user.profileImage
            : `${API_BASE}/uploads/${result.user.profileImage}`,
          profileImage: null,
        }));
      }
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  /** ---------------- Helpers ---------------- **/
  const headings = {
    1: { title: "Personal Info", icon: <FaUserCircle /> },
    2: { title: "Additional Details", icon: <FaUserCircle /> },
    3: { title: "Review & Finish", icon: <FaUserCircle /> },
  };

  const profileCompletion = () => {
    const total = 7;
    const keys = [
      "fullName",
      "email",
      "phone",
      "country",
      "dob",
      "address",
      "profession",
    ];
    const filled = keys.reduce((acc, k) => acc + (profile[k] ? 1 : 0), 0);
    return Math.round((filled / total) * 100);
  };

  if (loading) {
    return (
      <div className="pf-container">
        <div className="pf-card">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pf-container">
      <div className="pf-header">
        <h2>
          {headings[step].icon} {headings[step].title}
        </h2>
        <p>Step {step} of 3</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${profileCompletion()}%` }} />
        </div>
      </div>

      <div className="pf-card">
        {step === 1 && (
          <div className="step step1">
            <div className="avatar-section">
              <img src={profile.imagePreview} onError={handleImageError} alt="Profile" />
              <label className="upload-btn">
                Change Photo
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
            <div className="form">
              {["fullName","email","phone","country","dob","address","profession"].map(
                (field) => (
                  <input
                    key={field}
                    type={field === "dob" ? "date" : "text"}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={profile[field]}
                    onChange={handleProfileChange}
                    required
                  />
                )
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step step2">
            <div className="step-2-card">
              <h3>Additional Details</h3>
              <div className="form">
                {[
                  { name: "linkedin", placeholder: "LinkedIn Profile" },
                  { name: "github", placeholder: "GitHub Profile" },
                  { name: "social", placeholder: "Twitter / Other Social" },
                  { name: "bio", placeholder: "Short Bio" },
                  { name: "skills", placeholder: "Skills (comma separated)" },
                  { name: "experience", placeholder: "Experience (e.g., 3 years)" },
                  { name: "education", placeholder: "Education" },
                  { name: "website", placeholder: "Website / Portfolio" },
                ].map((field) => (
                  <input
                    key={field.name}
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={profile[field.name] || ""}
                    onChange={handleProfileChange}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step step3">
            <div className="step-3-card">
              <h3>Review Your Info</h3>
              {Object.entries(profile)
                .filter(([k]) => k !== "profileImage" && k !== "imagePreview")
                .map(([key, value]) => (
                  <div className="info-row" key={key}>
                    <span className="info-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <span className="info-value">{value || "-"}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="navigation">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="back-btn">
            Back
          </button>
        )}
        {step < 3 ? (
          <button onClick={handleNext} className="next-btn">
            Next
          </button>
        ) : (
          <button onClick={handleSubmitAll} className="finish-btn">
            Finish
          </button>
        )}
      </div>

      {toast.visible && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
};

export default Profile;
