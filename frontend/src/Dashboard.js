import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import socketIOClient from "socket.io-client";


import Graph from './ecggraph'

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      response: [],
     
      endpoint: "https://iotphms.herokuapp.com",


    }
  }
  componentDidMount() {
    const { endpoint } = this.state;

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
       
{/*          
                <h6  > Body Temp : {temparr[temparr.length - 1]} </h6>
           
               <h6  > Heart Beat : {heartarr[heartarr.length - 1]} </h6>

            
               <h6  > ElectroCardioGram(ECG) : {ecgarr[ecgarr.length - 1]} </h6>

              
               <h6  > Blood Pressure : {bparr[bparr.length - 1]} </h6> */}

<div id="wrapper">
        {/* Sidebar */}
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
          {/* Sidebar - Brand */}
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa fa-user-md" />
            </div>
            <div className="sidebar-brand-text mx-3">PHMS <sup /></div>
          </a>
          {/* Divider */}
          <hr className="sidebar-divider my-0" />
          {/* Nav Item - Dashboard */}
          <li className="nav-item active">
            <a className="nav-link" href="index.html">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Dashboard</span></a>
          </li>
          {/* Divider */}
          <hr className="sidebar-divider" />
          {/* Heading */}
          <hr className="sidebar-divider" />
          {/* Heading */}
          <div className="sidebar-heading">
          </div>
          {/* Nav Item - Pages Collapse Menu */}
          {/* Nav Item - Charts */}
          {/* Divider */}
          <hr className="sidebar-divider d-none d-md-block" />
          {/* Sidebar Toggler (Sidebar) */}
          <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle" />
          </div>
        </ul>
        {/* End of Sidebar */}
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              {/* Sidebar Toggle (Topbar) */}
              <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars" />
              </button>
              {/* Topbar Search */}
              {/* Topbar Navbar */}
            </nav>
            {/* End of Topbar */}
            {/* Begin Page Content */}
            <div className="container-fluid">
              {/* Page Heading */}
              {/* Content Row */}
              <div className="row">
                {/* Earnings (Monthly) Card Example */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Temperature Celcius</div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800"> {temparr[temparr.length - 1]} </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa fa-thermometer fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Earnings (Monthly) Card Example */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Heart Beat</div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800"> {heartarr[heartarr.length - 1]} </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa fa-heartbeat fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Earnings (Monthly) Card Example */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-info shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">ECG</div>
                          <div className="row no-gutters align-items-center">
                            <div className="col-auto">
                              <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800"> {ecgarr[ecgarr.length - 1]}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-heartbeat fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Pending Requests Card Example */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Blood Pressure</div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800"> <h3> {bparr[bparr.length - 1]} </h3></div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa fa-stethoscope fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Content Row */}
              <div className="row">
                {/* Area Chart */}
                <div className="col-xl-8 col-lg-7">
                  <div className="card shadow mb-4">
                    {/* Card Header - Dropdown */}
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">ECG Chart</h6>
                      {/* <div class="dropdown no-arrow">
                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                      <div class="dropdown-header">Dropdown Header:</div>
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div> */}
                    </div>
                    {/* Card Body */}
                    <div className="card-body">
                      <div className="chart-area">
                       <Graph/>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Pie Chart */}
              </div>
              {/* /.container-fluid */}
            </div>
            {/* End of Main Content */}
            {/* Footer */}
            {/* End of Footer */}
          </div>
          {/* End of Content Wrapper */}
        </div>
        {/* End of Page Wrapper */}
        {/* Scroll to Top Button*/}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
        {/* Logout Modal*/}
        <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                <a className="btn btn-primary" href="login.html">Logout</a>
              </div>
            </div>
          </div>
        </div>
        
      </div>
              
            
          
      </div>
    )
  }
}

export default App;