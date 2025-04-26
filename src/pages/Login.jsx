import { Mail, KeyRound, LogIn } from 'lucide-react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    /*  JUST TEST   
    const fakeUser = {                                      
        email: "user@burger.com",
        password: "1234",
    };


    const fakeAdmin = {
        email: "admin@burger.com",
        password: "1234",
    };
 */


    const HandleLogin = async (e) => {
        e.preventDefault();

        const formData = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://127.0.0.1:3000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message);
            }

            const { accessToken, user } = await response.json();

            localStorage.setItem('accessToken', accessToken);
            console.log('Login successful! -> ', user);

            navigate('/dashboard');

        } catch (error) {
            console.error('Login error:', error.message);
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen relative bg-gray-800">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1899&q=80')"
                }}
            ></div>

            <div className="flex items-center justify-center min-h-screen relative z-10">
                <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
                    <h2 className="text-3xl font-bold text-center mb-6 text-yellow-700">
                        Kirjaudu sisään 🍔
                    </h2>

                    <form onSubmit={HandleLogin} className="space-y-5">
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
                            <Mail className="text-gray-500 mr-2" size={18} />
                            <input
                                type="email"
                                placeholder="Sähköposti"
                                className="w-full outline-none bg-transparent text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
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
                                required
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
                            <LogIn size={18} />
                            Kirjaudu
                        </button>

                        <div className="text-sm text-center text-gray-700 mt-2">
                            Unohtuiko salasana?
                            <a
                                href="/reset"
                                className="text-yellow-600 hover:underline ml-1"
                            >
                                Palauta
                            </a>
                        </div>
                        <div className="text-sm text-center text-gray-700 mt-2">
                            Ei ole tiliä? Rekisteröidy tästä.
                            <a
                                href="/register"
                                className="text-yellow-600 hover:underline ml-1"
                            >
                                rekisteröidy
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
