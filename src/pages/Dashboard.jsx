import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
    
      window.location.href = "/login";
      return;
    }

    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });

      
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }

        const data = await response.json();
        setRecipes(data);
        setTotalCalories(data.reduce((sum, recipe) => sum + parseInt(recipe.calories), 0));
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchRecipes(); 
  }, [user]); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <h2>Total Calories: {totalCalories}</h2>
      <div>
        {recipes.length === 0 ? (
          <p>No recipes available</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe._id}>
              <h3>{recipe.title}</h3>
              <p>{recipe.ingredients}</p>
              <p>{recipe.instructions}</p>
              <p>{recipe.calories} calories</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
