// edit.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./edit.css";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MIN_PASSWORD_LENGTH = 6;

const EditProfilePage = () => {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    phoneNumber: "",
    address: "",
    email: ""
  });
  const [originalEmail, setOriginalEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const [emailStatus, setEmailStatus] = useState("idle");
  const emailTimer = useRef(null);
  const latestCheckId = useRef(0);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch user and prefill form
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        // IMPORTANT: backend returns { success: true, data: user }
        const user = res.data.data;
        if (!user) throw new Error("No user data returned");

        setForm({
          fullName: user.fullName || user.name || "",
          age: user.age ? String(user.age) : "",
          phoneNumber: user.phoneNumber || "",
          address: user.address || "",
          email: user.email || ""
        });
        setOriginalEmail(user.email || "");
        if (user.avatar) setPreview(`/uploads/${user.avatar}`);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        // If token invalid or expired, clear and redirect to login
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, navigate]);

  // Preview selected avatar
  useEffect(() => {
    if (!avatarFile) return;
    const url = URL.createObjectURL(avatarFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  // Debounced email uniqueness check
  useEffect(() => {
    if (emailTimer.current) {
      clearTimeout(emailTimer.current);
      emailTimer.current = null;
    }

    const email = (form.email || "").trim();
    if (!email) {
      setEmailStatus("idle");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailStatus("invalid");
      return;
    }
    if (email === originalEmail) {
      setEmailStatus("available");
      return;
    }

    setEmailStatus("checking");
    emailTimer.current = setTimeout(async () => {
      const checkId = ++latestCheckId.current;
      try {
        const res = await axios.post(
          "/api/auth/check-email",
          { email },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (checkId !== latestCheckId.current) return;
        const exists = !!res.data?.exists;
        setEmailStatus(exists ? "taken" : "available");
      } catch (err) {
        console.error("Email check failed:", err);
        setEmailStatus("idle");
      }
    }, 550);

    return () => {
      if (emailTimer.current) clearTimeout(emailTimer.current);
    };
  }, [form.email, originalEmail, token]);

  const handleFile = (e) => {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const passwordFieldsFilled = oldPassword || newPassword || confirmPassword;
  const passwordValid =
    !passwordFieldsFilled ||
    (oldPassword.length > 0 &&
      newPassword.length >= MIN_PASSWORD_LENGTH &&
      newPassword === confirmPassword);

  const isSubmitDisabled =
    processing ||
    emailStatus === "checking" ||
    emailStatus === "invalid" ||
    emailStatus === "taken" ||
    !passwordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailStatus === "checking") return alert("Email verification in progress. Please wait.");
    if (emailStatus === "invalid") return alert("Please enter a valid email.");
    if (emailStatus === "taken") return alert("Email already registered. Use another email.");
    if (!passwordValid) return alert("Password fields invalid or do not match.");

    setProcessing(true);

    try {
      // Optional: change password first if provided
      if (passwordFieldsFilled) {
        if (!oldPassword || !newPassword || !confirmPassword) {
          setProcessing(false);
          return alert("To change password, fill all password fields.");
        }
        if (newPassword !== confirmPassword) {
          setProcessing(false);
          return alert("New password and confirmation do not match.");
        }
        if (newPassword.length < MIN_PASSWORD_LENGTH) {
          setProcessing(false);
          return alert(`New password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
        }

        const passRes = await axios.post(
          "/api/auth/change-password",
          { oldPassword, newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!passRes.data?.success) {
          setProcessing(false);
          return alert(passRes.data?.message || "Password change failed.");
        }
      }

      // Update profile
      const fd = new FormData();
      fd.append("fullName", form.fullName);
      fd.append("age", form.age);
      fd.append("phoneNumber", form.phoneNumber);
      fd.append("address", form.address);
      fd.append("email", form.email);
      if (avatarFile) fd.append("avatar", avatarFile);

      const res = await axios.put("/api/auth/edit-profile", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data?.success) {
        navigate("/dashboard");
      } else {
        alert(res.data?.message || "Profile update failed.");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      alert(err?.response?.data?.message || "Profile update failed.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div className="edit-page">
      <div className="edit-card">
        <div className="left-col">
          <div className="avatar-wrap">
            {preview ? <img src={preview} alt="avatar" /> : <span>U</span>}
          </div>
          <div className="meta-name">{form.fullName || "User"}</div>
          <div className="meta-sub">Edit your profile details</div>
        </div>

        <div className="right-col">
          <h2>Edit Profile</h2>

          <form onSubmit={handleSubmit}>
            <div className="info-row">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="info-row">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                min="0"
                value={form.age}
                onChange={handleChange}
              />
            </div>

            <div className="info-row">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={form.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="info-row">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div className="info-row">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <div style={{ marginTop: 8, fontSize: 13 }}>
                {emailStatus === "checking" && <span>Checking email…</span>}
                {emailStatus === "available" && <span>Email is available</span>}
                {emailStatus === "taken" && <span>Email already registered</span>}
                {emailStatus === "invalid" && <span>Invalid email format</span>}
                {emailStatus === "idle" && <span>Enter email to verify</span>}
              </div>
            </div>

            <hr style={{ margin: "18px 0", border: "none", borderTop: "1px solid #eee" }} />

            <h3 style={{ margin: "6px 0 12px" }}>Change Password (optional)</h3>

            <div className="info-row">
              <label htmlFor="oldPassword">Old Password</label>
              <input
                id="oldPassword"
                name="oldPassword"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>

            <div className="info-row">
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
              />
            </div>

            <div className="info-row">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
              />
            </div>

            <div className="info-row">
              <label htmlFor="avatar">Upload Avatar</label>
              <div className="file-row">
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                />
                {preview && (
                  <div className="preview-inline" aria-hidden>
                    <img src={preview} alt="preview" />
                  </div>
                )}
              </div>
            </div>

            <button className="save-btn" type="submit" disabled={isSubmitDisabled}>
              {processing ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
