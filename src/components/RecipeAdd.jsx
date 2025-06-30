import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function RecipeAdd() {
    const { id } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const [recipe, setRecipe] = useState({
        userId: userId || "",
        name: "",
        ingredients: "",
        description: "",
        time: "",
        like: 0,
        photo: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }

        setRecipe((prev) => ({
            ...prev,
            userId: userId || "",
        }));

    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("https://recipehub-backend-t3eq.onrender.com/add-recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recipe),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Recipe added successfully");
                navigate("/");
            } else {
                alert(data.error || "Failed to add recipe");
            }
        } catch (err) {
            console.log("Submit error:", err);
            alert("Something went wrong while adding recipe");
        }
    };

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
                >
                    <h2 className="text-2xl font-semibold text-center text-amber-600 mb-4">Add Your Recipe</h2>

                    <input
                        type="hidden"
                        name="userId"
                        value={recipe.userId}
                    />

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
                        Submit Recipe
                    </button>
                </form>
            </div>
            <div className="">
                <h1 className="text-xl text-center text-amber-600 m-4">How to add Recipe</h1>
                <ul className="pl-2 text-purple-800">
                    <li>🍚 Add name e.g, Samosa.</li>
                    <li>🍚 Add Ingridients with leaving any space after comma as(Potato,Rice,Onion...).</li>
                    <li>🍚 Add Description same as Ingridients.</li>
                    <li>🍚 Enter time as (40 min or 1 hr)</li>
                    <li>🍚 You need to enter photo url take from internet.</li>
                </ul>
            </div>
        </div>
    );
}

export default RecipeAdd;
