import React, { useState, useEffect } from "react";
import API, { setAuthToken } from "../../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("bf_token");
    if (token) setAuthToken(token);
    // simplest approach: JWT contains id & email; you can call endpoint to get user if you add /api/auth/me
    // For now we read user info stored when logged in (better to fetch from server)
  }, []);

  // simple theme toggle stored in user record via API (we'll add endpoint optional)
  return (
    <div className="profile-card">
      <h3>Profile</h3>
      <p>Manage your profile and preferences here.</p>
      {/* Add inputs to change name, bio, contact and call update API (not shown here to keep simple) */}
    </div>
  );
}
