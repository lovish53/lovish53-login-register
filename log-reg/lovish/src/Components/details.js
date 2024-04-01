import {useState,useEffect, useContext} from "react"
import {Link, useNavigate} from "react-router-dom"
import { Contextapi } from "./Contextapi"
function Details() {
  const{loginname,setLoginname}=useContext(Contextapi)
     const[empdata,setEmpdata]=useState([])
     const[message,setMessage]=useState('')
     const navigate= useNavigate()
    useEffect(()=>{
    fetch(`/details`).then((result)=>{return result.json()}).then((data)=>{
    //console.log(data)
          if(data.status===200){
             setEmpdata(data.apiData)
             setMessage(data.message)
          }else{
             setMessage(data.message)
          }
    })
    },[])
    function handlelogout(e){
      
      localStorage.removeItem('loginname')
      setLoginname(localStorage.getItem('loginname'))
      navigate('/login')
    }
    return ( 
      <section id="details">
      {loginname?
        <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-5">
                          <div className="d-flex gap-2" style={{justifyContent:"center"}}>
                          <p style={{marginTop:"10px"}}>{loginname}</p>
                        <button className="btn btn-danger" onClick={(e)=>{handlelogout(e)}}>Logout</button>
                          </div>
                        {message}
                        <table className="table table-hover">
                        <thead>
                        <tr>
                          <th>S.no:</th>
                          <th>User Name:</th>
                          <th>Email:</th>
                          <th>Date of Birth</th>
                          <th>Update</th>
                        </tr>
                        </thead>
                        <tbody>
                        {empdata.map((result,key)=>(
                                <tr key={result._id}>
                                  <td>{key+1}</td>
                                  <td>{result.UserName}</td>
                                  <td>{result.Email}</td>
                                  <td>{result.BirthDate.split('T')[0]}</td>
                                  <td><Link to={`/update/${result._id}`}>Update</Link></td>
                                </tr>   
                        ))}
                        </tbody>
                        </table>
                    </div>
                </div>
              </div>
              : 
              navigate('/login')
              }
      </section>
     );
}

export default Details;