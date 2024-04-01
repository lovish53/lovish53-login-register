
import { useState, useEffect, useContext} from "react";
import {useParams, useNavigate} from "react-router-dom";
import { Contextapi } from "./Contextapi";


function Update() {
  const[userName, setUserName]= useState('')
  const[email, setMail]= useState('')
  const[date, setDate]= useState('')
  const[password, setPassword]= useState('')
  const[message, setMessage]= useState('')
  const{id}=useParams()
  const navigate=useNavigate()
  const{loginname,setLoginname}=useContext(Contextapi)

  useEffect(()=>{
    fetch(`/singledata/${id}`).then((result)=>{return result.json()}).then((data)=>{
    //console.log(data)
      if(data.status===200){
        setUserName(data.apiData.UserName)
        setMail(data.apiData.Email)
        setPassword(data.apiData.Password)
        setDate(data.apiData.BirthDate.split('T')[0])
        setMessage(data.message)
      }else{
           setMessage(data.message)
      }
  })
   },[])

  function handleform(e){
    e.preventDefault()
    const data={userName,email,date,password}
   // console.log(data)
    fetch(`/updateform/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    }).then((result)=>{return result.json()}).then((data)=>{
        // console.log(data)
        if(data.status===200){
            setMessage(data.message)
            navigate('/details')
        }else{
             setMessage(data.message)
        }
    })
  }
  function handlelogout(e){
      
    localStorage.removeItem('loginname')
    setLoginname(localStorage.getItem('loginname'))
    navigate('/login')
  }
    return ( 
        <section className="updateform">
        {loginname?
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <form className="form-control" onSubmit={(e)=>{handleform(e)}}>
                            <h3>Update</h3>
                            <p style={{marginTop:"10px"}}>{loginname}</p>
                        <button className="btn btn-danger" onClick={(e)=>{handlelogout(e)}}>Logout</button>
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
                                readOnly
                                ></input>
                                <button type="submit" className="btn btn-primary mt-3 mb-2 register-btn">Update</button>          
                            </form>
                    </div>
                </div>
            </div>
            :
            navigate('/login')
            }
        </section>
     );
}

export default Update;