import { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { Context } from '../../Context';

export default function SignUp() {
    const [form, setForm] = useState({
        username: '',
        password: ''
        // ,
        // password2: ''
    })
    const csrftoken = Cookies.get('csrftoken');
    const { loggedUser, setLoggedUser } = useContext(Context)

    // useEffect(() => {
    //     fetch('http://127.0.0.1:8000/register', {
    //         method: 'GET',
    //         })
    //         .then((response) => response.text())
    //         // .then((response) => console.text(response))
    //         .then((text) =>{
    //             setForm(text)
    //             console.log(text)
    //         })
    //         .catch(error => console.log(error))
    // }, [])

    const register = () => {
        fetch(`http://127.0.0.1:8000/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            credentials: 'include',
            body: JSON.stringify(form),
        })
        .then((response) => {
            // response.json()
            fetch(`http://127.0.0.1:8000/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                credentials: 'include',
                body:  
                //  JSON.stringify({
                //     username: form.username,
                //     password: form.password1
                // })
                JSON.stringify(form),
            })  
            .then((response) => response.json())
            .then((json) =>{
                console.log("response json is "+json)
                setLoggedUser(json)
            })
            .catch(error => {console.log(error)})
        })
      
        // .then((response) => response.json()
        // // {
        // //     console.log(response.json)
        //     // setLoggedUser(response)
        // // }
        // )
        // .then((response) =>{
        //     console.log("response is : "+JSON.stringify(response))
        //     setLoggedUser(response)
        //     console.log("logged user is "+loggedUser)
        // })
        .catch(error => {console.log(error)})
        // console.log(form)
    }

    // const logout = () => {
    //     fetch(`http://127.0.0.1:8000/logout`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'X-CSRFToken': csrftoken,
    //         },
    //         credentials: 'include',
    //         // body: 
    //         // JSON.stringify(form),
    //     })
    //     .then((response) => setLoggedUser(null))
    //     // .then((response) =>{
    //     //     console.log(json)
    //     //     setLoggedUser(null)
    //     // })
    //     .catch(error => {console.log(error)})
    // }

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
                {/* <button onClick={logout}>logout</button> */}
                </>
            ) 
            : 
            (
                <>
                {/* <div dangerouslySetInnerHTML={{__html:form}} ></div>  */}

                <div>
                    <form method="POST" action="">
                        <p>
                        <label for="id_username">Username:</label>
                        <input type="text" name="username" value={form.username} onChange={handleChange} maxlength="150" autocapitalize="none" autocomplete="username" autofocus required id="id_username" />
                                
                        <span class="helptext">Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.</span>
                        </p>

                            
                        <p>
                            <label for="id_password1">Password:</label>
                            <input type="password" name="password" value={form.password} onChange={handleChange} autocomplete="new-password" required id="id_password1" />
                            
                            <span class="helptext"><ul><li>Your password can’t be too similar to your other personal information.</li><li>Your password must contain at least 8 characters.</li><li>Your password can’t be a commonly used password.</li><li>Your password can’t be entirely numeric.</li></ul></span>
                        </p>

                            
                        {/* <p>
                            <label for="id_password2">Password confirmation:</label>
                            <input type="password" name="password2" value={form.password2} onChange={handleChange} autocomplete="new-password" required id="id_password2" />
                            
                            <span class="helptext">Enter the same password as before, for verification.</span>
                        </p> */}

                         <input type="button" value="Register" onClick={register} />
                    </form>
                    
                    Already Signed Up? <Link to='/login'>Login</Link>
                </div>
                </>
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