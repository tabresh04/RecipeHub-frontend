import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Trending from "./Trending";
import RecipeItems from "./RecipeItems";
import Contact from "./Contact";
import img from "../assets/wave.svg";
import img2 from "../assets/wave2.svg";
import Search from "./Search";

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    // Fetch recipes from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://recipehub-backend-t3eq.onrender.com");
                const data = await res.json();

                if (Array.isArray(data)) {
                    setRecipes(data);
                    setFilteredRecipes(data);
                } else {
                    console.error("Expected array, got:", data);
                    setRecipes([]);
                    setFilteredRecipes([]);
                }
            } catch (error) {
                console.error("Failed to fetch recipes:", error);
                setRecipes([]);
                setFilteredRecipes([]);
            }
        };

        fetchData();
    }, []);

    // Filter recipes when search term changes
    useEffect(() => {
        if (!recipes || recipes.length === 0) return;

        const results = recipes.filter((recipe) => {
            const name = recipe.name?.toLowerCase() || "";
            const ingredients = Array.isArray(recipe.ingredients)
                ? recipe.ingredients.join(", ").toLowerCase()
                : (recipe.ingredients || "").toLowerCase();

            return name.includes(searchTerm.toLowerCase()) || ingredients.includes(searchTerm.toLowerCase());
        });

        setFilteredRecipes(results);
    }, [searchTerm, recipes]);


    return (
        <>
            {/* Hero Section */}
            <div className="relative min-h-[60vh] w-full bg-gradient-to-r from-yellow-300 via-orange-400 to-amber-500 flex flex-col items-center justify-center text-center">
                <img src={img2} alt="Top wave" className="absolute top-0 left-0 w-full z-0" />

                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 z-10">
                    Welcome to Recipe Hub 🍽️
                </h1>
                <p className="text-lg md:text-xl text-white mb-6 max-w-xl z-10">
                    Discover, cook, and share your favorite dishes with the world!
                </p>
                <NavLink
                    to="/add-recipe"
                    className="bg-white hover:bg-orange-100 text-amber-600 font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 z-10"
                >
                    Share Your Recipe
                </NavLink>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <img src={img} alt="Bottom wave" className="absolute bottom-0 left-0 w-full z-0" />
            </div>

            {/* Recipe Section */}
            <div className="px-2 py-4">
                <Trending /> 
                <RecipeItems recipes={filteredRecipes} />
                <Contact />
            </div>
        </>
    );
}

export default Home;
