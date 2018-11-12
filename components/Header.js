import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button  from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles, IconButton } from '@material-ui/core';
import Link from 'next/link';

const styles = {
    ButtonStyle:{
        backgroundColor:'#e1c2b4'
    }
};

const Header = (props)=>{
    const {classes} = props;
    return( 
        <AppBar>
            <ToolBar>
                <IconButton>
                    <MenuIcon/>
                </IconButton>
                <Link href="/search"><Button className={classes.ButtonStyle} variant="contained">Search</Button></Link>
            </ToolBar>
        </AppBar>
    )
};
export default withStyles(styles)(Header);