import React from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import getConfig from 'next/config';
if (typeof window !== 'undefined') {require('materialize-css') }
import SearchLists from '../components/SearchLists/SearchLists';
export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.searchRef = React.createRef();
        this.state={
            query:null,
            jsonRes:null
        }
    }
    componentDidMount(){
        /**focusing on input when page reloads */
        this.setState({
            jsonRes:this.props.jsonRes
        })
        this.searchRef.current.focus();
        
    }
    /**static promise fetchMulti() */
     static fetchMulti = async (query)=>{
        //Getting TMDB_KEY
        const TMDB_KEY = getConfig().publicRuntimeConfig.TMDB_KEY;
        const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${TMDB_KEY}&language=en-US&page=1&include_adult=true`);
        const jsonRes = await res.json();
        return {jsonRes:jsonRes};
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
            .then(({jsonRes})=>{
                this.setState({
                    jsonRes:jsonRes
                });
                console.log(this.state.jsonRes);
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
            <Layout>
                {/* Place Console log under This Comment */}
                    {console.log(this.state.jsonRes)}

                <div className="container">
                    <div className="row">
                        <div className="input-field col l9 m9 s12">
                            <input placeholder="eg :Batman" type="text" id="search" onKeyUp={this.inputHandler} ref={this.searchRef}/>
                            <label id="search">Search Movie / Series</label>
                        </div>
                        <div className="col l3 m3 s12">
                            <button onClick={this.searchHandler} className="btn btn-small waves-effect waves-light searchBtn" type="submit">
                                Search
                                <i className="material-icons left">search</i>
                            </button>
                        </div>
                        
                        {
                            this.state.jsonRes !== null?
                            <div className="row">
                                <div className="divider"/>
                                <div className="col s12 cards-container">
                                    <SearchLists lists={this.state.jsonRes.results}/>
                                </div>
                            </div>:
                            null
                        }
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