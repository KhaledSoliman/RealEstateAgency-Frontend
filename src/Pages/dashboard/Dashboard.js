import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { mainListItems, secondaryListItems } from './listItems';
import Deposits from './Deposits';
import Orders from './Orders';
import {Redirect} from "react-router-dom";
import Copyright from "../../Components/Copyright";

const drawerWidth = 240;

const styles =(theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
});

 class Dashboard extends React.Component {

   state = {
     open: false,
     setOpen: false
   }

   constructor(props) {
     super(props);
   }

   signout(e) {
      localStorage.removeItem('isAuthenticated');
      this.forceUpdate();
   }

   handleDrawerOpen () {
      this.setState({
        open: true
      });
   }

   handleDrawerClose(){
     this.setState({
       open: false
     });
   }

   render() {
     const {classes} = this.props;
     const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
     const isAuthenticated = localStorage.getItem('isAuthenticated');
     return (
         <div className={classes.root}>
           {isAuthenticated !== 'true' && (<Redirect to='/signin'/>) }
           <CssBaseline />
           <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
             <Toolbar className={classes.toolbar}>
               <IconButton
                   edge="start"
                   color="inherit"
                   aria-label="open drawer"
                   onClick={e => this.handleDrawerOpen(e)}
                   className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
               >
                 <MenuIcon />
               </IconButton>
               <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                 Select Branch
               </Typography>
               <IconButton color="inherit" onClick={e => this.signout(e)}>
                   <ExitToApp />
               </IconButton>
             </Toolbar>
           </AppBar>
           <Drawer
               variant="permanent"
               classes={{
                 paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
               }}
               open={this.open}
           >
             <div className={classes.toolbarIcon}>
               <IconButton onClick={e => this.handleDrawerClose(e)}>
                 <ChevronLeftIcon />
               </IconButton>
             </div>
             <Divider />
             <List>{mainListItems}</List>
             <Divider />
             <List>{secondaryListItems}</List>
           </Drawer>
           <main className={classes.content}>
             <div className={classes.appBarSpacer} />
             <Container maxWidth="lg" className={classes.container}>
               <Grid container spacing={3}>
                 {/* Chart */}
                 <Grid item xs={12} md={8} lg={9}>
                   <Paper className={fixedHeightPaper}>
                   </Paper>
                 </Grid>
                 {/* Recent Deposits */}
                 <Grid item xs={12} md={4} lg={3}>
                   <Paper className={fixedHeightPaper}>
                     <Deposits />
                   </Paper>
                 </Grid>
                 {/* Recent Orders */}
                 <Grid item xs={12}>
                   <Paper className={classes.paper}>
                     <Orders />
                   </Paper>
                 </Grid>
               </Grid>
               <Box pt={4}>
                 <Copyright />
               </Box>
             </Container>
           </main>
         </div>
     );
   }
}



export default withStyles(styles)(Dashboard);
