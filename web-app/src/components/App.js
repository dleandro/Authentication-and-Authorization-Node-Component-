import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SideBar from "./SideBar";
import UperBar from "./UperBar";
import AuthenticationProtocol from './AuthenticationProtocol'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import UserLogin from './UserLogin'
import Homepage from "./Homepage";
import { Redirect } from 'react-router-dom';
import './stylesheets/App.css';

const sidebarCollapsedSize = "75px";
const sidebarExtendedSize = "250px";

class App extends Component {

    state = { selectedProtocol: "", redirect:{should:false, link:"/"}};

    changeProtocol = inputProto => {
        this.setState({selectedProtocol: inputProto})
        console.log("protocol set")
    }
    setRedirect = (url) => {
        this.setState({
            redirect: {should:true,link:url}
        })
    }

    renderRedirect = () => {
        if (this.state.redirect.should) {
            return <Redirect to={this.state.redirect.link} />
        }
    }

    render() {
        return (
            <Router>
                <React.Fragment >
                    <SideBar navWidthCollapsed={sidebarCollapsedSize} navWidthExpanded={sidebarExtendedSize} />
                </React.Fragment>
                <React.Fragment >
                    <Switch id={"switch"}  >
                        <div id={"main"} style={ {marginLeft : sidebarCollapsedSize}}>
                            <UperBar setRedirect={this.setRedirect}/>
                            {this.renderRedirect()}
                            <Route path={'/'} exact component={Homepage} />
                            <Route path={'/login'} exact component={()=><UserLogin app={this.state} setRedirect={this.setRedirect}/>} />
                            <Route path={'/loginAdmin'} exact component={()=><AuthenticationProtocol selectedListener={this.changeProtocol}/>}/>
                            <Route path={'/backoffice'} exact/>
                        </div>
                    </Switch>
                </React.Fragment>

            </Router>

        );
    }
}

export default App;
