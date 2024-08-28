import React from "react";
import { Link } from "react-router-dom";

function SignupView() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div
        style={{
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        className="bg-gray-800 rounded-lg shadow-xl overflow-hidden max-w-lg w-full"
      >
        <div className="p-8">
          <h2 className="text-center text-3xl font-extrabold text-white">Create Account</h2>
          <p className="mt-4 text-center text-gray-400">Sign up to get started</p>
          <form method="POST" action="#" className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div>
                <label className="sr-only" htmlFor="name">Name</label>
                <input
                  placeholder="Name"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="mt-4">
                <label className="sr-only" htmlFor="email">Email address</label>
                <input
                  placeholder="Email address"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                  autoComplete="email"
                  type="email"
                  name="email"
                  id="email"
                />
              </div>
              <div className="mt-4">
                <label className="sr-only" htmlFor="password">Password</label>
                <input
                  placeholder="Password"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                  autoComplete="new-password"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
              <div className="mt-4">
                <label className="sr-only" htmlFor="confirm-password">Confirm Password</label>
                <input
                  placeholder="Confirm Password"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                  autoComplete="new-password"
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                />
              </div>
            </div>

            <div>
              <button
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-700 text-center">
          <span className="text-gray-400">Already have an account?</span>
          <Link className="font-medium text-indigo-500 hover:text-indigo-400" to="/login">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupView;
