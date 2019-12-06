import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import socketIOClient from "socket.io-client";
import {  Navbar,  NavbarBrand, Nav,NavItem,NavLink,Container} from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      response: [],
     
      endpoint: "https://52.22.174.76:80",


    }
  }
  componentDidMount() {
    this.state.response=[]
    const { endpoint } = this.state;
//      let HOST = location.origin.replace(/^http/, 'socket')
    const socket = socketIOClient(endpoint);

    socket.on("FromAPI", data => this.setState({
      response: this.state.response.concat(data)

    })

    );
    socket.on("mydata", data => this.setState({
      response: data
    }))



  }


  render() {
    // const classes = useStyles();
    var bparr = []
    var ecgarr =[]
    var heartarr=[]
    var temparr =[]
    console.log("response", this.state.response);
    this.state.response.map(({ bp,heartbeat,ecg,temp }) => {
       bparr.push(bp);
       heartarr.push(heartbeat);
       ecgarr.push(ecg);
       temparr.push(temp);
       

    })
    return(
      <div className="App">
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/"> PHMS
                    </NavbarBrand>


            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">
                  Home
                                </NavLink>

              </NavItem>
              <NavItem>
                <NavLink href="/">
                  About
                                </NavLink>

              </NavItem>
              <NavItem>
                <NavLink href="/">
                  Help
                                </NavLink>
              </NavItem>

            </Nav>


          </Container>

        </Navbar>
        <div >
          <Grid container spacing={3}>

            <Grid item xs={12} sm={6}>
              <Paper style={{ height: '200px' }}>
                <h6  >Your Body Temp is: {temparr[temparr.length - 1]} </h6>
              </Paper>

            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper style={{ height: '200px' }}>
               <h6  >Your Heart Beat is: {heartarr[heartarr.length - 1]} </h6>

              </Paper>

            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper  style={{ height: '200px'}}>
               <h6  >Your ElectroCardioGram(ECG) is:{ecgarr[ecgarr.length - 1]} </h6>

              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper style={{ height: '200px' }} >
               <h6  >Your Blood Pressure is: {bparr[bparr.length - 1]} </h6>
              
              </Paper>

            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default App;
