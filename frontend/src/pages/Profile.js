import React, { useState, useEffect } from "react";
import "./Profile.css";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const defaultImage = "/default-image1.png";
  const API_BASE =
    process.env.REACT_APP_BACKEND_URL?.replace(/\/+$/, "") ||
    "https://api.treassurefunded.com";

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "",
  });

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
  });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "" }), 3000);
  };

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

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
  };

  const handleSubmitAll = async () => {
    if (!validateStep1()) return;

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
        if (key === "profileImage" && value)
          formData.append("profileImage", value);
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
      if (!res.ok)
        throw new Error(result?.message || "Failed to complete profile");

      showToast("Thank you! Your profile has been updated.", "success");

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

  const headings = {
    1: { title: "Personal Info", icon: <FaUserCircle /> },
    2: { title: "Review & Finish", icon: <FaUserCircle /> },
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
        <p>Step {step} of 2</p>

        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${profileCompletion()}%` }}
          />
        </div>
      </div>

      <div className="pf-card">
        {step === 1 && (
          <div className="step step1">
            <div className="avatar-section">
              <img
                src={profile.imagePreview}
                onError={handleImageError}
                alt="Profile"
              />
              <label className="upload-btn">
                Change Photo
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>

            <div className="form">
              {[
                "fullName",
                "email",
                "phone",
                "country",
                "dob",
                "address",
                "profession",
              ].map((field) => (
                <input
                  key={field}
                  type={field === "dob" ? "date" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={profile[field]}
                  onChange={handleProfileChange}
                  required
                />
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step step3">
            <div className="step-3-card">
              <h3>Review Your Info</h3>

              {Object.entries(profile)
                .filter(([k]) => k !== "profileImage" && k !== "imagePreview")
                .map(([key, value]) => (
                  <div className="info-row" key={key}>
                    <span className="info-label">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
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

        {step < 2 ? (
          <button onClick={handleNext} className="next-btn">
            Next
          </button>
        ) : (
          <button onClick={handleSubmitAll} className="finish-btn">
            Finish
          </button>
        )}
      </div>

      {toast.visible && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}
    </div>
  );
};

export default Profile;
