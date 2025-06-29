import { useEffect, useState } from "react";
import { useNavigate, useLoaderData, NavLink } from "react-router-dom";
import { Trash2 } from "lucide-react";


function Favourite() {
    const navigate = useNavigate();
    const allFavRecipe = useLoaderData() || [];
    const userId = localStorage.getItem("userId");

    // Redirect if not logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    // Filter user-specific favourites
    const [favRecipes, setFavRecipes] = useState(
        allFavRecipe?.filter(item => String(item.userId) === String(userId)) || []
    );

    const handleDelete = async (index, Id) => {
        try {
            const res = await fetch(`http://localhost:5500/favourite/${Id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                setFavRecipes(prev => prev.filter(item => item._id !== Id));

            } else {
                console.error("Failed to delete favourite");
            }
        } catch (err) {
            console.error("Error deleting favourite:", err);
        }
    };

    if (!favRecipes || favRecipes.length === 0) {
        return <p className="text-center p-4 text-gray-600 text-lg">You haven't added any favourite yet.</p>;
    }

    return (
        <div className="p-2">
            <h1 className="text-2xl font-semibold text-center mb-4">❤️ Your Favourite Recipes</h1>
            <div className="p-4 flex flex-wrap justify-center gap-3">
                {favRecipes.map((item, index) => (
                    <div
                        key={item._id}
                        className="recipe-container card bg-cyan-100 rounded-2xl overflow-hidden transition-transform duration-300 max-w-[220px] w-[48%] sm:w-[47%] md:w-[30%] hover:translate-y-[-6px] hover:rotate-[1deg] hover:shadow-xl"
                    >
                        <NavLink to={`/recipe-details/${item.recipeId}`}>
                            <img
                                src={item.photo}
                                alt={item.name}
                                className="h-30 w-full object-fit"
                            />
                            <div className="p-2">
                                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                <p className="text-sm text-gray-500">⏱️ {item.time}</p>
                            </div>
                        </NavLink>
                        <a href={`/favourite/${item.userId}`}>
                            <button
                                onClick={() => handleDelete(index, item._id)}
                                className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium pl-2.5 pb-1"
                            >
                                <Trash2 size={16} />Delete
                            </button>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favourite;
