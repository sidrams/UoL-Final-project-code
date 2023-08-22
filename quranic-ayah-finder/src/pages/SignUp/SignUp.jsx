import { useState } from 'react'
import Cookies from 'js-cookie';

export default function SignUp() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const csrftoken = Cookies.get('csrftoken');

    const login = () => {
        // let data = new FormData();
        // data.append('username', form.username)
        // data.append('password', form.password)
        // data.append('fileName', file.name);
        // // add form input from hidden input elsewhere on the page
        // data.append('csrfmiddlewaretoken', $('#csrf-helper input[name="csrfmiddlewaretoken"]').attr('value'));
        // fetch("/upload/", {
        //     method: 'POST',
        //     body: data,
        //     credentials: 'same-origin',
        // })
        // console.log(form)
        fetch(`http://127.0.0.1:8000/login`, {
            // method: "POST",
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json; charset=UTF-8',
            //     'X-CSRFToken': get_token
            // },
            // credentials: 'include',
            method: 'POST',
            // mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            credentials: 'include',
            // true,
            body: 
            JSON.stringify(form),
            // {
            //     username : form.username,
            //     password : form.password
            // }
            // JSON.stringify(form),
            // data
            // 
            // method: 'POST',
            // body: data,
            // credentials: 'same-origin',
        })
        .then((response) => response.json())
        .then((json) =>{
            console.log(json)
            // redirect('/success')
            if (json == 'User Logged in') setSuccess(true)
        })
        .catch(error => console.log(error))
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
        // console.log(form)
    }

    return (
        <>
        <h1>SignUp</h1>
        <div>
            <form method="POST" action="">
                <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
                
                <label>Username:</label>
                <input type="text" value={form.username} onChange={handleChange} name="username" placeholder="Enter Username..." />

                <label>Password::</label>
                <input type="password" value={form.password} onChange={handleChange} name="password" placeholder="Enter Password..." />

                <input type="button" value="Login" onClick={login} />
            </form>
        </div>
        </>
    )
}