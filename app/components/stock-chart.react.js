import React from 'react';
import Highstock from 'react-highstock';

export default class StockChart extends React.Component {

    constructor(props){
        super(props);
        this.config = {
            rangeSelector: {
                selected: 1
            },

            title: {
                text: `${this.state.name} Stock`
            },

            series: [{
                name: this.state.name,
                data: this.state.data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        }
    }

    render(){
        return (
            <Highstock config = {config}></Highstock>
        )
    }

}