import React from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import getConfig from 'next/config';
if (typeof window !== 'undefined') {require('materialize-css') }
import SearchLists from '../components/SearchLists/SearchLists';
export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.state={
            query:null,
            tabs:{
                movieTab:[],
                tvTab:[],
                personTab:[],
                greatLength:''
            },
            page:'/search'
        }
        this.searchRef = React.createRef();
        this.ulRef = React.createRef();
    }
    
    componentDidMount(){
        /**focusing on input when page reloads */
        this.searchRef.current.focus();
        /**setting state from getInitialProps static fn. */
        this.setState({
            tabs:this.props.tabs
        });
        //Initialising Tabs for materialize
        M.Tabs.init(this.ulRef.current);
        //console loging
        console.log("ul",this.ulRef);
    }
    /**static promise fetchMulti() */
     static fetchMulti = async (query)=>{
        //Getting TMDB_KEY
        const TMDB_KEY = getConfig().publicRuntimeConfig.TMDB_KEY;
        const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${TMDB_KEY}&language=en-US&page=1&include_adult=true`);
        const jsonRes = await res.json();
        const tabs = {
            tvTab : [],
            movieTab : [], 
            personTab : []
        };
        jsonRes.results.map((list)=>{
            if(list.media_type === 'tv'){
                tabs.tvTab.push(list);
            }else if(list.media_type === 'movie'){
                tabs.movieTab.push(list);
            }else{
                tabs.personTab.push(list);
            }
        });
        return {tabs:tabs};
    }
    /**Returning props nextjs based function */
    static getInitialProps(context){
        console.log("heheh");
        return this.fetchMulti(context.query.name || 'Batman');
    }
    /**Search handler function */
    searchHandler = ()=>{
        if(this.state.query === null){
            M.toast({html:'Query Cannot be Blank!'});
            return;
        }
        Search.fetchMulti.call(this,this.state.query)
            .then(({tabs})=>{
                this.setState({
                    tabs:tabs
                });
                console.log(this.state.tabs);
            })
            .catch((err)=>{
                console.log(err);
            });
        
    }
    /**Input Catcher for query */
    inputHandler = (e)=>{
        if(e.keyCode === 13){
            this.searchHandler();
            return;
        }
        if(e.target.value === ''){
            this.setState({
                query:null
            });
        }else{
            this.setState({
                query:e.target.value
            });
        }
    }
   
    render(){
        return(
            <Layout page={this.state.page}>
                {/* Place Console log under This Comment */}
                    {console.log(this.state.tabs)}

                <div className="container">
                    <div className="row">
                        <div className="input-field col l9 m9 s12 ">
                            <input placeholder="eg :Batman" type="text" id="search" onKeyUp={this.inputHandler} ref={this.searchRef}/>
                            <label id="search">Search Movie / Series</label>
                        </div>
                        <div className="col l3 m3 s12" id="btnSubmit">
                            <button onClick={this.searchHandler} className="btn btn-small waves-effect waves-light searchBtn" type="submit">
                                Search
                                <i className="material-icons left">search</i>
                            </button>
                        </div>
                            <div className="row">
                                <div className="divider"/>
                                <div className="row">
                                    <ul className="tabs tabs-fixed-width" ref={this.ulRef} >
                                        <li className={`tab col s3 ${this.state.tabs.movieTab.length === 0?"disabled":""}`}>
                                            <a href="#movies">Movies</a>
                                        </li>
                                        <li className={`tab col s3 ${this.state.tabs.tvTab.length === 0?"disabled":""}`}>
                                            <a href="#tv">Series</a>
                                        </li> 
                                        <li className={`tab col s3 ${this.state.tabs.personTab.length === 0?"disabled":""}`}>
                                            <a href="#people">People</a>
                                        </li>
                                    </ul>
                                    
                                </div>
                                <div className="col s12 cards-container">
                                    <div  id="movies" className="col s12">
                                            <SearchLists lists={this.state.tabs.movieTab}/>
                                        </div>
                                        <div id="tv" className="col s12">
                                            <SearchLists lists={this.state.tabs.tvTab}/>
                                        </div>
                                        <div id="people" className="col s12">
                                            <SearchLists lists={this.state.tabs.personTab}/>
                                    </div>
                                    
                                </div>
                            </div>
                    </div>
                </div>
                <style jsx>{`
                    .searchBtn{
                        margin-top:20px;
                    }
                    .cards-container{
                        column-break-inside:avoid
                        
                    }
                    .cards-container .card{
                
                        display:inline-block;
                        overflow:visible
                    }
                    @media only screen and (max-width:600px){
                        .cards-container{
                            -webkit-column-count:1;
                            -moz-column-count:1;
                            column-count:1
                        }
                    }
                    @media only screen and (min-width:601px){
                        .cards-container{
                            -webkit-column-count:2;
                            -moz-column-count:2;
                            column-count:2
                        }
                    }
                    @media only screen and (min-width:993px){
                        .cards-container{
                            -webkit-column-count:3;
                            -moz-column-count:3;
                            column-count:3
                        }
                    }
                `}</style>
            </Layout>
        );
    }
}