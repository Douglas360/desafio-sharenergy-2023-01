import { useState } from "react";
import { useAuth } from "../context/useAuth";
import "../index.css"

export const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const { login } = useAuth()

    function handleSubmit(event) {
        event.preventDefault();
        // Validate the login credentials and send a request to the server
        const data = {
            username,
            password,
            rememberMe
        }


        login(data)
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Usuário</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />
                <label htmlFor="password">Senha</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                <label htmlFor="remember-me">
                    <input
                        type="checkbox"
                        id="remember-me"
                        name="remember-me"
                        checked={rememberMe}
                        onChange={(event) => setRememberMe(event.target.checked)}
                    />
                    Lembrar-me
                </label>
                <button type="submit">Entrar</button>
            </form>
            <p>
                Não tem uma conta? <a href="/signup">Cadastrar</a>
            </p>
        </div>
    )
}