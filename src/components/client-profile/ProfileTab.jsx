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

    // If user data isn't loaded yet
    useEffect(() => {
        if (!user) {
            // You can add additional actions or show loading indicator
            return;
        }
    }, [user]);

    return (
        <div className="space-y-6">
            <div className="profile-info mb-4 space-y-2">
                <p><strong>Username:</strong> <span>{user?.username || "Not set"}</span></p>
                <p><strong>First name:</strong> <span>{user?.firstName || "Not set"}</span></p>
                <p><strong>Last name:</strong> <span>{user?.lastName || "Not set"}</span></p>
                <p><strong>Address:</strong> <span>{user?.address || "Not set"}</span></p>
                <p><strong>Phone:</strong> <span>{user?.phone || "Not set"}</span></p>
                <p><strong>Email:</strong> <span>{user?.email || "Not set"}</span></p>
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