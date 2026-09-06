"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Users,
  BarChart3,
  ArrowRight,
  ListTodo,
} from "lucide-react";

import Navbar from "./LandingPage/Components/Navbar";
import LoginModal from "./LandingPage/Components/LoginModal";
import SignupModal from "./LandingPage/Components/SignupModal";

const Page = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <main className="min-h-screen bg-white">

      {/* Navbar */}
      <Navbar
        onLogin={() => {
          setShowLogin(true);
        }}
        onSignup={() => {
          setShowSignup(true);
        }}
      />

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="
          min-h-screen
          pt-20
          bg-gradient-to-br
          from-orange-50
          via-white
          to-orange-100
          flex
          items-center
        "
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left */}
            <div className="text-center lg:text-left">

              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                Smart Team Management
              </div>

              <h1 className="
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-6xl
                xl:text-7xl
                font-bold
                text-gray-900
                leading-[1.08]
              ">
                Manage Your
                <span className="block text-orange-500">
                  Team Smarter.
                </span>
              </h1>

              <p className="
                mt-6
                text-gray-500
                text-base
                sm:text-lg
                leading-relaxed
                max-w-xl
                mx-auto
                lg:mx-0
              ">
                Organize tasks, track progress and collaborate
                with your team from one powerful and simple
                management system.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">

                <button
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });

                    setTimeout(() => {
                      setShowSignup(true);
                    }, 500);
                  }}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    px-6
                    py-3.5
                    rounded-xl
                    font-semibold
                    shadow-lg
                    shadow-orange-200
                    transition
                  "
                >
                  Get Started
                  <ArrowRight size={18} />
                </button>

                <a
                  href="#features"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    px-6
                    py-3.5
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    text-gray-700
                    font-semibold
                    hover:bg-gray-50
                    transition
                  "
                >
                  Explore Features
                </a>

              </div>

              {/* Small stats */}
              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6">

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    100%
                  </p>
                  <p className="text-xs text-gray-400">
                    Organized
                  </p>
                </div>

                <div className="w-px bg-gray-200" />

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    24/7
                  </p>
                  <p className="text-xs text-gray-400">
                    Accessible
                  </p>
                </div>

                <div className="w-px bg-gray-200" />

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    Easy
                  </p>
                  <p className="text-xs text-gray-400">
                    To Use
                  </p>
                </div>

              </div>

            </div>

            {/* Right Dashboard Preview */}
            <div className="relative">

              {/* Background decoration */}
              <div className="
                absolute
                -top-10
                -right-10
                w-40
                h-40
                bg-orange-200
                rounded-full
                blur-3xl
                opacity-50
              " />

              <div className="
                relative
                bg-white
                rounded-2xl
                sm:rounded-3xl
                border
                border-gray-100
                shadow-2xl
                p-4
                sm:p-6
              ">

                {/* Fake Dashboard Header */}
<div className="flex items-center justify-between mb-6">
  <div>
    <p className="text-xs text-gray-400">
      Dashboard
    </p>

    <h3 className="text-lg sm:text-xl font-bold text-gray-800">
      Task Overview
    </h3>
  </div>

  <div
    className="
      w-10 h-10
      rounded-xl
      bg-orange-100
      flex
      items-center
      justify-center
      transition-all
      duration-300
      hover:bg-orange-500
      hover:rotate-6
      hover:scale-110
      cursor-pointer
    "
  >
    <ListTodo
      size={20}
      className="text-orange-500 transition-colors duration-300 hover:text-white"
    />
  </div>
</div>

{/* Cards */}
<div className="grid grid-cols-2 gap-3">

  {/* Total Tasks */}
  <div
    className="
      group
      p-4
      rounded-xl
      bg-orange-50
      border
      border-transparent
      cursor-pointer
      transition-all
      duration-300
      hover:-translate-y-1
      hover:bg-white
      hover:border-orange-200
      hover:shadow-lg
      hover:shadow-orange-100
    "
  >
    <p className="text-xs text-gray-500 transition-colors group-hover:text-orange-500">
      Total Tasks
    </p>

    <p className="text-2xl font-bold text-gray-800 mt-1 transition-all duration-300 group-hover:text-orange-500 group-hover:scale-105 origin-left">
      128
    </p>
  </div>

  {/* In Progress */}
  <div
    className="
      group
      p-4
      rounded-xl
      bg-blue-50
      border
      border-transparent
      cursor-pointer
      transition-all
      duration-300
      hover:-translate-y-1
      hover:bg-white
      hover:border-blue-200
      hover:shadow-lg
      hover:shadow-blue-100
    "
  >
    <p className="text-xs text-gray-500 transition-colors group-hover:text-blue-500">
      In Progress
    </p>

    <p className="text-2xl font-bold text-gray-800 mt-1 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-105 origin-left">
      32
    </p>
  </div>

  {/* Completed */}
  <div
    className="
      group
      p-4
      rounded-xl
      bg-green-50
      border
      border-transparent
      cursor-pointer
      transition-all
      duration-300
      hover:-translate-y-1
      hover:bg-white
      hover:border-green-200
      hover:shadow-lg
      hover:shadow-green-100
    "
  >
    <p className="text-xs text-gray-500 transition-colors group-hover:text-green-500">
      Completed
    </p>

    <p className="text-2xl font-bold text-gray-800 mt-1 transition-all duration-300 group-hover:text-green-500 group-hover:scale-105 origin-left">
      76
    </p>
  </div>

  {/* Overdue */}
  <div
    className="
      group
      p-4
      rounded-xl
      bg-red-50
      border
      border-transparent
      cursor-pointer
      transition-all
      duration-300
      hover:-translate-y-1
      hover:bg-white
      hover:border-red-200
      hover:shadow-lg
      hover:shadow-red-100
    "
  >
    <p className="text-xs text-gray-500 transition-colors group-hover:text-red-500">
      Overdue
    </p>

    <p className="text-2xl font-bold text-gray-800 mt-1 transition-all duration-300 group-hover:text-red-500 group-hover:scale-105 origin-left">
      8
    </p>
  </div>

