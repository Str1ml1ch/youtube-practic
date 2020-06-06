import React from 'react';
import {useRouts} from "./routes";
import {BrowserRouter as Router} from 'react-router-dom'
import {Navigationbar} from "./components/Navigationbar"
import {Footer} from "./components/Footer"

function App() {
    const routes = useRouts(false)
  return (
      <Router>
   <div>
       <Navigationbar/>
       {routes}
       <Footer/>
   </div>
      </Router>
  );
}

export default App;
