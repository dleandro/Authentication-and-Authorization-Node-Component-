import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SideBar from "./html-elements-utils/SideBar";
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from "./routes";
import '../stylesheets/App.css';
import { UserProvider } from '../Context'
import Upperbar from './html-elements-utils/UpperBar';

//available icons https://www.w3schools.com/icons/fontawesome_icons_webapp.asp

const sidebarCollapsedSize = "75px";

class App extends Component {

    render() {
        return (
            <Router>
                <UserProvider>
                    <Upperbar />
                    
                    <div id={"main"} style={{ marginLeft: sidebarCollapsedSize }}>
                        <Routes changeProtocol={this.changeProtocol}> </Routes>
                    </div>
                    <SideBar navWidthCollapsed={sidebarCollapsedSize} />
                </UserProvider>
            </Router>

        );
    }
}

export default App;
