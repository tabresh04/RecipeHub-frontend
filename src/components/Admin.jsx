import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

function Admin() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");
    }, [navigate]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("https://recipehub-backend-t3eq.onrender.com/users/admin");
                const data = await res.json();

                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error("Unexpected response:", data);
                }
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (!confirm) return;

        try {
            const res = await fetch(`https://recipehub-backend-t3eq.onrender.com/users/admin/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setUsers(prev => prev.filter(user => user._id !== id));
            } else {
                alert("Failed to delete user");
            }
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-200 p-6">
            <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">Admin Dashboard</h1>
            <div className="max-w-3xl mx-auto space-y-4">
                {users.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">No users found.</p>
                ) : (
                    users
                        .filter(user => !(user.name === "Nonex" && user.email === "nonex@gmail.com"))
                        .map(user => (
                            <div
                                key={user._id}
                                className="flex justify-between items-center bg-white/70 hover:bg-white shadow-lg hover:shadow-xl p-4 rounded-xl transition-all duration-300 backdrop-blur-sm border border-purple-200"
                            >
                                <div>
                                    <p className="font-bold text-lg text-blue-800">{user.name}</p>
                                    <p className="text-sm text-gray-700">{user.email}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="text-red-400 bg-transparent hover:text-red-600 px-3 py-1 rounded-full transition duration-200"
                                    title="Delete user"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
}

export default Admin;
