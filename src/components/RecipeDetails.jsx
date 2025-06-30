import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleFavourite = async () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first to add to favourites!");
            return navigate("/login");
        }

        try {
            const res = await fetch(`https://recipehub-backend-t3eq.onrender.com/favourite`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    recipeId: id,
                    name: recipe.name,
                    photo: recipe.photo,
                    time: recipe.time,
                    description: recipe.description,
                    ingredients: recipe.ingredients,
                    like: recipe.like,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Recipe added to favourites!");
            } else {
                alert(`Error: ${data.error || "Could not add to favourites"}`);
            }
        } catch (err) {
            alert("Something went wrong while adding to favourites.");
            console.error("Error while adding favourite:", err);
        }
    };

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await fetch(`http://localhost:5500/${id}`);
                const data = await res.json();
                setRecipe(data);
            } catch (err) {
                console.error("Error in fetching data ", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [id]);

    if (loading) return <p className="p-4 text-center text-4xl">Loading...</p>;
    if (!recipe) return <p className="p-4 text-center text-4xl">Recipe not found</p>;

    // Normalize ingredients (string or array)
    const renderIngredients = () => {
        if (Array.isArray(recipe.ingredients)) {
            return (
                <ul className="list-disc pl-6 text-gray-700">
                    {recipe.ingredients.map((ing, idx) => (
                        <li key={idx}>{ing.replace(/["']/g, "").trim()}</li>
                    ))}
                </ul>
            );
        }
        return <p className="text-gray-700">{recipe.ingredients}</p>;
    };

    // Normalize description (steps if newline exists)
const renderDescription = () => {
    if (typeof recipe.description === "string" && recipe.description.includes(",")) {
        return (
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
                {recipe.description
                    .split(",")
                    .map((step, idx) => (
                        <li key={idx}>{step.replace(/["']/g, "").trim()}</li>
                    ))}
            </ul>
        );
    }

    if (Array.isArray(recipe.description)) {
        return (
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
                {recipe.description.map((step, idx) => (
                    <li key={idx}>{step.replace(/["']/g, "").trim()}</li>
                ))}
            </ul>
        );
    }

    return <p className="text-gray-700">{recipe.description}</p>;
};



    return (
        <div className="flex flex-wrap justify-center gap-6 p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg transition-all duration-300">
            <div>
                <img
                    className="w-64 h-64 object-cover rounded-full shadow-md"
                    src={recipe.photo}
                    alt={recipe.name}
                />
            </div>
            <div className="flex-1 space-y-3">
                <h1 className="text-3xl font-bold text-purple-700">🍽️ {recipe.name}</h1>
                <p className="text-sm text-gray-500">⏱️ Time: {recipe.time}</p>
                <p className="text-sm text-gray-500">❤️ Likes: {recipe.like}</p>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2">🧂 Ingredients:</h2>
                    {renderIngredients()}
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2">📝 Description:</h2>
                    {renderDescription()}
                </div>
                <button
                    onClick={handleFavourite}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                    Add to Favourites
                </button>
            </div>
        </div>
    );
}

export default RecipeDetails;
