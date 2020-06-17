import React from 'react';
import {useRouts} from "./routes";
import {BrowserRouter as Router} from 'react-router-dom'
import {Navigationbar} from "./components/Navigationbar"
import {Footer} from "./components/Footer"
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Spinner} from 'react-bootstrap'
import {AuthNavBar} from './components/AuthNavBar'


function App() {
    const {token,login,logout,userId,ready} = useAuth()
    const isAunthenticated = !!token
    const routes = useRouts(isAunthenticated)
    if (!ready)
    {
        return <Spinner></Spinner>
    }
  return (
    <AuthContext.Provider value={{token,login,logout,userId,isAunthenticated}}>
      <Router>
   <div>
      {isAunthenticated && <Navigationbar/>}
      {!isAunthenticated && <AuthNavBar/>}
       {routes}
       <Footer/>
   </div>
      </Router>
      </AuthContext.Provider>
  );
}

export default App;
