import { useState } from 'react';

function SignUp() {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

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


    return (
        <div className="container" id="container">
            <div className="form-container">
                <form className='form'>
                    <h2>Create Account</h2>
                    <span>Register with E-mail</span>
                    <input value={email} onChange={handleInputChange} name="email" type="email" placeholder='email'></input>
                    <input value={userName} onChange={handleInputChange} name="userName" type="username" placeholder='username'></input>
                    <input value={password} onChange={handleInputChange} name="password" type="password" placeholder='password'></input>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
        
    )
}
export default SignUp;