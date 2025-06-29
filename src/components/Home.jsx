import { NavLink } from "react-router-dom";

import Trending from "./Trending";
import RecipeItems from "./RecipeItems";
import Contact from "./Contact";
import img from "../assets/wave.svg";
import img2 from "../assets/wave2.svg";

function Home() {
    return (
        <>
            <div className="min-h-[60vh] w-full bg-gradient-to-r from-yellow-300 via-orange-400 to-amber-500 flex flex-col items-center justify-center text-center">
                <img src={img2} alt="wavePattern" className="wave2" />
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg z-10">
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
                <img src={img} alt="wavePattern" className="wave" />
            </div>

            {/* Recipe Grid Section */}
            <div className="px-2 py-4">
                <Trending />
                <RecipeItems />
                <Contact />
            </div>
        </>
    );
}

export default Home;
