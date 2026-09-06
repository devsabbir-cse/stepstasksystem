"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
  X,
  Users,
  UserCog,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";

interface LoginModalProps {
  onClose: () => void;
  onSignup: () => void;
}

const LoginModal = ({
  onClose,
  onSignup,
}: LoginModalProps) => {
  const [role, setRole] = useState("Team Member");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    if (password !== "1234") {
      toast.error("Incorrect Email or Password.");
      return;
    }
    setTimeout(() => {
      router.push("/dashboard");
    }, 200);

    toast.success(`${role} login successful!`,{  progressClassName: "bg-orange-600", icon: <CheckCircle2 className="text-orange-600" size={20} />,
});

    console.log({
      role,
      email,
      password,
    });
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className="
          fixed
          inset-0
          z-[100]
          bg-black/50
          backdrop-blur-sm
        "
        onClick={onClose}
      />

      {/* Modal Wrapper */}
      <div
        className="
          absolute
          top-0
          left-0
          w-full
          min-h-screen
          z-[101]
          flex
          items-start
          justify-center
          p-4
          sm:p-6
          pointer-events-none
        "
      >
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            relative
            w-full
            max-w-md
            bg-white
            rounded-2xl
            sm:rounded-3xl
            shadow-2xl
            overflow-hidden
            my-4
            sm:my-6
            pointer-events-auto
            animate-[fadeIn_.2s_ease-out]
          "
        >
          {/* Top / Header */}
          <div
            className="
              relative
              bg-gradient-to-r
              from-orange-500
              to-orange-600
              px-5
              sm:px-7
              py-5
              sm:py-6
              text-white
            "
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="
                absolute
                right-4
                top-4
                w-9
                h-9
                rounded-full
                bg-white/15
                hover:bg-white/25
                flex
                items-center
                justify-center
                transition
              "
            >
              <X size={19} />
            </button>

            {/* Header Content */}
            <div className="flex items-center gap-3">
              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-white/20
                  flex
                  items-center
                  justify-center
                "
              >
                <LogIn size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Welcome Back
                </h2>

                <p className="text-orange-100 text-xs sm:text-sm mt-0.5">
                  Login to your account
                </p>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="p-5 sm:p-7">
            {/* Error */}
            {error && (
              <div
                className="
                  mb-5
                  flex
                  gap-2.5
                  items-start
                  bg-red-50
                  border
                  border-red-200
                  text-red-700
                  rounded-xl
                  p-3
                "
              >
                <AlertCircle
                  size={19}
                  className="shrink-0 mt-0.5"
                />

                <p className="text-sm">
                  {error}
                </p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div
                className="
                  mb-5
                  flex
                  gap-2.5
                  items-start
                  bg-green-50
                  border
                  border-green-200
                  text-green-700
                  rounded-xl
                  p-3
                "
              >
                <CheckCircle2
                  size={19}
                  className="shrink-0 mt-0.5"
                />

                <p className="text-sm">
                  {success}
                </p>
              </div>
            )}

            {/* Login Form */}
            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >
              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Login As
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {/* Member */}
                  <button
                    type="button"
                    onClick={() => {
                      setRole("Team Member");
                      setError("");
                      setSuccess("");
                    }}
                    className={`
                      flex
                      items-center
                      justify-center
                      gap-2
                      py-3
                      rounded-xl
                      border
                      text-sm
                      font-medium
                      transition
                      ${
                        role === "Team Member"
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }
                    `}
                  >
                    <Users size={17} />
                    Member
                  </button>

                  {/* Manager */}
                  <button
                    type="button"
                    onClick={() => {
                      setRole("Team Manager");
                      setError("");
                      setSuccess("");
                    }}
                    className={`
                      flex
                      items-center
                      justify-center
                      gap-2
                      py-3
                      rounded-xl
                      border
                      text-sm
                      font-medium
                      transition
                      ${
                        role === "Team Manager"
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }
                    `}
                  >
                    <UserCog size={17} />
                    Manager
                  </button>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    placeholder="Enter your email"
                    className="
                      w-full
                      bg-gray-50
                      border
                      border-gray-200
                      rounded-xl
                      py-3.5
                      pl-11
                      pr-4
                      text-sm
                      outline-none
                      focus:border-orange-500
                      focus:ring-2
                      focus:ring-orange-100
                      transition
                      text-black
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    placeholder="Enter your password"
                    className="
                      w-full
                      bg-gray-50
                      border
                      border-gray-200
                      rounded-xl
                      py-3.5
                      pl-11
                      pr-12
                      text-sm
                      outline-none
                      focus:border-orange-500
                      focus:ring-2
                      focus:ring-orange-100
                      transition
                      text-black
                    "
                  />

                  {/* Show / Hide Password */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="
                      absolute
                      right-3.5
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      hover:text-gray-700
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  font-semibold
                  py-3.5
                  rounded-xl
                  shadow-md
                  shadow-orange-100
                  transition-all
                  duration-200
                "
              >
                <LogIn size={18} />
                Login as {role}
              </button>
            </form>

            {/* Demo Password */}
            <div className="mt-5 text-center">
              <p className="text-xs text-gray-400">
                Demo password:

                <span className="ml-1 font-semibold text-orange-500">
                  1234
                </span>
              </p>
            </div>

            {/* Signup Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?

                <button
                  type="button"
                  onClick={() => {
                window.scrollTo({
                top: 0,
                behavior: "smooth",
                });

                setTimeout(() => {
                onSignup();
                }, 500);
            }}
                  className="
                    ml-1
                    font-semibold
                    text-orange-500
                    hover:text-orange-600
                  "
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;