import React from "react";
import "./Banner.css";
import HeroSection from "./Heropages";
import RecipeVideo from "../assets/RecipeAap.mp4"; 

export default function Banner() {
    return (
        <div>
            <div className="banner">
                <video className="banner-video" autoPlay loop muted playsInline>
                    <source src={RecipeVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="banner-content">
                    <h1>Spice & Flavor</h1>
                    <p>Fresh Ingredients  Tasty Recipes  Healthy Living</p>
                    <button
                        className="banner-btn"
                        onClick={() =>
                            document.getElementById("hero-section").scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        Get Started
                    </button>
                </div>
            </div>
            <HeroSection />
        </div>
    );
}
