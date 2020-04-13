import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SideBar from "./html-elements-utils/SideBar";
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from "./routes";
import '../stylesheets/App.css';

const sidebarCollapsedSize = "75px";
const sidebarExtendedSize = "250px";

class App extends Component {

    state = { selectedProtocol: "/", redirect:{should:false, link:"/"}};

    changeProtocol = inputProto => {
        this.setState({selectedProtocol: inputProto})
        console.log("protocol set")
    }

    render() {
        return (
            <Router>
                    <SideBar navWidthCollapsed={sidebarCollapsedSize} navWidthExpanded={sidebarExtendedSize} />

                    <Routes sidebarCollapsedSize={sidebarCollapsedSize} changeProtocol={this.changeProtocol}> </Routes>

            </Router>

        );
    }
}

export default App;
