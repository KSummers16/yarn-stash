import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getUserByEmail } from "../services/userService.js"
import "./login.css"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()


    const handleLogin = (e) => {
        e.preventDefault()

        getUserByEmail(email).then((foundUsers)=>{
            if (foundUsers.length===1) {
                const user = foundUsers[0]
                localStorage.setItem(
                    "yarn_user",
                    JSON.stringify({
                        id: user.id,
                        name: user.name,
                        email: user.email
                    })
                )
                navigate("/")

            } else {
                window.alert("Invalid login")
            }
        })
    }

    return (
        <body className="yarn-login">
            <div className="yarn-login">
                <div className="auth-form">
                <form onSubmit={handleLogin}>
                    
                    
                    <h1 className="header">Welcome to Yarn Stash!</h1>
                    <h2>Please Sign in Here</h2>
                    <fieldset className="auth-fieldset">
                        <div>
                            <input
                            type="email"
                            value={email}
                            className="auth-form-input"
                            onChange={(evt)=>set(evt.target.value)}
                            placeholder="email address"
                            required
                            autoFocus />
                        </div>
                    </fieldset>
                    <fieldset className="auth-fieldset">
                        <div>
                            <button type="submit">Sign In</button>
                        </div>
                    </fieldset>
                </form>
                <section className="register-link">
             <Link to="/register">Not a member yet?</Link>
            </section>
            </div>
            </div>
            
            
      <div className="att">image by freepik</div>
        </body>
    )
}