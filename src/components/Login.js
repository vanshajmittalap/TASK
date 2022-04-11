import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Sign.css';


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            props.showAlert("LOGGED IN SUCCESSFULLY", "success")
            history.push("/");
        }
        else{
            props.showAlert("INVALID CREDENTIALS", "danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    let myStyle1 = {
        color:'rgb(240, 10, 71)',
        fontFamily: 'fantasy'
    }
    let myStyle2 = {
        color:'white',
        fontFamily: 'cursive'
    }

    return (
        <div className="con" style={{marginTop: '10%'}}>
        <div className="container mt-3" >
            <form  onSubmit={handleSubmit}>
            <h1 style={{color:'rgb(240, 10, 71)', fontFamily:'fantasy', marginLeft:'35%'}}>LOGIN TO CONTINUE</h1>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={myStyle2}>Email Address</label>
                    <input type="email" style={{backgroundColor: 'rgb(36 74 104)', color:'#fd7e14', fontFamily:'cursive'}} className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text" style={myStyle1}>We'll keep your details confidential.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" style={myStyle2}>Password</label>
                    <input type="password" style={{backgroundColor: 'rgb(36 74 104)', color:'#fd7e14', fontFamily:'cursive'}} className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary" style={{backgroundColor:'rgb(240, 10, 71)', marginLeft:'42%'}}>LOGIN</button>
                <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
            </form>
        </div>
        </div>
    )
}

export default Login
