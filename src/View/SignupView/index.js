import React, { useState } from "react";

import { auth, db } from "../../firebase";  // Correct relative path
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
function SignupView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [institute, setInstitute] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
   

    try {
      // Create user with email and password in Firebase Auth
     await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if(user) {
        await setDoc(doc(db,"User",user.uid),{
         email:user.email,
         name: name,
         institute: institute,
         state: state,
         city: city,
        });
      }

      // Store user data in Firestore
     

      alert("Account created successfully!");
      toast.success("User registeres", {
        position:"top-center",
      });

      // Redirect or do something else after signup
    } catch (error) {
      console.log(error.message);
      toast.success(error.message, {
        position:"bottom-center",
      });
      
    }
  };

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
          <form onSubmit={handleSignup} className="mt-6 space-y-4">
            <div className="rounded-md shadow-sm">
              <div>
                <input
                  placeholder="Name"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <input
                  placeholder="Institute Email"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <select
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                  value={institute}
                  onChange={(e) => setInstitute(e.target.value)}
                  required
                >
                  <option value="">Select Institute</option>
                  <option value="IIT Bombay">IIT Bombay</option>
                  <option value="NIT Trichy">NIT Trichy</option>
                  {/* Add other options */}
                </select>
              </div>

              <div className="mt-2">
                <select
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                >
                  <option value="">Select State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  {/* Add other options */}
                </select>
              </div>

              <div className="mt-2">
                <input
                  placeholder="City"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <input
                  placeholder="Password"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <input
                  placeholder="Confirm Password"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-brown-500 focus:border-brown-500 focus:z-10 sm:text-sm"
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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





