import "./Heropages.css";

const heroData = [
  { title: "Pasta", img: "https://pinchofyum.com/wp-content/uploads/Roasted-Red-Pepper-Pasta-420x600.jpg" },
  { title: "Salads", img: "https://pinchofyum.com/wp-content/uploads/Toss-Pasta-Salad-Bowl-420x600.jpg" },
  { title: "Most Popular", img: "https://pinchofyum.com/wp-content/uploads/Ginger-Peanut-Chicken-1-420x600.jpg" },
  { title: "Quick and Easy", img: "https://pinchofyum.com/wp-content/uploads/Teriyaki-Burgers-9-420x600.jpg" },

  { title: "Crispy Smashed Potato Salad", img: "https://cdn.storifyme.xyz/accounts/pinchofyum-2302815/assets/696x928/480x/f-screenshot-2025-07-14-at-111339-am-69771752509633937.png?t=1752509661000" },
  { title: "Thai-Inspired Chicken Salad", img: "https://cdn.storifyme.xyz/accounts/pinchofyum-2302815/assets/696x928/480x/f-screenshot-2025-07-08-at-14021-pm-17451752000053470.png?t=1752000080000" },
  { title: "Chocolate Chip Cookies", img: "https://cdn.storifyme.xyz/accounts/pinchofyum-2302815/assets/696x928/480x/f-screenshot-2025-07-03-at-113847-am-41071751560739101.png?t=1751560754000" },
  { title: "Ricotta Meatballs", img: "https://cdn.storifyme.xyz/accounts/pinchofyum-2302815/assets/696x928/480x/f-screenshot-2025-07-03-at-113202-am-18481751560331383.png?t=1751560438000" },
];

export default function HeroSection() {
  return (
    <div id="hero-section"  className="hero-section">
      <div className="hero-heading">
        <h2>
          SIMPLE RECIPES MADE FOR{" "}
          <span className="italic-text">real, actual, everyday life.</span>
        </h2>
      </div>

      <div className="hero">
        {heroData.map((item, i) => (
          <div className="hero-card" key={i}>
            <img src={item.img} alt={item.title} />
            <span className="tag">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
