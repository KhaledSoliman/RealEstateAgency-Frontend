import React from 'react';
import 'react-notifications/lib/notifications.css';
import {Route, BrowserRouter, Redirect} from 'react-router-dom';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {NotificationContainer} from 'react-notifications';

import SignIn from "./Pages/Signin";
import SignUp from "./Pages/Signup";
import SignInSide from "./Pages/SignInSide";
import Dashboard from "./Pages/dashboard/Dashboard";
import {red, pink} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        background: {
            paper: '#1a1a1a',
            default: "#0a0a0a"
        }
    },
});

class App extends React.Component {
    state = {
        authenticated: localStorage.getItem('isAuthenticated') === 'true'
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <NotificationContainer/>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <div className="App">
                        <Route path="/" exact component={SignInSide}/>
                        <Route path="/signin"  component={SignInSide}/>
                        <Route path="/signup" component={SignUp}/>
                        <Route path="/dashboard"  component={Dashboard}/>
                    </div>
                </BrowserRouter>
            </ThemeProvider>
            </div>
        );
    }
}


export default App;