</div>

{/* Fake Task List */}
<div className="mt-5">

  <p className="text-sm font-semibold text-gray-700 mb-3">
    Recent Tasks
  </p>

  <div className="space-y-2">

    {/* Website Development */}
    <div
      className="
        group
        flex
        items-center
        gap-3
        p-3
        rounded-xl
        bg-gray-50
        border
        border-transparent
        cursor-pointer
        transition-all
        duration-300
        hover:bg-white
        hover:border-green-100
        hover:shadow-md
        hover:-translate-y-0.5
      "
    >
      <div
        className="
          w-9 h-9
          rounded-lg
          bg-green-50
          flex
          items-center
          justify-center
          transition-all
          duration-300
          group-hover:bg-green-100
          group-hover:scale-110
        "
      >
        <CheckCircle2
          size={18}
          className="text-green-500"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-700 truncate transition-colors group-hover:text-green-600">
          Website Development
        </p>

        <p className="text-[10px] text-gray-400">
          Completed
        </p>
      </div>
    </div>

    {/* Database Integration */}
    <div
      className="
        group
        flex
        items-center
        gap-3
        p-3
        rounded-xl
        bg-gray-50
        border
        border-transparent
        cursor-pointer
        transition-all
        duration-300
        hover:bg-white
        hover:border-blue-100
        hover:shadow-md
        hover:-translate-y-0.5
      "
    >
      <div
        className="
          w-9 h-9
          rounded-lg
          bg-blue-50
          flex
          items-center
          justify-center
          transition-all
          duration-300
          group-hover:bg-blue-100
          group-hover:scale-110
        "
      >
        <Clock3
          size={18}
          className="text-blue-500"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-700 truncate transition-colors group-hover:text-blue-600">
          Database Integration
        </p>

        <p className="text-[10px] text-gray-400">
          In Progress
        </p>
      </div>
    </div>

    {/* Team Meeting */}
    <div
      className="
        group
        flex
        items-center
        gap-3
        p-3
        rounded-xl
        bg-gray-50
        border
        border-transparent
        cursor-pointer
        transition-all
        duration-300
        hover:bg-white
        hover:border-purple-100
        hover:shadow-md
        hover:-translate-y-0.5
      "
    >
      <div
        className="
          w-9 h-9
          rounded-lg
          bg-purple-50
          flex
          items-center
          justify-center
          transition-all
          duration-300
          group-hover:bg-purple-100
          group-hover:scale-110
        "
      >
        <Users
          size={18}
          className="text-purple-500"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-700 truncate transition-colors group-hover:text-purple-600">
          Team Meeting
        </p>

        <p className="text-[10px] text-gray-400">
          Tomorrow
        </p>
      </div>
    </div>

  </div>
</div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="py-20 sm:py-24 bg-white"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-orange-500 font-semibold text-sm">
              FEATURES
            </p>

            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
              Everything Your Team Needs
            </h2>

            <p className="mt-4 text-gray-500">
              Simple tools to keep your team organized,
              productive and focused.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">

            {/* Feature 1 */}
            <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-orange-50 hover:border-orange-100 transition">

              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
                <ListTodo size={23} />
              </div>

              <h3 className="mt-5 font-bold text-gray-800">
                Task Management
              </h3>

              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Create, assign and manage tasks easily
                from one central dashboard.
              </p>

            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-100 transition">

              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-500 flex items-center justify-center">
                <Users size={23} />
              </div>

              <h3 className="mt-5 font-bold text-gray-800">
                Team Collaboration
              </h3>

              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Keep your managers and team members
                connected and productive.
              </p>

            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-green-50 hover:border-green-100 transition">

              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-500 flex items-center justify-center">
                <BarChart3 size={23} />
              </div>

              <h3 className="mt-5 font-bold text-gray-800">
                Progress Tracking
              </h3>

              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Monitor task progress and understand
                your team's performance.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="py-20 bg-gray-50"
      >

        <div className="max-w-4xl mx-auto px-4 text-center">

          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center mx-auto">
            <Users size={27} />
          </div>

          <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-gray-900">
            Built for Modern Teams
          </h2>

          <p className="mt-5 text-gray-500 leading-relaxed">
            StepsTaskFlow helps teams organize their daily work,
            manage responsibilities and keep track of every
            task without unnecessary complexity.
          </p>

          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });

              setTimeout(() => {
                setShowSignup(true);
              }, 500);
            }}
            className="
              mt-7
              inline-flex
              items-center
              gap-2
              bg-orange-500
              hover:bg-orange-600
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            Start Managing
            <ArrowRight size={17} />
          </button>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-white py-8">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
                <ListTodo size={19} />
              </div>

              <span className="font-bold">
                Steps<span className="text-orange-500">TaskFlow</span>
              </span>

            </div>

            <p className="text-xs text-gray-400 text-center">
              © 2026 Steps<span className="text-orange-500">TaskFlow</span>. Team Task Management System.
            </p>

          </div>

        </div>

      </footer>

      {/* Login Modal */}
{showLogin && (
  <LoginModal
    onClose={() => setShowLogin(false)}
    onSignup={() => {
      setShowLogin(false);
      setShowSignup(true);
    }}
  />
)}

        {/* Signup Modal */}
        {showSignup && (
          <SignupModal
            onClose={() => setShowSignup(false)}
            onLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />
        )}

    </main>
  );
};

export default Page;