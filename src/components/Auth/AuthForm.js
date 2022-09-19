import { useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const emailHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = email;
    const enteredPassword = password;

    //optional validation

    //moramo koristiti https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY] iz Firebase Projekta na kojem radimo
    //web api key: AIzaSyACXLMgH8ePN_Tq5uD8wP4HWmWCBhhudHI

    //Prije izvrsavanja loader stavimo na true
    setIsLoading(true);
    let url;

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACXLMgH8ePN_Tq5uD8wP4HWmWCBhhudHI';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACXLMgH8ePN_Tq5uD8wP4HWmWCBhhudHI';
    }

    fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      setIsLoading(false); //kad se dobije odgovor vracamo ga na false bez obzira kakav je odgovor
      if (res.ok) {
        return res.json();
      }
      else {
        return res.json().then(data => {
          //show an error modal
          let errorMessage = "Authentication failed!";
          // if (data && data.error && data.error.message) {
          //   const errorMessage = data.error.message;
          // }
          throw new Error(errorMessage);
        });
      }
    }).then(data => {
      authCtx.login(data.idToken);
     })
    .catch(err => {
      alert(err.message);

    });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required onChange={emailHandler} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required onChange={passwordHandler} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request ... </p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
