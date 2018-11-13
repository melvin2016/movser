import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button  from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Hidden} from '@material-ui/core';
import DrawerRes from './DrawerRes';
import { withStyles} from '@material-ui/core';
import Link from 'next/link';
const styles = {
    ButtonStyle:{
        backgroundColor:'#25348c',
        padding:'5px',
        margin:'2px'
    },
    logo:{
        margin:'5px',
        cursor:'pointer'
    }
};

class Header extends React.Component{
     state={
         navbar:{
             open:false,
             lists:[{text:'Search',href:"/search"},{text:'Location',href:"/location"}]
         }
     }
     onClose=()=>{
        this.setState({
            navbar:{
                open:false,
                lists:[{text:'Search',href:"/search"},{text:'Location',href:"/location"}]
            }
        })
    }
     navbarMenuHandler=()=>{
         this.setState((prevState)=>{
             return{
                navbar:{
                    open:true,
                    lists:[{text:'Search',href:"/search"},{text:'Location',href:"/location"}]
                }
             }
         })
     }
    render(){
        const {classes} = this.props;
        return( 
            <AppBar>
                <ToolBar>
                    <Hidden mdUp>
                        <DrawerRes navbarMenuHandler={this.navbarMenuHandler} onClose={this.onClose} open={this.state.navbar.open} lists={this.state.navbar.lists}/>
                    </Hidden>
                    <Link href="/">
                        <Typography variant="h6" color="inherit" className={classes.logo}>
                            MOVSER
                        </Typography>
                    </Link>
                    <Hidden smDown>
                        <Grid container
                        direction="row"
                        justify="flex-end"
                        alignItems="flex-end"
                        >
                            {this.state.navbar.lists.map((list)=>(
                                <Link key={list.text} href={list.href}><Button className={classes.ButtonStyle} variant="contained" color="primary">{list.text}</Button></Link>
                            ))}
                        </Grid>
                    </Hidden>
                </ToolBar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);