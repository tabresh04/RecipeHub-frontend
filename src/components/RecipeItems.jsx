import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function RecipeItems({ recipes = [] }) {
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        setLikes(recipes.map((recipe) => recipe.like || 0));
    }, [recipes]);

    const handleLike = async (index, id) => {
        try {
            const res = await fetch(`https://recipehub-backend-t3eq.onrender.com/like/${id}`, {
                method: "POST",
            });

            const data = await res.json();
            if (data && data.like !== undefined) {
                const newLikes = [...likes];
                newLikes[index] = data.like;
                setLikes(newLikes);
            }
        } catch (err) {
            console.error("Failed to like recipe:", err);
        }
    };

    return (
        <div className="p-2 flex flex-wrap justify-center gap-3">
            {recipes.length === 0 ? (
                <p className="text-gray-500 text-center mt-4">No recipes found.</p>
            ) : (
                recipes.map((item, index) => (
                    <div
                        key={item._id}
                        className="recipe-container card bg-cyan-50 rounded-2xl overflow-hidden transition-transform duration-300 max-w-[220px] w-[48%] sm:w-[47%] md:w-[30%] hover:translate-y-[-6px] hover:rotate-[1deg] hover:shadow-xl"
                    >
                        <NavLink to={`/recipe-details/${item._id}`}>
                            <img
                                src={item.photo}
                                alt={item.name}
                                className="max-h-[150px] w-full object-cover"
                            />
                            <div className="p-2">
                                <h2 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h2>
                                <p className="text-sm text-gray-500">⏱️ {item.time}</p>
                            </div>
                        </NavLink>
                        <button
                            onClick={() => handleLike(index, item._id)}
                            className="text-amber-600 text-sm font-medium ml-2.5"
                        >
                            ❤️ {likes[index]}
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default RecipeItems;
