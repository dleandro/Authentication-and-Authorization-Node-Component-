import React from 'react'

export default function Uperbar({setRedirect}) {

    /* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
    function openNav() {
        const url = "http://localhost:8082/api/authentication/logout"
        console.log(`fetching ${url} ... `)
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        })
            .then(json=>console.log(json))
            .then(resp=>{setRedirect('/login')})
    }

    return (
        <nav className="navbar navbar-dark bg-dark" id="NavBar" >

            <button type="button" id="sidebarCollapse" onClick={openNav} className="btn btn-info">
                <i className="fas fa-align-left"/>
                <span>LOGOUT</span>
            </button>

            <div>
                <input className="form-control mr-sm-2" name="searchBar" id="searcher" type="search"
                       placeholder="Search" aria-label="Search"/>
            </div>
            <button className="btn btn-outline-primary my-2 my-sm-0 " id="searchbutton"> Search
            </button>

        </nav>
    )
}


