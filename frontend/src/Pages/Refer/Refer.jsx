import React from 'react';
import { assets } from '../../assets/assets';


const Refer = () => {
  return (
    <div className='container my-5'>
      <div className="text-center mb-5">
        <img src={assets.r1} className="img-fluid mb-3" alt="Refer" />
        <h1 className="fw-bold">Refer to Earn With Monitrix</h1>
        <img src={assets.m} className="img-fluid my-3" alt="Monitrix" />
        <p className="lead">
          At Monitrix, we believe in rewarding our valued clients for their trust and support.
          Introducing our Refer to Earn program – an exciting opportunity for existing clients to
          refer new customers to us and enjoy exclusive benefits in return.
        </p>
      </div>

      <h2 className="text-center mb-4 text-primary">How It Works</h2>

      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <ol className="list-group list-group-numbered">
            <li className="list-group-item">Refer a Friend: Fill out the referral form with your friend’s details.</li>
            <li className="list-group-item">They Join Us: Your referred friend subscribes to our services.</li>
            <li className="list-group-item">You Earn Rewards: Earn once their subscription is confirmed!</li>
          </ol>
        </div>
        <div className="col-md-6 text-center">
          <img src={assets.r2} className="img-fluid rounded shadow" alt="How it works" />
        </div>
      </div>

      <div className="row align-items-center mb-5">
        <div className="col-md-6 text-center">
          <img src={assets.r3} className="img-fluid rounded shadow" alt="Rewards" />
        </div>
        <div className="col-md-6">
          <p>
            We’ve designed our Refer to Earn program to give you flexibility and value:
            <ul>
              <li><strong>Instant Discount:</strong> 10% off all Monitrix services for every successful referral.</li>
              <li><strong>Credit Points Option:</strong> Save and redeem anytime – your choice!</li>
              <li><strong>Unlimited Referrals:</strong> No cap – refer as many friends as you like!</li>
            </ul>
          </p>
        </div>
      </div>

      <div className="mb-5">
        <h2 className="text-center mb-4 text-success">Why Refer Monitrix?</h2>
        <ol className="list-group list-group-numbered mb-3">
          <li className="list-group-item">Reliable Services: Share the confidence of working with a trusted partner.</li>
          <li className="list-group-item">Hassle-Free Process: Simple referrals, and we handle the rest.</li>
          <li className="list-group-item">Mutual Benefits: Your friends get great service, you earn rewards.</li>
        </ol>
        <blockquote className="blockquote text-center">
          <p className="mb-0">“You don’t need to worry – Monitrix is here for you, buddy!”</p>
        </blockquote>
        <p className="mt-3 text-center">
          We’re committed to making your experience seamless and rewarding. Refer your friends today
          and unlock savings or credits to use whenever you like.
        </p>
        <div className="text-center">
          <h4 className="text-decoration-underline">Ready to Start?</h4>
          <p>Fill out the form below to refer a friend and kickstart your journey with Monitrix!</p>
          <h5 className="fw-bold text-danger mt-3">Registration Form</h5>
        </div>
      </div>

      <div className="text-center bg-light p-4 rounded shadow">
        <b className="d-block mb-3">Refer a friend, earn 10% off – or save your credits for later!”</b>
        <img src={assets.referral} className="img-fluid" alt="Referral Banner" />
      </div>
    </div>
  );
};

export default Refer;