import {useState, useContext} from "react"
import {Link, useNavigate} from "react-router-dom"
import { Contextapi } from "./Contextapi"
function Login() {
    const{setLoginname} =useContext(Contextapi)
    const[userName, setUserName]=useState('')
    const[password,setPassword]=useState('')
    const[message,setMessage]=useState('')
   const navigate=useNavigate()
    function handleform(e){
        e.preventDefault()
        const data={userName, password}
        fetch('/login',{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(data)
        }).then((result)=>{return result.json()}).then((data)=>{
          //  console.log(data)
            if(data.status===200){
                setMessage(data.message)
                localStorage.setItem('loginname',data.apiData.Email)
             setLoginname(localStorage.getItem('loginname'))
                navigate('/details')
            }else{
                setMessage(data.message)
            }
        })
    }
    return ( 
        <section className="register">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                <form className="form-control" onSubmit={(e)=>{handleform(e)}}>
                <Link style={{textDecoration:"none", color:"white"}} to="/"><button className="btn btn-success login-btn">Register</button></Link>
                            <h3>Login Page</h3>
                            <p style={{color:"red"}}>{message}</p>
                            <span><i className="bi bi-person-circle profile-logo"></i></span>
                                <label>Email</label>
                                <input type="email" className="form-control" required placeholder="UserName"
                                value={userName}
                                onChange={(e)=>{setUserName(e.target.value)}}
                                ></input>
                                <label>Password</label>
                                <input type="password" className="form-control" required placeholder="Password"
                                 value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                                ></input>
                                <button type="submit" className="btn btn-primary mt-3 mb-2 register-btn">Login</button>
                            </form>
                </div>
            </div>
        </div>
     </section>
     );
}

export default Login;