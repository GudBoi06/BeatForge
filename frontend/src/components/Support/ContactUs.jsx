import React, { useState } from "react";
import { sendContact } from "../../services/api";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    try {
      await sendContact(form);
      alert("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      alert("Failed to send message");
    }
  };

  return (
    <div className="support-page">
      <h2>Contact Us</h2>
      <p>Have a question or need help? Reach out to us.</p>

      <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Your Email" value={form.email} onChange={handleChange} />
      <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} />

      <button onClick={submitForm}>Send Message</button>
    </div>
  );
}
