import React, { useState } from "react";
import { registerUser, setAuthToken } from "../../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      const res = await registerUser(form);
      const { token, user } = res.data;
      localStorage.setItem("bf_token", token);
      setAuthToken(token);
      alert("Registered: " + user.name);
      // navigate to profile or home
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="auth-card">
      <h3>Register</h3>
      <input name="name" placeholder="Name" onChange={handle} />
      <input name="email" placeholder="Email" onChange={handle} />
      <input name="password" placeholder="Password" onChange={handle} type="password" />
      <button onClick={submit}>Register</button>
    </div>
  );
}
