import React, { useState } from "react";
import { loginUser, setAuthToken } from "../../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      const res = await loginUser(form);
      const { token, user } = res.data;
      localStorage.setItem("bf_token", token);
      setAuthToken(token);
      alert("Welcome, " + user.name);
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="auth-card">
      <h3>Login</h3>
      <input name="email" placeholder="Email" onChange={handle} />
      <input name="password" placeholder="Password" onChange={handle} type="password" />
      <button onClick={submit}>Login</button>
    </div>
  );
}
