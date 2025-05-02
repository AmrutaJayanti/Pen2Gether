import React from 'react';
import '../css/login.css'
function Login(){
    return(
        <div className='main'>
            <form className='form'>
                <table>
                    <tr>
                        <td><label>Username</label></td>
                        <td><input type="text" placeholder='Enter username'/><br/></td>
                    </tr>
                    <tr>
                        <td><label>Password</label></td>
                        <td><input type="password" placeholder='Enter password'/><br/></td>
                    </tr>
                </table>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default Login;