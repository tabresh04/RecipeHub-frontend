import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import './App.css'

const getAllRecipes = async () => {
  let allRecipes = [];
  await axios.get('http://localhost:5500').then(res => {
    allRecipes = res.data;
  });
  return allRecipes;
}

const favouriteLoader = async ({ params }) => {
  const userId = params.userId;

  const res = await fetch(`http://localhost:5500/favourite/${userId}`);
  if (!res.ok) {
    const errText = await res.text();
    console.error("Backend response error:", errText);
    return [];
  }

  return res.json();
};


import Home from './components/Home';
import Navbar from './components/Navbar';
import Favourite from './components/Favourite';
import RecipeAdd from './components/RecipeAdd';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import RecipeDetails from './components/RecipeDetails';
import YourRecipes from './components/YourRecipes';
import EditRecipe from './components/EditRecipe';
import Admin from './components/Admin';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ), loader: getAllRecipes
  },
  {
    path: "/favourite/:userId",
    element: (
      <div>
        <Navbar />
        <Favourite />
      </div>
    ), loader: favouriteLoader
  },
  {
    path: "/YourRecipes/:userId",
    element: (
      <div>
        <Navbar />
        <YourRecipes />
      </div>
    ), loader: favouriteLoader
  },
  {
    path: "/add-recipe",
    element:
      <div>
        <Navbar />
        <RecipeAdd />
      </div>
  },
  {
    path: "/recipe-details/:id",
    element:
      <div>
        <Navbar />
        <RecipeDetails />
      </div>
  },
  {
    path: "/edit-recipe/:id",
    element:
      <div>
        <Navbar />
        <EditRecipe />
      </div>
  },
  {
    path: "/users/admin",
    element:
      <div>
        <Navbar />
        <Admin />
      </div>
  },
  {
    path: "/login",
    element:
      <div>
        <Navbar />
        <Login />
      </div>
  },
  {
    path: "/signup",
    element:
      <div>
        <Navbar />
        <Signup />
      </div>
  },
  {
    path: "/contact",
    element:
      <div>
        <Navbar />
        <Contact />
      </div>
  },
])

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
