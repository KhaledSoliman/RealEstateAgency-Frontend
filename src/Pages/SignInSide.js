import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Copyright from '../Components/Copyright';
import PropTypes from 'prop-types';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import {Redirect} from "react-router-dom";

const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random?real,estate)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignInSide extends React.Component {
    state = {
        username: '',
        password: '',
    }

    constructor(props) {
        super(props);
    }

    updateInputVal(e) {
        let {name: fieldName, value} = e.target;

        this.setState({
            [fieldName]: value
        });
    }

    signin(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/auth/signin', {
            username:  this.state.username,
            password: this.state.password
        })
        .then(function (response) {
            NotificationManager.success('Logged In', 'Authentication', 2500);
            localStorage.setItem('isAuthenticated', 'true');
            this.forceUpdate();
        }.bind(this)).catch(function (error) {
            NotificationManager.error(error.response.data, 'Authentication', 2500);
        });
    }

    render() {
        const { classes } = this.props;
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        return (
            <Grid container component="main" className={classes.root}>
                {isAuthenticated === 'true' && (<Redirect to='/dashboard'/>) }
                <CssBaseline/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={this.state.username}
                                onChange={e => this.updateInputVal(e)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={e => this.updateInputVal(e)}
                            />
                            {/*<FormControlLabel*/}
                            {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                            {/*    label="Remember me"*/}
                            {/*/>*/}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={e => this.signin(e)}
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright/>
                            </Box>
                        </form>
                    </div>
                </Grid>
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            </Grid>
        );
    }

}

SignInSide.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignInSide);
