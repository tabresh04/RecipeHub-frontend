import { NavLink, useLoaderData } from "react-router-dom";
import { useEffect, useRef } from "react";

function Trending() {
    const allRecipes = useLoaderData();
    const scrollRef = useRef(null);

    useEffect(() => {
        const container = scrollRef.current;

        const scroll = () => {
            if (!container) return;
            const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

            if (atEnd) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: 240, behavior: 'smooth' });
            }
        };

        const interval = setInterval(scroll, 3000);

        return () => clearInterval(interval);
    }, []);

    const trendingItems = allRecipes?.filter(item => item.like > 15);

    if (!trendingItems?.length) return null;

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold text-amber-600 mb-3 text-center">🔥 Trending Recipes</h2>

            <div
                ref={scrollRef}
                className="flex overflow-x-auto space-x-4 pb-2 snap-x snap-mandatory scroll-smooth hide-scrollbar  min-h-[150px]"
            >
                {trendingItems.map((item, index) => (
                    <div
                        key={item._id}
                        className="min-w-[180px] snap-start bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition duration-300"
                    >
                        <NavLink to={`/recipe-details/${item._id}`}>
                            <img
                                src={item.photo}
                                alt={item.name}
                                className="h-40 w-full object-cover"
                            />
                            <div className="p-3">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                                <p className="text-gray-600 text-sm truncate mb-1">{item.discription}</p>
                                <p className="text-xs text-gray-500">⏱️ {item.time}</p>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Trending;
