import React from 'react';

const Register = () => {
  return (
    <div className="min-h-screen flex bg-black select-none">

      {/* ── LEFT — concert hero image ── */}
      <div className="hidden md:flex flex-1 relative h-screen">
        {/* background image */}
        <img
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=80"
          alt="concert"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* dark gradient so bottom text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Tagline — bottom left */}
        <div className="absolute bottom-16 left-12 max-w-md">
          <h1 className="text-white font-black text-5xl tracking-wide leading-tight">
            Discover new things on Superapp
          </h1>
        </div>
      </div>

      {/* ── RIGHT — dark form panel ── */}
      <div className="w-full md:w-[50%] flex-shrink-0 bg-black flex items-center justify-center px-6 md:px-16">
        <div className="w-full max-w-[400px] flex flex-col">

          {/* Heading */}
          <h1 className="text-[#72db73] text-4xl font-normal text-center tracking-normal mb-3 font-sans">
            Super app
          </h1>
          <p className="text-white text-sm text-center mb-10 tracking-wide font-light">
            Create your new account
          </p>

          {/* ── Form Fields ── */}
          <div className="flex flex-col gap-4">

            {/* Name */}
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-[#292929] text-gray-300 text-sm px-4 py-3 rounded-md outline-none placeholder-gray-500 border-none focus:ring-1 focus:ring-[#72db73]"
            />

            {/* Username */}
            <input
              type="text"
              placeholder="UserName"
              className="w-full bg-[#292929] text-gray-300 text-sm px-4 py-3 rounded-md outline-none placeholder-gray-500 border-none focus:ring-1 focus:ring-[#72db73]"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-[#292929] text-gray-300 text-sm px-4 py-3 rounded-md outline-none placeholder-gray-500 border-none focus:ring-1 focus:ring-[#72db73]"
            />

            {/* Mobile */}
            <input
              type="tel"
              placeholder="Mobile"
              className="w-full bg-[#292929] text-gray-300 text-sm px-4 py-3 rounded-md outline-none placeholder-gray-500 border-none focus:ring-1 focus:ring-[#72db73]"
            />

          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-3 mt-6">
            <input
              id="agree"
              type="checkbox"
              className="w-4 h-4 bg-[#292929] border-none rounded-sm accent-[#72db73] cursor-pointer flex-shrink-0"
            />
            <label
              htmlFor="agree"
              className="text-[#7e7e7e] text-xs cursor-pointer leading-snug font-medium"
            >
              Share my registration data with Superapp
            </label>
          </div>

          {/* SIGN UP Button */}
          <button
            type="button"
            className="w-full mt-8 bg-[#72db73] text-white font-bold text-base tracking-widest py-3 rounded-full hover:bg-[#5fc260] transition-colors duration-200"
          >
            SIGN UP
          </button>

          {/* Terms & Privacy disclaimers */}
          <div className="text-left mt-6 px-1">
            <p className="text-[11px] text-[#7e7e7e] leading-relaxed">
              By clicking on Sign up, you agree to Superapp{' '}
              <span className="text-[#72db73] font-medium cursor-pointer hover:underline">
                Terms and Conditions of Use
              </span>
            </p>
            <p className="text-[11px] text-[#7e7e7e] mt-4 leading-relaxed">
              To learn more about how Superapp collects, uses, shares and protects your personal data please head Superapp{' '}
              <span className="text-[#72db73] font-medium cursor-pointer hover:underline">
                Privacy Policy
              </span>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Register;