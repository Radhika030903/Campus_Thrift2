import React from "react";

function SignupView() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://pngmagic.com/product_images/dark-yellow-background.jpg')" }}
    >
      <div
        style={{
          boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.9), 0 20px 20px -10px rgba(0, 0, 0, 0.3)",
          animation: "moveIn 1s ease-out",
        }}
        className="bg-white rounded-lg shadow-xl overflow-hidden max-w-[85vh] w-full max-h-[80vh] h-auto"
      >
        <div className="p-6">
          <h2 className="text-center text-2xl font-extrabold text-gray-900">Create Account</h2>
          <p className="mt-2 text-center text-gray-600">Sign up to get started</p>
          <form method="POST" action="#" className="mt-6 space-y-4">
            <div className="rounded-md shadow-sm">
              <div>
                <label className="sr-only" htmlFor="name">Name</label>
                <input
                  placeholder="Name"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                  required
                  type="text"
                  name="name"
                  id="name"
                />
              </div>

              <div className="mt-2">
                <label className="sr-only" htmlFor="institute-email">Institute Email</label>
                <input
                  placeholder="Institute Email"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                  required
                  autoComplete="email"
                  type="email"
                  name="institute-email"
                  id="institute-email"
                />
              </div>

              <div className="mt-2">
                <label className="sr-only" htmlFor="institute">Institute</label>
                <select
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                  name="institute"
                  id="institute"
                  required
                >
                  <option value="">Select Institute</option>
                  {/* IITs */}
                  <option value="IIT Bombay">IIT Bombay</option>
                  <option value="IIT Delhi">IIT Delhi</option>
                  <option value="IIT Kanpur">IIT Kanpur</option>
                  <option value="IIT Kharagpur">IIT Kharagpur</option>
                  <option value="IIT Madras">IIT Madras</option>
                  <option value="IIT Roorkee">IIT Roorkee</option>
                  {/* Add other IITs */}
                  {/* NITs */}
                  <option value="NIT Trichy">NIT Trichy</option>
                  <option value="NIT Surathkal">NIT Surathkal</option>
                  <option value="NIT Warangal">NIT Warangal</option>
                  <option value="NIT Rourkela">NIT Rourkela</option>
                  <option value="NIT Calicut">NIT Calicut</option>
                  {/* Add other NITs */}
                  {/* IIITs */}
                  <option value="IIIT Hyderabad">IIIT Hyderabad</option>
                  <option value="IIIT Allahabad">IIIT Allahabad</option>
                  <option value="IIIT Bangalore">IIIT Bangalore</option>
                  <option value="IIIT Delhi">IIIT Delhi</option>
                  <option value="IIIT Gwalior">IIIT Gwalior</option>
                  {/* Add other IIITs */}
                </select>
              </div>

              <div className="mt-2">
                <label className="sr-only" htmlFor="state">State</label>
                <select
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                  name="state"
                  id="state"
                  required
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  {/* Add other states */}
                </select>
              </div>

              <div className="mt-2">
                <label className="sr-only" htmlFor="city">City</label>
                <input
                  placeholder="City"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                  required
                  type="text"
                  name="city"
                  id="city"
                />
              </div>

              <div className="mt-2">
                <label className="sr-only" htmlFor="password">Password</label>
                <input
                  placeholder="Password"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                  required
                  autoComplete="new-password"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>

              <div className="mt-2">
                <label className="sr-only" htmlFor="confirm-password">Confirm Password</label>
                <input
                  placeholder="Confirm Password"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
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
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3A1E08] hover:bg-brown-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="px-6 py-4 bg-gray-100 text-center">
          <span className="text-gray-600">Already have an account?</span>
          <a className="font-medium text-[#3A1E08] hover:text-brown-600" href="/login">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignupView;





