import { useContext, useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { Context } from "../../Context";
import { AiFillCloseCircle } from 'react-icons/ai';
import { Toast } from 'primereact/toast';

export default function Login() {
    const { loggedUser, setLoggedUser } = useContext(Context);
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const csrftoken = Cookies.get('csrftoken');
    
    // show any errors in file handling
    const toastCenter = useRef(null); 
    const showMessage = (event, ref, severity) => {
        const label = event
        console.log('in show message '+label)
        ref.current.show({ severity: severity, summary: "Error", detail: label, life: 3000 });
    };
    // make login request
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
        // .catch(error => {console.log(error)})
        .then((response) => {
            fetch('http://127.0.0.1:8000/user', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            credentials: 'include',
            })
            .then((response) => {response.json()})
            .then((json) =>{
                json.user ? 
                setLoggedUser(json.user) :
                console.log(json)
            })
            .catch(error => console.log(error.json()))
        })
        

        .catch(error => {
            showMessage('Incorrect username or password', toastCenter, 'error');
        })

    }

    // make logout request
    const logout = () => {
        fetch(`http://127.0.0.1:8000/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            credentials: 'include',
        })
        .then((response) => setLoggedUser(null))
        .catch(error => {console.log(error)})
    }

    // handle form changes
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    return (
        <>
        {
            loggedUser ? 
            (
                <>
                <h2>User logged in</h2>
                <button onClick={logout}>Logout</button>
                </>
            ) 
            : 
            (   // user login form 
                <div className='lg:w-[50%] xl:w-[40%] lg:min-h-[70vh] xl:min-h-[60vh] m-auto mb-4 bg-custom-gray p-6 shadow-xl flex flex-col justify-evenly'>
                    <Toast ref={toastCenter} />
                    
                    <div className="flex justify-between items-center">
                        <div></div>
                        <h1 className="text-3xl text-sea-green font-bold">
                            Login
                        </h1>
                        <Link to='/'><AiFillCloseCircle className="text-[1.5rem]"/></Link>
                    </div>
                    
                    <form method="POST" action="" className="flex flex-col text-left tracking-wide justify-between">
                        {/* <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} /> */}
                        
                        <p className="flex items-center my-2">
                            <label for="username" className='hidden'>Username:</label>
                            <input type="text" className="bg-gray-200 shadow w-[70%] m-auto" placeholder="Username" value={form.username} onChange={handleChange} name="username" id="username" />
                        </p>
                        <p className="flex items-center my-2">
                            <label for="password" className='hidden'>Password:</label>
                            <input type="password" className="bg-gray-200 shadow w-[70%] m-auto" placeholder="Password" value={form.password} onChange={handleChange} name="password" id="password"/>
                        </p>
                       

                    </form> 
                    
                    {/* registeration link  */}
                    <p  className="flex items-center m-auto my-2">
                        Not a user yet? Click here to <span> <Link to='/signup' className='underline font-medium'> Register</Link></span>
                    </p>
                    
                    <button type="button" value="Login" onClick={login} className='uppercase tracking-wider  bg-sea-green text-white w-1/3 m-auto my-4 rounded-full hover:opacity-90'>Login</button>
                </div>
            )
        }
        </>
    )
}