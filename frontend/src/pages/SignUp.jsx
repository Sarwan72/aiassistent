import React, { useState, useContext } from "react";
import bg from "../assets/authBg.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
     import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const { serverUrl , userData, setUserData} = useContext(userDataContext);

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);



const response = await axios.post(
  `${serverUrl}/api/auth/signup`,
  { name, email, password },
  { withCredentials: true }
);

      setUserData(response.data);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      navigate("/customize");
    } catch (err) {
      setUserData(null);
      setError("Server error. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <form
        onSubmit={handleSignUp}
        className="relative w-[90%] max-w-[500px]
        bg-black/60 backdrop-blur-md
        shadow-xl shadow-black/50
        flex flex-col items-center gap-5
        px-6 py-10 rounded-2xl"
      >
        <h1 className="text-white text-3xl font-semibold mb-4 text-center">
          Register to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-[55px] outline-none border border-white/40
          bg-transparent text-white placeholder-gray-300
          px-6 rounded-full text-lg"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[55px] outline-none border border-white/40
          bg-transparent text-white placeholder-gray-300
          px-6 rounded-full text-lg"
        />

        {/* Password */}
        <div className="w-full h-[55px] relative border border-white/40 rounded-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-full outline-none bg-transparent
            text-white placeholder-gray-300
            px-6 pr-14 rounded-full text-lg"
          />

          {!showPassword ? (
            <IoEye
              className="absolute top-1/2 -translate-y-1/2 right-5
              w-6 h-6 text-white cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <IoEyeOff
              className="absolute top-1/2 -translate-y-1/2 right-5
              w-6 h-6 text-white cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm">* {error}</p>}

        {/* Button */}
        <button
          disabled={loading}
          className="min-w-[160px] h-[55px] mt-4
          bg-white text-black font-semibold
          rounded-full text-lg
          hover:bg-gray-200 transition
          disabled:opacity-60"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {/* Redirect */}
        <p className="text-white text-lg mt-2">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-400 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
