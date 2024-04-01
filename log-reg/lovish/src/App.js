import {useState} from "react"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './Components/reg';
import Login from './Components/login';
import Details from './Components/details';
import Update from './Components/Update'
import { Contextapi } from './Components/Contextapi';;

function App() {
  const[loginname,setLoginname]=useState(localStorage.getItem('loginname'))
  return ( 
    <Router>
     <Contextapi.Provider value={{loginname,setLoginname}}>
      <Routes>
        <Route path='/' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/details' element={<Details/>}></Route>
        <Route path="/update/:id" element={<Update/>}></Route>
      </Routes>
      </Contextapi.Provider>
    </Router>
   );
}

export default App;