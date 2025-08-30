import { useState } from "react";
import "./Signup.css";

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

try{

    const res = await fetch("https://recipe-app-backend-2-23l5.onrender.com/api/auth/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});


      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Signup failed");
      }

      alert("Signup successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Sign Up</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
}

export default Signup;
