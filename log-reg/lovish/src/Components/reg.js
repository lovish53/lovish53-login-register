import {useState} from "react"
import {Link} from "react-router-dom"
function Register() {
    const[userName, setUserName]=useState('')
    const[email, setMail]=useState('')
    const[date, setDate]=useState('')
    const[password, setPassword]=useState('')
    const[message, setMessage]=useState('')

    function handleform(e){
        e.preventDefault()
        const data={userName,email,date,password}
       // console.log(data)
        fetch('/',{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(data)
        }).then((result)=>{return result.json()}).then((data)=>{
           // console.log(data)
            if(data.status===201){
                setMessage('Username Succefully Created')
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
                <Link style={{textDecoration:"none", color:"white"}} to="/login"><button className="btn btn-success login-btn">Login</button></Link>
                            <h3>Registration Page</h3>
                            <p style={{color:"red"}}>{message}</p>
                                <label>User Name</label>
                                <input type="text" className="form-control" required placeholder="UserName"
                                value={userName}
                                onChange={(e)=>{setUserName(e.target.value)}}
                                ></input>
                                <label>Email</label>
                                <input type="Email" className="form-control" required placeholder="Email"
                                value={email}
                                onChange={(e)=>{setMail(e.target.value)}}
                                ></input>
                                <label>Date of Birth</label>
                                <input type="date" className="form-control" required placeholder="Date of Birth"
                                value={date}
                                onChange={(e)=>{setDate(e.target.value)}}
                                ></input>
                                <label>Password</label>
                                <input type="password" className="form-control" required placeholder="Password"
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                                ></input>
                                <button type="submit" className="btn btn-primary mt-3 mb-2 register-btn">Register</button>          
                            </form>
                </div>
            </div>
        </div>
     </section>
    );
}

export default Register;