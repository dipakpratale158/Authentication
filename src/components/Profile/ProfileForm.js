import classes from './ProfileForm.module.css';
import AuthContext from '../../store/Auth-context';
import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  
  const submitHandler = (event) => {
    event.preventDefault();
     const enteredNewPassword = newPasswordInputRef.current.value;
    //posting new password 
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDRorahRJ_juKatl8aQXmkip1wxxy28S84', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      // assumption: Always succeeds!
       console.log('changed successfully')
       history.replace('/auth')

    });
  }; 

  

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password' ref={newPasswordInputRef} minLength='7'>New Password</label>
        <input type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
