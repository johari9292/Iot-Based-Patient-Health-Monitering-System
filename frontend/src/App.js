import React, { Component } from "react";
import Signin from './signin'
import Dashboard from './Dashboard'
class  App extends React.Component{
  constructor() {
    super();
    
  }


 render(){
   return(
     <div>
        
        <Dashboard/>
          
               
     </div>
   )
 }
}



export default App;