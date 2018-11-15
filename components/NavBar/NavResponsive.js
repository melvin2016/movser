import Link from 'next/link';
if (typeof window !== 'undefined') {require('materialize-css') }
class NavResponsive extends React.Component{
    constructor(props){
        super(props);
        this.navRef = React.createRef();
    }
    componentDidMount(){
           M.Sidenav.init(this.navRef.current);
    }
    render(){
        return(
            <>
                <div className="navbar-fixed">
                    <nav className="nav-wrapper teal lighten-2">
                        <Link href="/"><a className="brand-logo">MOVSER</a></Link>
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down"> 
                            {
                                this.props.lists.map((list)=>(
                                    <Link key={list.href} href={list.href}><li><a>{list.name}</a></li></Link>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
                <ul className="sidenav" ref={this.navRef} id="mobile-demo">
                {
                    this.props.lists.map((list)=>(
                        <Link key={list.href} href={list.href}><li><a>{list.name}</a></li></Link>
                    ))
                }
                </ul>
            </>
        );
    }
}

export default NavResponsive;