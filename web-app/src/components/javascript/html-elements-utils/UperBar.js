import React from 'react'
import { authenticationService} from '../service'


export default function Uperbar({setRedirect}) {

    return (
        <nav className="navbar navbar-dark bg-dark" id="NavBar" >

            <button type="button" id="sidebarCollapse" onClick={()=>authenticationService().logout(()=>setRedirect('/login'))} className="btn btn-info">
                <i className="fas fa-align-left"/>
                <span>LOGOUT</span>
            </button>

            <div>
                <input className="form-control mr-sm-2" name="searchBar" id="searcher" type="search" placeholder="Search" aria-label="Search"/>
            </div>
            <button className="btn btn-outline-primary my-2 my-sm-0 " id="searchbutton"> Search</button>

        </nav>
    )
}


