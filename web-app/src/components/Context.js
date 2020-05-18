import React, {Component} from 'react'

const UserContext = React.createContext()

class UserProvider extends Component {
    // Context state
    state = {
        selectedProtocol: "/",
        redirect: {should: false, link: "/"},
        user: {name: "", pass: ""},
        isLoggedIn: false,
        changeProtocol: (inputProto) => {
            this.setState({selectedProtocol: inputProto});
            console.log("protocol set")
        },
        setUser: (data) => this.setState(prevState => ({user: data}))
    };


    componentDidUpdate(prevProps, prevState) {
        if (prevState.user !== this.state.user) {
            console.log('user state has changed.')
            this.setState(prevState => ({isLoggedIn: !this.state.isLoggedIn}))
        }
    }

    render() {
        const {children} = this.props

        return (
            <UserContext.Provider value={this.state}>
                {children}
            </UserContext.Provider>
        )
    }
}

export default UserContext
export const UserConsumer = UserContext.Consumer
export {UserProvider}
