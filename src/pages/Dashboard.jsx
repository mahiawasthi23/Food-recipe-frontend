import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://recipe-app-backend-2-23l5.onrender.com/api/recipes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }

        const data = await response.json();
        setRecipes(data);
        setTotalCalories(data.reduce((sum, recipe) => sum + parseInt(recipe.calories || 0), 0));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [user, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.username}</h1>
      <h2>Total Calories: {totalCalories}</h2>

      <div className="recipes">
        {recipes.length === 0 ? (
          <p>No recipes available</p>
        ) : (
          recipes.map((recipe) => (
            <div className="recipe-card" key={recipe._id}>
              <h3>{recipe.title}</h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <p><strong>Calories:</strong> {recipe.calories}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;