import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("hhttps://recipehub-backend-t3eq.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: form.email, password: form.password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.user._id);
                navigate("/");
            } else {
                alert(data.error || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-center mt-4">
                    Don't have an account?{" "}
                    <NavLink to="/signup" className="text-amber-600 font-medium">
                        Sign up
                    </NavLink>
                </p>
            </div>
        </div>
    );
}

export default Login;
