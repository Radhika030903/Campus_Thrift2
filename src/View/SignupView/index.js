import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { auth, db } from "../../firebase"; // Correct relative path
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function SignupView() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [institute, setInstitute] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    // Password matching check
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "bottom-center",
      });
      return;
    }

    try {
      // Create user with email and password in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "User", user.uid), {
          email: user.email,
          name: name,
          institute: institute,
          state: state,
          city: city,
        });
      }

      // Store user data in Firestore
      toast.success("User registered successfully!", {
        position: "top-center",
      });

      // Redirect to LoginView
      navigate("/login"); // Redirect after successful signup
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
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
                  {/* IITs */}
                  <optgroup label="IITs">
                    <option value="IIT Bombay">IIT Bombay</option>
                    <option value="IIT Delhi">IIT Delhi</option>
                    <option value="IIT Kanpur">IIT Kanpur</option>
                    <option value="IIT Kharagpur">IIT Kharagpur</option>
                    <option value="IIT Madras">IIT Madras</option>
                    <option value="IIT Roorkee">IIT Roorkee</option>
                    <option value="IIT Guwahati">IIT Guwahati</option>
                    <option value="IIT Hyderabad">IIT Hyderabad</option>
                    <option value="IIT Patna">IIT Patna</option>
                    <option value="IIT Bhubaneswar">IIT Bhubaneswar</option>
                    <option value="IIT Mandi">IIT Mandi</option>
                    <option value="IIT Jammu">IIT Jammu</option>
                    <option value="IIT Dharwad">IIT Dharwad</option>
                  </optgroup>

                  {/* NITs */}
                  <optgroup label="NITs">
                    <option value="NIT Trichy">NIT Trichy</option>
                    <option value="NIT Surathkal">NIT Surathkal</option>
                    <option value="NIT Warangal">NIT Warangal</option>
                    <option value="NIT Calicut">NIT Calicut</option>
                    <option value="NIT Rourkela">NIT Rourkela</option>
                    <option value="NIT Durgapur">NIT Durgapur</option>
                    <option value="NIT Kurukshetra">NIT Kurukshetra</option>
                    <option value="NIT Jamshedpur">NIT Jamshedpur</option>
                    <option value="NIT Silchar">NIT Silchar</option>
                    <option value="NIT Agartala">NIT Agartala</option>
                    <option value="NIT Delhi">NIT Delhi</option>
                    <option value="NIT Raipur">NIT Raipur</option>
                    <option value="NIT Patna">NIT Patna</option>
                  </optgroup>

                  {/* IIITs */}
                  <optgroup label="IIITs">
                    <option value="IIIT Hyderabad">IIIT Hyderabad</option>
                    <option value="IIIT Bangalore">IIIT Bangalore</option>
                    <option value="IIIT Allahabad">IIIT Allahabad</option>
                    <option value="IIIT Delhi">IIIT Delhi</option>
                    <option value="IIIT Gwalior">IIIT Gwalior</option>
                    <option value="IIIT Pune">IIIT Pune</option>
                    <option value="IIIT Kota">IIIT Kota</option>
                    <option value="IIIT Sri City">IIIT Sri City</option>
                    <option value="IIIT Bhagalpur">IIIT Bhagalpur</option>
                  </optgroup>

                  {/* Other Institutes */}
                  <optgroup label="Other Institutes">
                    <option value="Birla Institute of Applied Sciences">Birla Institute of Applied Sciences</option>
                  </optgroup>
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
                  {/* States */}
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
                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Delhi">Delhi</option>
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
