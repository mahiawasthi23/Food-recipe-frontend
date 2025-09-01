import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import RecipeForm from "./pages/RecipeForm";
import { AuthProvider, useAuth } from "./context/AuthContext"; 

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute />} />
          <Route path="/recipes/new" element={<RecipeForm/>}/>
          <Route path="/recipes/:id/edit" element={<RecipeForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}


function PrivateRoute() {
  const { user, loading } = useAuth(); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Dashboard />;
}

export default App;



