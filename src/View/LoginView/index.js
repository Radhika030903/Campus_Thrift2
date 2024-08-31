import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://pngmagic.com/product_images/dark-yellow-background.jpg')" }}
    >
      <div
        style={{
          boxShadow: "0 15px 35px -10px rgba(0, 0, 0, 0.9), 0 15px 15px -10px rgba(0, 0, 0, 0.2)",
          animation: "moveIn 1s ease-out",
        }}
        className="bg-white rounded-lg shadow-xl overflow-hidden max-w-lg w-full transform translate-x-0"
      >
        <div className="p-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="mt-4 text-center text-gray-600">Sign in to continue</p>
          <form method="POST" action="#" className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div>
                <label className="sr-only" htmlFor="email">Email address</label>
                <input
                  placeholder="Email address"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
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
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                  required
                  autoComplete="current-password"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-[#3A1E08] focus:ring-[#3A1E08] border-gray-300 rounded"
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                />
                <label className="ml-2 block text-sm text-gray-700" htmlFor="remember-me">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a className="font-medium text-[#3A1E08] hover:text-[#543014]" href="#">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white"
                style={{ backgroundColor: "#3A1E08", hover: { backgroundColor: "#543014" } }}
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-100 text-center">
          <span className="text-gray-600">Don't have an account?</span>
          <Link className="font-medium text-[#3A1E08] hover:text-[#543014]" to="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;


