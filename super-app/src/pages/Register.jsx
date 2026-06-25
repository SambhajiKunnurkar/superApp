import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

const Register = () => {
  const navigate = useNavigate();
  const setUser  = useStore((s) => s.setUser);

  const [formData, setFormData] = useState({ name: "", username: "", email: "", mobile: "" });
  const [errors, setErrors]     = useState({});
  const [agreed, setAgreed]     = useState(false);
  const [agreeErr, setAgreeErr] = useState("");

  const nameRx  = /^[a-zA-Z\s]+$/;
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRx = /^\d{10}$/;

  const validate = () => {
    const e = {};
    if (!formData.name.trim() || !nameRx.test(formData.name.trim()))
      e.name = "Name is required (alphabets only).";
    if (!formData.username.trim() || /\s/.test(formData.username))
      e.username = "Username is required (no spaces allowed).";
    if (!emailRx.test(formData.email))
      e.email = "Please enter a valid email address.";
    if (!phoneRx.test(formData.mobile))
      e.mobile = "Mobile must be exactly 10 digits.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) { setAgreeErr("Check this box if you want to proceed."); return; }
    setAgreeErr("");
    if (validate()) { setUser(formData); navigate("/categories"); }
  };

  const inputClass = (field) =>
    `w-full bg-[#252525] text-white text-sm px-4 py-3 rounded outline-none placeholder-[#555555] border transition-colors ${
      errors[field] ? "border-red-500" : "border-transparent focus:border-[#72db73]"
    }`;

  return (
    <div className="min-h-screen flex bg-black select-none">
      
      {/* ── LEFT — concert hero image ── */}
      <div className="flex-1 relative hidden md:block h-screen">
        <img
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=80"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        {/* bottom-left tagline box */}
        <div className="absolute bottom-16 left-12 max-w-lg">
          <h1 className="text-white font-black text-5xl tracking-wide leading-tight">
            Discover new things on Superapp
          </h1>
        </div>
      </div>

      {/* ── RIGHT — dark form panel ── */}
      <div className="w-full md:w-[50%] flex-shrink-0 bg-black flex items-center justify-center px-6 md:px-16">
        <div className="w-full max-w-[400px]">
          
          {/* Title Logo */}
          <h1 className="text-[#72db73] text-4xl font-normal text-center tracking-normal mb-2 font-sans">
            Super app
          </h1>
          <p className="text-white text-sm text-center mb-10 tracking-wide font-light">
            Create your new account
          </p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col">
            
            {/* Name */}
            <div className="mb-4">
              <input className={inputClass("name")} type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
              {errors.name && <p className="text-red-500 text-[11px] mt-1 px-1">{errors.name}</p>}
            </div>

            {/* Username */}
            <div className="mb-4">
              <input className={inputClass("username")} type="text" name="username" placeholder="UserName" value={formData.username} onChange={handleChange} />
              {errors.username && <p className="text-red-500 text-[11px] mt-1 px-1">{errors.username}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <input className={inputClass("email")} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              {errors.email && <p className="text-red-500 text-[11px] mt-1 px-1">{errors.email}</p>}
            </div>

            {/* Mobile */}
            <div className="mb-4">
              <input className={inputClass("mobile")} type="tel" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} />
              {errors.mobile && <p className="text-red-500 text-[11px] mt-1 px-1">{errors.mobile}</p>}
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3 mt-2 mb-1">
              <input
                id="agree" type="checkbox" checked={agreed}
                onChange={(e) => { setAgreed(e.target.checked); setAgreeErr(""); }}
                className="w-4 h-4 accent-[#72db73] cursor-pointer bg-[#252525] border-none rounded-sm"
              />
              <label htmlFor="agree" className="text-[#7e7e7e] text-xs cursor-pointer font-medium">
                Share my registration data with Superapp
              </label>
            </div>
            {agreeErr && <p className="text-red-500 text-[11px] mb-2 px-1">{agreeErr}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#72db73] text-white font-bold text-base py-3 rounded-full mt-6 tracking-widest hover:bg-[#5fc260] transition-colors"
            >
              SIGN UP
            </button>

            {/* Terms Links */}
            <div className="text-left mt-6 px-1">
              <p className="text-[11px] text-[#7e7e7e] leading-relaxed">
                By clicking on Sign up, you agree to Superapp{" "}
                <a href="#" className="text-[#72db73] font-medium hover:underline">Terms and Conditions of Use</a>
              </p>
              <p className="text-[11px] text-[#7e7e7e] mt-4 leading-relaxed">
                To learn more about how Superapp collects, uses, shares and protects your personal data please head Superapp{" "}
                <a href="#" className="text-[#72db73] font-medium hover:underline">Privacy Policy</a>
              </p>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Register;