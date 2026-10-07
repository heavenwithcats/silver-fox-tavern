import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmail, signInWithProvider } from '../services/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const { data, error } = await signInWithEmail(email, password);

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      // Successfully logged in! Direct to tavern den / dashboard
      navigate('/home');
    }
  };

  const handleOAuth = async (provider) => {
    const { error } = await signInWithProvider(provider);
    if (error) setErrorMsg(error.message);
  };

   return(
    <div className='App-header'>
            <h1 className='festive-regular'>Login</h1>
            <p className="quicksand-fox">Welcome back! To see all of our recipes, stories, and tips you will have to log in!</p>
        <form onSubmit={handleSubmit} className="auth-form quicksand-fox">
  {errorMsg && <div className="auth-error">{errorMsg}</div>}

  <div className="form-group">
    <label htmlFor="email">Cabin Email Address</label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="silver-fox@tavern.com"
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="password">Unique Tavern Passcode</label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="••••••••"
      required
    />
  </div>

  <button
    type="submit"
    className="marshmallow-btn auth-submit-btn"
    disabled={loading}
  >
    {loading ? 'Opening the Den...' : 'Enter the Den'}
  </button>
</form>
<div className="marshmallow-group">
  <button type="button" className="marshmallow-btn" onClick={() => handleOAuth('google')}>
    <FontAwesomeIcon icon={faGoogle} /> Travel w/ Google
  </button>
  
  <button type="button" className="marshmallow-btn" onClick={() => handleOAuth('github')}>
    <FontAwesomeIcon icon={faGithub} /> Travel w/ GitHub
  </button>

  <button type="button" className="marshmallow-btn" onClick={() => handleOAuth('facebook')}>
    <FontAwesomeIcon icon={faFacebook} /> Travel w/ Facebook
  </button>
  <br />
  <br />
  <br />
           <Link to="/" className="marshmallow-btn">Lost?</Link>
          <Link to="/signUp" className="marshmallow-btn">Sign Up Instead!</Link>
        
</div>
</div>
   )
}

