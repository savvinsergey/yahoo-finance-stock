import React from 'react';
import StockChart from './stock-chart.react';
import AddStock from './add-stock.react';

import StockStore from '../stores/stock-store';

export default class Main extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            stockCharts: []
        };

        this.onChangeName = this.onChangeName.bind(this);
    }

    componentWillMount(){
        StockStore.on('changeName',this.onChangeName);
    }

    onChangeName(){
        let key = this.state.stockCharts.length;
        let name = StockStore.getName();
        this.setState({
            stockCharts : [...this.state.stockCharts,<StockChart key={key} name={name}/>]
        });
    }

    render(){
        return (
            <div>
                <AddStock/>
                    <br/>
                {this.state.stockCharts}
            </div>
        ); 
    }
    
}