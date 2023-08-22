import { useState } from 'react'
import Cookies from 'js-cookie';

export default function SignUp() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const csrftoken = Cookies.get('csrftoken');
    const [loggedUser, setLoggedUser] = useState()

    const login = () => {
        fetch(`http://127.0.0.1:8000/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            credentials: 'include',
            body: 
            JSON.stringify(form),
        })
        .then((response) => response.json())
        .then((json) =>{
            console.log(json)
            setLoggedUser(json)
        })
        .catch(error => {console.log(error)})
    }

    const logout = () => {
        fetch(`http://127.0.0.1:8000/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            credentials: 'include',
            // body: 
            // JSON.stringify(form),
        })
        .then((response) => setLoggedUser(null))
        // .then((response) =>{
        //     console.log(json)
        //     setLoggedUser(null)
        // })
        .catch(error => {console.log(error)})
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    return (
        <>
        <h1>SignUp</h1>
        {
            loggedUser ? 
            (
                <>
                <h2>USer logged in</h2>
                <button onClick={logout}>logout</button>
                </>
            ) 
            : 
            (
                <div>
                    <form method="POST" action="">
                        {/* <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} /> */}
                        
                        <label>Username:</label>
                        <input type="text" value={form.username} onChange={handleChange} name="username" placeholder="Enter Username..." />

                        <label>Password::</label>
                        <input type="password" value={form.password} onChange={handleChange} name="password" placeholder="Enter Password..." />

                        <input type="button" value="Login" onClick={login} />
                    </form>
                </div>
            )
        }
        {/* <div>
            <form method="POST" action="">
                {/* <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} /> 
                
                <label>Username:</label>
                <input type="text" value={form.username} onChange={handleChange} name="username" placeholder="Enter Username..." />

                <label>Password::</label>
                <input type="password" value={form.password} onChange={handleChange} name="password" placeholder="Enter Password..." />

                <input type="button" value="Login" onClick={login} />
            </form>
        </div> */}
        </>
    )
}