import React from 'react'
import amazon from '../../public/images/amazon.png'
import fp from '../../public/images/flipkart.png'
import heroImg from '../../public/images/shoe.png'


const Hero = () => {
  return (
    <main className='Hero cont'>
      <div className='Hero-Content'>
        <h1>YOUR FEET DESERVES BEST</h1>
        <p>your feet deserves the best and we're here to help you with our shoes .</p>

        <div className="hero-btn">
          <button>Shop Now</button>
          <button className='secondary-btn'>Category</button>
        </div>

      <div className="shopping">
        <p>Available on </p>
      </div>

      <div className="brand-icons">
        <img src={amazon} alt="" />
        <img src={fp} alt="" />
      </div>

      </div>
      <div className='Hero-Img'>
        <img src={heroImg} alt="" />
      </div>
    </main>
  )
}

export default Hero