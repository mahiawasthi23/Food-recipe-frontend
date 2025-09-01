import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const API_BASE = "https://recipe-app-backend-2-23l5.onrender.com";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]); 
  const [publicFeed, setPublicFeed] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedOpen, setFeedOpen] = useState(false);

 
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt_desc");
  const [onlyFavMine, setOnlyFavMine] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchAll = async () => {
      setLoading(true);
      setError("");
      try {
        const [mineRes, feedRes] = await Promise.all([
          fetch(`${API_BASE}/api/recipes`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_BASE}/api/recipes/public-feed`),
        ]);
        if (!mineRes.ok) throw new Error("Failed to fetch your recipes");
        if (!feedRes.ok) throw new Error("Failed to fetch public feed");
        const mine = await mineRes.json();
        const feed = await feedRes.json();
        setRecipes(Array.isArray(mine) ? mine : []);
        setPublicFeed(Array.isArray(feed) ? feed : []);
      } catch (e) {
        setError(e.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [user, navigate, token]);

  const meId = user?._id || user?.id; 
  const isFavoritedByMe = (r) => Array.isArray(r.favorites) && meId ? r.favorites.includes(meId) : false;
  const favCount = (r) => (Array.isArray(r.favorites) ? r.favorites.length : 0);

 
  const stats = useMemo(() => {
    const totalRecipes = recipes.length;
    const totalCalories = recipes.reduce((sum, r) => sum + (parseInt(r.calories || 0, 10) || 0), 0);
    const avgCalories = totalRecipes ? Math.round(totalCalories / totalRecipes) : 0;
    const sharedCount = recipes.filter((r) => !!r.shared).length;
    const myFavsCount = recipes.filter((r) => isFavoritedByMe(r)).length;
    return { totalRecipes, totalCalories, avgCalories, sharedCount, myFavsCount };
  }, [recipes]);

  const visibleMine = useMemo(() => {
    let list = [...recipes];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((r) =>
        [r.name, (r.ingredients || []).join(", "), r.instructions]
          .filter(Boolean)
          .some((t) => String(t).toLowerCase().includes(q))
      );
    }

    if (onlyFavMine) list = list.filter((r) => isFavoritedByMe(r));

    const [key, dir] = sortBy.split("_");
    list.sort((a, b) => {
      const va = key === "calories" ? parseInt(a.calories || 0, 10)
        : key === "name" ? (a.name || "")
        : new Date(a.createdAt || 0).getTime();
      const vb = key === "calories" ? parseInt(b.calories || 0, 10)
        : key === "name" ? (b.name || "")
        : new Date(b.createdAt || 0).getTime();
      if (va < vb) return dir === "asc" ? -1 : 1;
      if (va > vb) return dir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [recipes, query, sortBy, onlyFavMine]);

 
const patchRecipe = async (id, body) => {
  console.log("PATCH request with ID:", id);
  const res = await fetch(`${API_BASE}/api/recipes/${id}`, {
    method: "PATCH",   
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
};


  const deleteRecipe = async (id) => {
    const res = await fetch(`${API_BASE}/api/recipes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Delete failed");
  };

 
  const handleToggleShared = async (recipe) => {
    console.log("Toggle Shared Recipe:", recipe._id);
    try {
      const updated = await patchRecipe(recipe._id, { shared: !recipe.shared });
      setRecipes((prev) => prev.map((r) => (r._id === recipe._id ? { ...r, ...updated } : r)));
    } catch (e) {
      alert(e.message || "Could not update shared");
    }
  };

  const handleToggleFavorite = async (recipe) => {
    try {
      const updated = await patchRecipe(recipe._id, { op: "toggleFavorite" });
      setRecipes((prev) => prev.map((r) => (r._id === recipe._id ? { ...r, ...updated } : r)));
    } catch (e) {
      alert(e.message || "Could not update favorite");
    }
  };

  const handleDelete = async (recipe) => {
    if (!window.confirm(`Delete "${recipe.name}"? This cannot be undone.`)) return;
    try {
      await deleteRecipe(recipe._id);
      setRecipes((prev) => prev.filter((r) => r._id !== recipe._id));
    } catch (e) {
      alert(e.message || "Could not delete");
    }
  };

  const handleEdit = (recipe) => navigate(`/recipes/${recipe._id}/edit`);
  const handleAdd = () => navigate("/recipes/new");

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dash-wrap">
      <Header stats={stats} user={user} onAdd={handleAdd} />

      <Toolbar
        query={query}
        setQuery={setQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onlyFavMine={onlyFavMine}
        setOnlyFavMine={setOnlyFavMine}
        feedOpen={feedOpen}
        setFeedOpen={setFeedOpen}
      />

      <section>
        <h2 className="section-title">My Recipes</h2>
        {visibleMine.length === 0 ? (
          <EmptyState onAdd={handleAdd} />
        ) : (
          <div className="grid">
            {visibleMine.map((r) => (
              <RecipeCard
                key={r._id}
                recipe={r}
                isMine
                meId={meId}
                onToggleShared={() => handleToggleShared(r)}
                onToggleFavorite={() => handleToggleFavorite(r)}
                onEdit={() => handleEdit(r)}
                onDelete={() => handleDelete(r)}
              />
            ))}
          </div>
        )}
      </section>

      {feedOpen && (
        <section className="feed">
          <h2 className="section-title">Public Feed</h2>
          {publicFeed.length === 0 ? (
            <div className="empty">No public recipes yet.</div>
          ) : (
            <div className="grid">
              {publicFeed.map((r) => (
                <RecipeCard key={r._id} recipe={r} meId={meId} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function Header({ stats, user, onAdd }) {
  const { totalRecipes, totalCalories, avgCalories, sharedCount, myFavsCount } = stats;
  return (
    <div className="header">
      <div className="title">
        <h1>Welcome, {user?.username || user?.name || "Chef"} 👋</h1>
        <div className="stats">
          <div className="stat">🍽️ Recipes: {totalRecipes}</div>
          <div className="stat">🔥 Total Calories: {totalCalories}</div>
          <div className="stat">📊 Avg/Recipe: {avgCalories}</div>
          <div className="stat">🌐 Shared: {sharedCount}</div>
          <div className="stat">⭐ My Favorites: {myFavsCount}</div>
        </div>
      </div>
      <button className="add-btn" onClick={onAdd}>＋ Add Recipe</button>
    </div>
  );
}

function Toolbar({ query, setQuery, sortBy, setSortBy, onlyFavMine, setOnlyFavMine, feedOpen, setFeedOpen }) {
  return (
    <div className="toolbar">
      <input
        className="input"
        placeholder="Search name, ingredients, instructions..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select className="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="createdAt_desc">Newest</option>
        <option value="createdAt_asc">Oldest</option>
        <option value="name_asc">Name A-Z</option>
        <option value="name_desc">Name Z-A</option>
        <option value="calories_asc">Calories (Low→High)</option>
        <option value="calories_desc">Calories (High→Low)</option>
      </select>
      <label className="checkbox">
        <input type="checkbox" checked={onlyFavMine} onChange={(e) => setOnlyFavMine(e.target.checked)} />
        My favorites only
      </label>
      <button className="btn" onClick={() => setFeedOpen((v) => !v)}>{feedOpen ? "Hide" : "Show"} Public Feed</button>
    </div>
  );
}

function RecipeCard({ recipe, isMine = false, meId, onToggleShared, onToggleFavorite, onEdit, onDelete }) {
  const calories = parseInt(recipe.calories || 0, 10) || 0;
  const created = recipe.createdAt ? new Date(recipe.createdAt).toLocaleDateString() : "";
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients.join(", ") : recipe.ingredients;
  const mineFav = Array.isArray(recipe.favorites) && meId ? recipe.favorites.includes(meId) : false;
  const totalFavs = Array.isArray(recipe.favorites) ? recipe.favorites.length : 0;

  return (
    <div className="card">
      {recipe.image && (
        <div className="card-img">
          <img src={recipe.image} alt={recipe.name} />
        </div>
      )}

      <h3>{recipe.name || "Untitled"}</h3>

      <div className="meta">
        {created && <span>🗓️ {created}</span>}
        <span>🔥 {calories} cal</span>
        {recipe.shared && <span>🌐 Shared</span>}
        {totalFavs > 0 && <span>⭐ {totalFavs} favorite{totalFavs > 1 ? "s" : ""}</span>}
      </div>

      {ingredients && (
        <div>
          <strong>Ingredients:</strong> <span>{ingredients}</span>
        </div>
      )}

      {recipe.instructions && (
        <div>
          <strong>Instructions:</strong> <span>{recipe.instructions}</span>
        </div>
      )}

      {isMine && (
        <div className="actions">
          <button className="btn ghost" onClick={onToggleFavorite}>{mineFav ? "★ Unfavorite" : "☆ Favorite"}</button>
          <button className="btn ghost" onClick={onToggleShared}>{recipe.shared ? "Make Private" : "Share Public"}</button>
          <button className="btn" onClick={onEdit}>Edit</button>
          <button className="btn danger" onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

function EmptyState({ onAdd }) {
  return (
    <div className="empty">
      <h3>No recipes yet</h3>
      <p>Add your first recipe to get started. Track calories, share, and favorite.</p>
      <button className="add-btn" onClick={onAdd}>＋ Add Recipe</button>
    </div>
  );
}
