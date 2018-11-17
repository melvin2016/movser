import React from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import getConfig from 'next/config';

export default class extends React.Component{
    constructor(props){
        super(props);
        this.searchRef = React.createRef();
    }
    componentDidMount(){
        this.searchRef.current.focus();
    }
    static fetchMulti = async (query)=>{
        const TMDB_KEY = getConfig().publicRuntimeConfig.TMDB_KEY;
        const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${TMDB_KEY}&language=en-US&page=1&include_adult=true`);
        const jsonRes = await res.json();
        return {jsonRes:jsonRes};
    }
    static getInitialProps(context){
        return this.fetchMulti(context.query.name || 'Batman');
    }
    render(){
        return(
            <Layout>
                {/* Place Console log under This Comment */}
                    {console.log(this.props)}

                <div className="container">
                    <div className="row">
                        <div className="input-field col l9">
                            <input placeholder="eg :Batman" type="text" id="search" ref={this.searchRef}/>
                            <label id="search">Search Movie / Series</label>
                        </div>
                        <div className="col l3">
                            <button className="btn btn-small waves-effect waves-light searchBtn" type="submit">
                                Search
                                <i className="material-icons left">search</i>
                            </button>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .searchBtn{
                        margin-top:20px;
                    }
                `}</style>
            </Layout>
        );
    }
}