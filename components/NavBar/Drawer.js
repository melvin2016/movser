import Drawer from '@material-ui/core/Drawer';
import { ListItem, List ,ListItemText, withStyles} from '@material-ui/core';
import Link from 'next/link';
const styles = {
    list:{
        width:'250px'
    }
}
class DrawerInLeft extends React.Component{
    state={
        open:false
    }
    componentDidUpdate(prevProps){
        if(prevProps.open !== this.props.open){
            this.setState({
                open:this.props.open
            });
        }
    }
    componentDidMount(){
        this.setState({
            open:this.props.open
        })
    }

    render(){
        const {classes} = this.props;
        return(
            <Drawer open={this.state.open} onClose={this.props.onClose}>
                <div className={classes.list}>
                    <List>
                        {this.props.lists.map((listItem)=>(
                            <ListItem button key={listItem.text}>
                                <Link href={listItem.href}><ListItemText primary={listItem.text} /></Link>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>  
        );
    }
};

export default withStyles(styles)(DrawerInLeft);