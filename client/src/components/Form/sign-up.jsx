import { useState } from 'react';

import Auth from '../../utils/auth';
import { createUser, loginUser } from '../../utils/API';

function SignUp() {
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    const [currentForm, setCurrentForm] = useState('login');

    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        // Based on the input type, we set the state of either email, username, and password
        if (inputType === 'email') {
            setEmail(inputValue);
        } else if (inputType === 'userName') {
            setUserName(inputValue);
        } else {
            setPassword(inputValue);
        }
    };

    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        console.log(userFormData);
        
        try {
          const { data } = await createUser({
            variables: { ...userFormData },
          });
          
          Auth.login(data.createUser.token);
        } catch (err) {
          console.error(err);
          setShowAlert(true);
        }
        setUserFormData({
          username: '',
          email: '',
          password: '',
        });
      };

      const handleLoginSubmit = async (event) => {
        event.preventDefault();
    
        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        try {
          const response = await loginUser(userFormData);
    
          if (!response.ok) {
            throw new Error('something went wrong!');
          }
    
          const { token, user } = await response.json();
          console.log(user);
          Auth.login(token);
        } catch (err) {
          console.error(err);
          setShowAlert(true);
        }
    
        setUserFormData({
          username: '',
          email: '',
          password: '',
        });
      };

    // Function to toggle form visibility
    const toggleForm = () => {
        setCurrentForm(currentForm === 'login' ? 'signUp' : 'login');
    };


    return (
        <div className="container">
            {currentForm === 'login' ? (
                <>
                    <div className='container'>
                        <div className="form-container">
                            <form className='form sign-up' onSubmit={handleSignupSubmit}>
                                <h2>Create Account</h2>
                                <span>Register with E-mail</span>
                                <input value={userFormData.email} onChange={handleInputChange} name="email" type="email" placeholder='email'></input>
                                <input value={userFormData.username} onChange={handleInputChange} name="username" type="username" placeholder='username'></input>
                                <input value={userFormData.password} onChange={handleInputChange} name="password" type="password" placeholder='password'></input>
                                <button type="submit" className='btn' disabled={!(userFormData.username && userFormData.email && userFormData.password)}>Sign Up</button>
                            </form>
                        </div>
                        <button onClick={toggleForm} className="toggle-btn">
                            {currentForm === 'login' ? 'Already have an account?' : "Don't have an account?"}
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="container">
                        <div className="form-container">
                            <form className='form login' onSubmit={handleLoginSubmit}>
                                <h2>Login</h2>
                                <span>Login with Username</span>
                                <input name="userName" type="username" placeholder='username'></input>
                                <input name="password" type="password" placeholder='password'></input>
                                <button type="submit" className='btn'>Login</button>

                            </form>
                        </div>
                        <button onClick={toggleForm} className="toggle-btn">
                            {currentForm === 'login' ? 'Already have an account?' : "Don't have an account?"}
                        </button>
                    </div>
                </>
            )}
        </div>

    )
}
export default SignUp;