

function Login() {
    return (
        <div className="container" id="container">
            <div className="form-container">
                <form className='form'>
                    <h2>Login</h2>
                    <span>Login with Username</span>
                    <input  name="email" type="email" placeholder='email'></input>
                    <input  name="userName" type="username" placeholder='username'></input>
                    <input  name="password" type="password" placeholder='password'></input>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;