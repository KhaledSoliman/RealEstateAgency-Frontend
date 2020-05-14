import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../Components/Copyright";
import PropTypes from 'prop-types';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import {NotificationManager} from "react-notifications";

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignUp extends React.Component {
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        fname: '',
        lname: '',
    }

    updateInputVal(e) {
        let {name: fieldName, value} = e.target;

        this.setState({
            [fieldName]: value
        });
    }

    signup(e) {
        e.preventDefault();
        if(this.state.confirmPassword === this.state.password) {
            axios.post('http://localhost:3001/auth/signup', {
                username:  this.state.username,
                password: this.state.password,
                email: this.state.email,
                fname: this.state.fname,
                lname: this.state.lname,
            })
                .then(function (response) {
                    NotificationManager.success('Signed up successfully', 'Account Creation', 2500);
                })
                .catch(function (error) {
                    console.log(error);
                    NotificationManager.error(error.response.data, 'Account Creation', 2500);
                });
        } else {
            NotificationManager.error('Passwords do not match', 'Account Creation', 2500);
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        return (
            <Container component="main" maxWidth="xs">>
                {isAuthenticated === 'true' && (<Redirect to='/dashboard'/>) }
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="fname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="fname"
                                    label="First Name"
                                    autoFocus
                                    value={this.state.fname}
                                    onChange={e => this.updateInputVal(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lname"
                                    label="Last Name"
                                    name="lname"
                                    autoComplete="lname"
                                    value={this.state.lname}
                                    onChange={e => this.updateInputVal(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    value={this.state.username}
                                    onChange={e => this.updateInputVal(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    onChange={e => this.updateInputVal(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
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
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="current-password"
                                    value={this.state.confirmPassword}
                                    onChange={e => this.updateInputVal(e)}
                                />
                            </Grid>
                            {/*<Grid item xs={12}>*/}
                            {/*    <FormControlLabel*/}
                            {/*        control={<Checkbox value="allowExtraEmails" color="primary"/>}*/}
                            {/*        label="I want to receive inspiration, marketing promotions and updates via email."*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={e => this.signup(e)}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright/>
                </Box>
            </Container>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);