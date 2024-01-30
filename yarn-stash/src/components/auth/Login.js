import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserByEmail } from "../services/userService.js"

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
                        id: user.id
                    })
                )
                navigate("/")

            } else {
                window.alert("Invalid login")
            }
        })
    }

    return (
        <main className="auth-container">
            <section>
                <form className="auth-form" onSubmit={handleLogin}>
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
            </section>
        </main>
    )
}