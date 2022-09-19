import classes from './ProfileForm.module.css';
import { useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';


const ProfileForm = () => {
  const [password, setPassword] = useState();
  const authCtx = useContext(AuthContext);

  const handlePassword=(event)=>{
    setPassword(event.target.value);
  }

  const submitHandler = (event) =>{
    event.preventDefault();

    const enteredNewPassword = password;

    //add validation

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyACXLMgH8ePN_Tq5uD8wP4HWmWCBhhudHI',
      {
        method:'POST',
        body:JSON.stringify({
          idToken:authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }
    ).then(res=>{

    });

  }
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' onChange={handlePassword}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
