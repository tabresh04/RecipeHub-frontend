import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

function YourRecipes() {
    const navigate = useNavigate();
    const [yourRecipes, setYourRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");
    }, [navigate]);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`http://localhost:5500/YourRecipes/${userId}`);
                const data = await res.json();
                setYourRecipes(data);
            } catch (err) {
                console.error("Error in getting Your Recipes ", err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchItem();
    }, [userId]);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5500/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                alert("Recipe deleted successfully");
                setYourRecipes((prev) => prev.filter((r) => r._id !== id));
            } else {
                alert("Failed to delete recipe");
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    if (loading) return <p className="text-center p-4 text-xl text-gray-500">Loading...</p>;

    if (!yourRecipes || yourRecipes.length === 0) {
        return <p className="text-center p-4 text-gray-600 text-lg">You haven't added any recipes yet.</p>;
    }

    return (
        <div className="p-4 bg-gray-50">
            <h1 className="text-3xl font-bold text-center text-amber-600 mb-8">Your Recipes</h1>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {yourRecipes.map((recipe) => (
                    <div
                        key={recipe._id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                    >
                        <img
                            src={recipe.photo}
                            alt={recipe.name}
                            className="w-full h-50 object-cover rounded-t-2xl"
                        />
                        <div className="p-2 space-y-2 bg-cyan-100">
                            <h4 className="text-xl font-semibold text-gray-800 truncate">{recipe.name}</h4>
                            <p className="text-sm text-gray-500">⏱️ {recipe.time}</p>
                            <p className="text-sm text-gray-600 pl-1">{recipe.description?.slice(0, 80)}...</p>

                            <div className="flex justify-center gap-15">
                                <button
                                    onClick={() => navigate(`/edit-recipe/${recipe._id}`)}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                    <Pencil size={16} /> Edit
                                </button>
                                <a href={ `/YourRecipes/${recipe.userId}` }>
                                    <button
                                        onClick={() => handleDelete(recipe._id)}
                                        className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default YourRecipes;
