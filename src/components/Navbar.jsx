import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const admin = "685cc18758dbb77b2516a829";

    let isAdmin = userId && admin === userId;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="flex flex-wrap bg-amber-500 p-4 gap-4 justify-center">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "text-white font-bold" : "text-black"
                }
            >
                Home
            </NavLink>

            {token && (
                <NavLink
                    to={`/favourite/${userId}`}
                    className={({ isActive }) =>
                        isActive ? "text-white font-bold" : "text-black"
                    }
                >
                    Favourite
                </NavLink>
            )}
            {isAdmin && token && (
                <NavLink
                    to="/users/admin"
                    className={({ isActive }) =>
                        isActive ? "text-white font-bold" : "text-black"
                    }
                >
                    Admin
                </NavLink>
            )}
            {!isAdmin &&token && (
                <NavLink
                    to={`/YourRecipes/${userId}`}
                    className={({ isActive }) =>
                        isActive ? "text-white font-bold" : "text-black"
                    }
                >
                    YourRecipes
                </NavLink>
            )}

            {!token ? (
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        isActive ? "text-white font-bold" : "text-black"
                    }
                >
                    Login
                </NavLink>
            ) : (
                <button onClick={handleLogout} className="text-black font-medium">
                    Logout
                </button>
            )}

            {/* <NavLink
                to="/contact"
                className={({ isActive }) =>
                    isActive ? "text-white font-bold" : "text-black"
                }
            >
                Contact
            </NavLink> */}
        </div>
    );
}

export default Navbar;
