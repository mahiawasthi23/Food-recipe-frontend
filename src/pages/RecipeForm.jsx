import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './RecipeForm.css';

const API_BASE = "https://recipe-app-backend-2-23l5.onrender.com";

export default function RecipeForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // recipe id
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [calories, setCalories] = useState("");
  const [image, setImage] = useState("");

  // Fetch recipe data if editing
  useEffect(() => {
    if (!id) return; // Add mode
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/recipes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch recipe");
        const data = await res.json();
        setName(data.name || "");
        setIngredients((data.ingredients || []).join(", "));
        setInstructions(data.instructions || "");
        setCalories(data.calories || "");
        setImage(data.image || "");
      } catch (err) {
        alert(err.message);
      }
    };
    fetchRecipe();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = id ? "PATCH" : "POST"; // edit or add
      const url = id ? `${API_BASE}/api/recipes/${id}` : `${API_BASE}/api/recipes`;
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          ingredients: ingredients.split(",").map((i) => i.trim()),
          instructions,
          calories,
          image,
        }),
      });
      if (!res.ok) throw new Error(id ? "Failed to update recipe" : "Failed to add recipe");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="form-wrap">
      <h2>{id ? "Edit Recipe" : "Add New Recipe"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Ingredients (comma separated):
          <input value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </label>
        <label>
          Instructions:
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        </label>
        <label>
          Calories:
          <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />
        </label>
        <label>
          Image URL:
          <input value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
        <button type="submit">{id ? "Update Recipe" : "Add Recipe"}</button>
      </form>
    </div>
  );
}
