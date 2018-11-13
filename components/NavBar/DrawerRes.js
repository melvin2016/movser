import dynamic from 'next/dynamic';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
const DrawerInLeftDYN = dynamic(()=>import('./Drawer'));
const styles={
    menuIcon:{
        color:'#fff'
    }
};
const DrawerRes = (props)=>{
    const {classes} = props;
    return(
        <>
            <IconButton onClick={props.navbarMenuHandler}>
                <MenuIcon className={classes.menuIcon} />
            </IconButton>
            <DrawerInLeftDYN onClose={props.onClose} open={props.open} lists={props.lists}/>
        </>
    );
}

export default withStyles(styles)(DrawerRes);