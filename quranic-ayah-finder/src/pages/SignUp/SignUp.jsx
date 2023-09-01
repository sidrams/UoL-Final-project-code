import { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { Context } from '../../Context';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function SignUp() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const csrftoken = Cookies.get('csrftoken');
    const { loggedUser, setLoggedUser } = useContext(Context)

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
                console.log("response json is "+json)
                setLoggedUser(json)
            })
            .catch(error => {console.log(error)})
        })
      
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
        {
            loggedUser ? 
            (
                <h2>User logged in</h2>
            ) 
            : 
            (
                // user registeration form
                <>
                <div className='lg:w-[50%] xl:w-[40%] lg:min-h-[70vh] xl:min-h-[60vh] h-fit m-auto mb-4 bg-custom-gray p-10 shadow-xl flex flex-col justify-between'>
                    <div className="flex justify-between items-center">
                        <div></div>
                        <h1 className="text-3xl text-sea-green font-bold mb-4">
                            Create Acount
                        </h1>
                        <Link to='/'><AiFillCloseCircle className="text-[1.5rem]"/></Link>
                    </div>

                    <form method="POST" action="" className="flex flex-col text-left tracking-wide justify-between">
                        <p className='flex flex-col items-center'>
                            <div className='flex flex-col items-center my-2 w-full'>
                                <label className='hidden' for="id_username">Username:</label>
                                <input type="text" name="username" className="bg-gray-200 shadow w-[70%] m-auto" placeholder='Username' value={form.username} onChange={handleChange} maxlength="150" autocapitalize="none" autocomplete="username" autofocus required id="id_username" />
                            </div>   
                            <span className="helptext w-2/3 text-center text-xs text-gray-400 font-medium">Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.</span>
                        </p>

                            
                        <p className="flex flex-col items-center my-2">
                            <div className='flex flex-col items-center my-2 w-full'>
                                <label className='hidden' for="id_password1">Password:</label>
                                <input type="password" name="password" className="bg-gray-200 shadow w-[70%] m-auto" placeholder="Password" value={form.password} onChange={handleChange} autocomplete="new-password" required id="id_password1" />
                            </div>

                            <span className="helptext w-2/3 text-center text-xs text-gray-400 font-medium">
                                <ul>
                                    <li>Your password must contain at least 8 alphanumeric characters and can’t be a commonly used password.</li>
                                </ul>
                            </span>
                        </p>
                    </form>
                    
                    <p  className="flex items-center m-auto my-2">
                        Already Signed Up? <Link to='/login' className='underline font-medium'>Login</Link>
                    </p>

                    <button type="button" value="Register" onClick={register} className='uppercase tracking-wider  bg-sea-green text-white w-1/3 m-auto my-4 rounded-full hover:opacity-90'>
                        Register
                    </button>

                </div>
                </>
            )
        }
        </>
    )
}