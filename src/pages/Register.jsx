import { Mail, KeyRound, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Text from "../components/locales/Text";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = {
      username: username,
      email: email,
      password: password,
    };

    console.log(formData);

    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const status = await response.json();

      if (!response.ok) {
        throw new Error(status || "Registration failed");
      }

      //TODO: redirect!
      alert("Registration successful! TODO: REDIRECT");
    } catch (error) {
      console.error("Registration error:", error.message);
      alert(error);
    }
  };

  return (
    <div className="min-h-screen relative bg-gray-800">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1899&q=80')",
        }}
      ></div>

      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
          <h2 className="text-3xl font-bold text-center mb-6 text-yellow-700">
            <Text id="app.register.register" /> 🍟
          </h2>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
              <UserPlus className="text-gray-500 mr-2" size={18} />
              <input
                type="text"
                placeholder="Käyttäjätunnus"
                className="w-full outline-none bg-transparent text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
              <Mail className="text-gray-500 mr-2" size={18} />
              <input
                type="email"
                placeholder="Sähköposti"
                className="w-full outline-none bg-transparent text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
              <KeyRound className="text-gray-500 mr-2" size={18} />
              <input
                type="password"
                placeholder="Salasana"
                className="w-full outline-none bg-transparent text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
              <KeyRound className="text-gray-500 mr-2" size={18} />
              <input
                type="password"
                placeholder="Vahvista salasana"
                className="w-full outline-none bg-transparent text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 rounded-md flex items-center justify-center gap-2"
            >
              <UserPlus size={18} />
              <Text id="app.register.register" />
            </button>

            <div className="text-sm text-center text-gray-700 mt-2">
              <Text id="app.register.question" />{" "}
              <Link to="/login" className="text-yellow-600 hover:underline">
                <Text id="app.register.login" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
