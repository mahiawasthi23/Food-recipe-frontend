import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Banner from "./pages/Banner";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext"; 
import Footer from "./Components/Footer";

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Banner/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute />} />
        </Routes>
        <Footer />
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



