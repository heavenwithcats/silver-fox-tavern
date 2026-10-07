import React from 'react';
import { Link } from 'react-router-dom';
import Fox from '../assets/Lost.png'; // Adjust path if Lost.png is in a different folder

function Lost() {

return (

<div className="App-header">

<img src={Fox} className="cozy-fox" alt="cozy fox" />

<p className=" quicksand-fox">
        Hello fellow foxy traveler! It looks like you've wandered off the trail. 
        Step inside to your Den: <strong>Log In</strong> if you're a returning traveler, 
        or <strong>Sign Up</strong> to pull up a chair, warm yourself by the fire, 
        and sample all of our legendary treats.
      </p>

      <div className="btn-group" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
        <Link to="/login" className="marshmallow-btn">Log In</Link>
        <Link to="/signUp" className="marshmallow-btn">Sign Up</Link>
      </div>

</div>

);

} 

export default Lost;