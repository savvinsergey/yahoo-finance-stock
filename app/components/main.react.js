import React from 'react';
import StockChart from './stock-chart.react';
import AddStock from './add-stock.react';

export default class Main extends React.Component {

    render(){
        return (
            <div>
                <StockChart/>
                <AddStock/>
            </div>
        ); 
    }
    
}