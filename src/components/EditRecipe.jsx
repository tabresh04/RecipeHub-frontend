import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: "",
        description: "",
        time: "",
        like: 0,
        photo: ""
    });

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await fetch(`http://localhost:5500/${id}`);
                const data = await res.json();
                setRecipe(data);
            } catch (err) {
                console.error("Failed to fetch recipe", err);
            }
        };
        fetchRecipe();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5500/edit-recipe/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recipe)
            });

            const data = await res.json();
            if (res.ok) {
                alert("Recipe updated successfully!");
                navigate(`/YourRecipes/${userId}`);
            } else {
                alert(data.error || "Failed to update recipe");
            }
        } catch (err) {
            console.error("Error updating recipe", err);
            alert("Something went wrong while updating the recipe.");
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center text-amber-600 mb-4">Edit Your Recipe</h2>

                <input
                    type="text"
                    name="name"
                    value={recipe.name}
                    placeholder="Enter Recipe name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="ingredients"
                    value={recipe.ingredients}
                    placeholder="Ingredients"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    value={recipe.description}
                    placeholder="Description"
                    rows="3"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                    onChange={handleChange}
                ></textarea>

                <input
                    type="text"
                    name="time"
                    value={recipe.time}
                    placeholder="Enter time to complete"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                    onChange={handleChange}
                />

                <input
                    type="hidden"
                    name="like"
                    value={recipe.like}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="photo"
                    value={recipe.photo}
                    placeholder="Enter image URL"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-md transition duration-200"
                >
                    Update Recipe
                </button>
            </form>
        </div>
    );
}

export default EditRecipe;