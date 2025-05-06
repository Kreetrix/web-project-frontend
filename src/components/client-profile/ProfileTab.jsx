import { useState, useEffect } from "react";
import { useUser } from "../../hooks/apiHooks.js";

export default function ProfileTab() {
  const [user, setUser] = useState(undefined);

  // Get user data and update function
  const { getUser, updateUser } = useUser();

  // Initialize local states for user data
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: email,
        username: username,
        first_name: firstName,
        last_name: lastName,
        address: address,
        phone: phone,
        new_password: password,
        password: confirmPassword,
      };

      const res = await updateUser(payload);
      console.log(res);

      alert(res.message);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    async function fetchUser() {
      if (!user) {
        const userData = await getUser();
        setUser(userData.user);
      } else {
        setUsername(user.username);
        setEmail(user.email);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setAddress(user.address);
        setPhone(user.phone);
      }
    }
    fetchUser();
  }, [user]);

  //TODO: Make a component
  if (!user) return <>Loading...</>;

  return (
    <div className="space-y-6">
      {error && (
        <div className="error-message" style={{ color: "red" }}>
          {error}
        </div>
      )}
      <div className="profile-info mb-4 space-y-2 bg-white dark:bg-gray-600 p-4 rounded-lg shadow  ">
        <p className="text-gray-800 dark:text-gray-200">
          <strong className="font-medium dark:text-white">Username:</strong>
          <span className="ml-2 text-gray-700 dark:text-gray-300">
            {user?.username || "Not set"}
          </span>
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <strong className="font-medium dark:text-white">First name:</strong>
          <span className="ml-2 text-gray-700 dark:text-gray-300">
            {user?.first_name || "Not set"}
          </span>
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <strong className="font-medium dark:text-white">Last name:</strong>
          <span className="ml-2 text-gray-700 dark:text-gray-300">
            {user?.last_name || "Not set"}
          </span>
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <strong className="font-medium dark:text-white">Address:</strong>
          <span className="ml-2 text-gray-700 dark:text-gray-300">
            {user?.address || "Not set"}
          </span>
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <strong className="font-medium dark:text-white">Phone:</strong>
          <span className="ml-2 text-gray-700 dark:text-gray-300">
            {user?.phone || "Not set"}
          </span>
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <strong className="font-medium dark:text-white">Email:</strong>
          <span className="ml-2 text-gray-700 dark:text-gray-300">
            {user?.email || "Not set"}
          </span>
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-800">
        Update your profile
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={"New username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="email"
            placeholder="Current email*"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            placeholder="New first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            placeholder="New last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            placeholder="New address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="tel"
            placeholder="New phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="password"
            placeholder="Confirm password"
            required={true}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-2 px-6 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-md transition-all duration-200"
        >
          Update profile
        </button>
      </form>
    </div>
  );
}
