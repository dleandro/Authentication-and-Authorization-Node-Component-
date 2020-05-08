import React from 'react'
import { authenticationService} from '../service'


export default function Uperbar({setRedirect}) {

    return (
        <nav className="navbar navbar-dark bg-dark" id="NavBar" >

            <button type="button" id="sidebarCollapse" onClick={()=>authenticationService().logout(()=>setRedirect('/login'))} className="btn btn-info">
                <i className="fas fa-align-left"/>
                <span>LOGOUT</span>
            </button>
        </nav>
    )
}


