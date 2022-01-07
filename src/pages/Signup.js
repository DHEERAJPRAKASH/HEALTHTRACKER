import React from 'react'
import '../components/Signup.css';
function Signup() {
    return (
        <div>
        <body>
        <div className="background">
            <div id="login-box">
                <div class="left">
                  <h1>Sign up</h1>
                  
                  <input type="text" name="username" placeholder="Username" />
                  <input type="text" name="email" placeholder="E-mail" />
                  <input type="password" name="password" placeholder="Password" />
                  <input type="password" name="password2" placeholder="Retype password" />
                  
                  <input type="submit" name="signup_submit" value="Sign me up" />
                </div>
                
                <div className="right">
        
                </div>
              </div>
        </div>
    </body>
        </div>
    )
}

export default Signup
