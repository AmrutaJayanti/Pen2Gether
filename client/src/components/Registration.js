import React from 'react';
import './../css/Registration.css'
function Registration() {
  return (
    <div className='form-container'>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" placeholder="Enter username" id="user"/>
        </div>

        <div>
          <label>Password:</label>
          <input type="password" placeholder="Enter password" id="pass"/>
        </div>

        <div>
          <label>Confirm Password:</label>
          <input type="password" placeholder="Re-enter password" id="cpass"/>
        </div>

        <div id="but">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
