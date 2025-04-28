import { useUser } from "../../contexts/UserContext";
import { useState, useEffect } from "react";

export default function ProfileTab() {                  /* TODO - add data from db with context */


    // Get user data and update function
    const { user, updateProfile } = useUser();

    // Initialize local states for user data
    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [address, setAddress] = useState(user?.address || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        // Update profile data through context
        updateProfile({
            username,
            email,
            firstName,
            lastName,
            address,
            phone,
            password
        });

        alert("Profile updated successfully! ✅");
    };

    useEffect(() => {
        if (!user) {
            return;
        }
    }, [user]);

    return (
        <div className="space-y-6" >
            <div className="profile-info mb-4 space-y-2 bg-white dark:bg-gray-600 p-4 rounded-lg shadow  ">
                <p className="text-gray-800 dark:text-gray-200">
                    <strong className="font-medium dark:text-white">Username:</strong>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{user?.username || "Not set"}</span>
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                    <strong className="font-medium dark:text-white">First name:</strong>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{user?.firstName || "Not set"}</span>
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                    <strong className="font-medium dark:text-white">Last name:</strong>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{user?.lastName || "Not set"}</span>
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                    <strong className="font-medium dark:text-white">Address:</strong>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{user?.address || "Not set"}</span>
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                    <strong className="font-medium dark:text-white">Phone:</strong>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{user?.phone || "Not set"}</span>
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                    <strong className="font-medium dark:text-white">Email:</strong>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{user?.email || "Not set"}</span>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="New username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <input
                        type="email"
                        placeholder="New email"
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