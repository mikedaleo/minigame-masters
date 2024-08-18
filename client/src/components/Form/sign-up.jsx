import { useState } from 'react';
import Auth from '../../utils/auth';
import { CREATE_USER, LOGIN_USER } from '../../utils/mutations'

import { useMutation } from '@apollo/client';

function SignUp() {
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    const [currentForm, setCurrentForm] = useState('login');
    const [createUser] = useMutation(CREATE_USER);
    const [login, { loading, data, error }] = useMutation(LOGIN_USER);

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserFormData({ ...userFormData, [name]: value });
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
            variables: { ...userFormData }
          });

          if (data && data.createUser) {
            console.log("User created:", data.createUser);
            Auth.login(data.createUser.token);
          } else {
            console.error("Unexpected response:", data);
          }
        } catch (error) {
          console.error("Signup error:", error);
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
        console.log(userFormData);
        try {
          
          const { data } = await login({
            variables: { ...userFormData }
            
          })
          console.log("data:", await login({
            variables: { ...userFormData }
            
          }));
          
          console.log(data.login.token);
          Auth.login(data.login.token);
        } catch (err) {
          console.error(err);
          
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
                                <input 
                                value={userFormData.email || ""} 
                                onChange={handleInputChange} 
                                name="email" 
                                type="email" 
                                placeholder='email'>
                                </input>
                                <input value={userFormData.username || ""} onChange={handleInputChange} name="username" type="username" placeholder='username'></input>
                                <input value={userFormData.password || ""} onChange={handleInputChange} name="password" type="password" placeholder='password'></input>
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
                                {error ? <p>{error.message}</p> : ''}
                                <span>Login with Username</span>
                                <input value={userFormData.username || ''} name="username" type="username" placeholder='username' onChange={handleInputChange}></input>
                                <input value={userFormData.password || ''} name="password" type="password" placeholder='password' onChange={handleInputChange}></input>
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