import React from 'react';
import Highstock from 'react-highstock';

export default class Stock extends React.Component {

    constructor(props){
        super(props);
        this.config = {

        }
    }

    render(){
        return (
            <Highstock config = {config}></Highstock>
        )
    }

}