import './App.css';
import axios from 'axios';
import { useState,useEffect,useCallback } from 'react';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Navbar from './containers/navbar/Navbar';
import Home from './containers/Home/Home';
import Footer from './containers/Footer/Footer';
import Login from './containers/Login/Login';
import Prediction from './containers/Prediction/Prediction';
import News from './containers/News/News';
import Watchlist from './containers/Watchlist/watchlist';
import {UserContext} from "./context/userContext"
import Stock from './containers/Stock/Stock';
import Compare from './containers/Compare/Compare';
import Register from './containers/Register/Register';


function App() {
  const [user,setUser] = useState()
  const loadUser = useCallback(()=>{
	axios.get("http://localhost:8000/users/login",{withCredentials:true})
	.then(({data})=>{
		console.log(data)
		setUser(data.user)
	})
  .catch(err=>console.error(err))
  },[])
  useEffect(()=>{
	loadUser()
  },[loadUser])
  return (
    <UserContext.Provider value={{user,setUser}}>
		<Router>
      	<Navbar />
      	<Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/predictions' element={<Prediction />}/>
          <Route exact path='/news' element={<News />}/>
          <Route exact path='/watchlist' element={<Watchlist />}/>
          <Route exact path="/stocks/:ticker" element={<Stock />}/>
          <Route path='/compare' element={<Compare />} />
      	</Routes>
      	<Footer />
    	</Router>
	</UserContext.Provider>
  );
}

export default App;
