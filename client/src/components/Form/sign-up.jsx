import { useState } from 'react';

function SignUp() {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
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

    // Function to toggle form visibility
    const toggleForm = () => {
        setCurrentForm(currentForm === 'login' ? 'signUp' : 'login');
    };


    return (
        <div className="container">
            {currentForm === 'login' ? (<div className="form-container">
                <form className='form sign-up'>
                    <h2>Create Account</h2>
                    <span>Register with E-mail</span>
                    <input value={email} onChange={handleInputChange} name="email" type="email" placeholder='email'></input>
                    <input value={userName} onChange={handleInputChange} name="userName" type="username" placeholder='username'></input>
                    <input value={password} onChange={handleInputChange} name="password" type="password" placeholder='password'></input>
                    <button type="submit">Sign Up</button>
                </form>
            </div>) : (
        <div className="container">
            <div className="form-container">
                <form className='form login'>
                    <h2>Login</h2>
                    <span>Login with Username</span>
                    <input name="userName" type="username" placeholder='username'></input>
                    <input name="password" type="password" placeholder='password'></input>
                    <button type="submit">Login</button>
                    
                </form>
            </div>
        </div>
    )}
            <button onClick={toggleForm} className="toggle-btn">
                {currentForm === 'login' ? 'Already have an account?' : "Don't have an account?"}
            </button>
        </div>

    )
}
export default SignUp;