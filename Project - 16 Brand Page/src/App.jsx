import brand from "../public/images/brand_logo.png"
import './App.css'
import Hero from './component/Hero'

const App = () => {
  return (
    <div>
      <nav className="cont">
        <div className="logo">
          <img src={brand} alt="logo" />
        </div>
        <ul>
          <li href="#">Home</li>
          <li href="#">Location</li>
          <li href="#">About</li>
          <li href="#">Contact</li>
        </ul>

        <button class="animated-button">
          Log-In
        </button>
      </nav>
      <Hero/>
    </div>

  )
};

export default App;