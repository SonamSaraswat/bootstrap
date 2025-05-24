import React from 'react'
import { assets } from '../../assets/assets'
import { models } from '../../assets/assets'
import { Link, useLocation } from 'react-router-dom'
import './Style.css'

const Solar = ({id}) => {

    const location = useLocation();
  const { img, title, price } = location.state;

  return (
    <div className='solar'>
        <div className="solar-container">
            <img src={img}/>
            <p>{price}</p>
            </div>
            <div className="solar-power">
            <b>Power</b>
             <select className='solar-watts'>
                <option>Choose an Option</option>
                <option>1 KW</option>
                <option>2 KW</option>
                <option>3 KW</option>
                <option>4 KW</option>
                <option>5 KW</option>
                <option>6 KW</option>
                <option>7 KW</option>
                <option>8 KW</option>
             </select>
            
            <Link to='/Cart'><button>Add to Cart</button></Link>
            <p>SKU: MTX-SOLAR Category: Solar Panal Installation Tags: Payment, SOLARTRIX Brand: Monitrix Corporate Services</p>
             </div>
        <div className="solar-desc">
            <h1>Unlock Sustainable Living with Solar Power</h1>
            <p>In today’s world, harnessing the power of the sun has become not just a trend, but a necessity. With the PM Surya Ghar Yojana, you can now install solar panels at an affordable price and significantly reduce your energy bills. This initiative aims to promote the use of renewable energy sources, empowering households to generate their own electricity while contributing to a greener planet.</p>
             
             <h1>Why Choose Solar Panel Installation?</h1>
             <p>Investing in solar panels under the PM Surya Ghar Yojana not only helps you save on electricity costs but also leads to numerous environmental benefits. By choosing solar energy, you’re reducing your carbon footprint and promoting a sustainable lifestyle. Here are some compelling reasons to consider installing solar panels:</p>
              <ul>
                <li>Cost Savings: Lower your monthly electricity bills and utilize government subsidies.</li>
                <li>Energy Independence: Generate your own power and reduce dependence on traditional energy sources.</li>
                <li>Increased Property Value: Homes equipped with solar panels often see an increase in property value.</li>
              </ul>
              
              <h1>How to Get Started with Your Solar Panel Installation</h1>
              <p>Begin your journey toward a sustainable future by enrolling in the PM Surya Ghar Yojana today. The process is simple</p>
               <ul>
                <li>Assessment: Contact a certified solar provider who will evaluate your energy needs and determine the best solar system for your home.</li>
               <li>Documentation: Complete the necessary documentation as per the guidelines of the PM Surya Ghar Yojana to ensure eligibility for subsidies</li>
               <li>Installation: Once approved, our experts will handle the installation professionally, ensuring your system is operational without any hassle.</li>
               </ul>

               <p>As you engage in this initiative, remember that solar energy is more than just energy—it’s a step toward a sustainable future. Take advantage of this opportunity to become a part of an environmentally friendly movement while enjoying the economic benefits of solar energy. Don’t miss out on the chance to contribute to a cleaner world while keeping your wallet happy. Install solar panels under the PM Surya Ghar Yojana today and power your home in a way that supports both your lifestyle and the environment.</p>
        
        </div>



    </div>
  )
}

export default Solar