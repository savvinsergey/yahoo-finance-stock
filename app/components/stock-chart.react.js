import React from 'react';
import Highstock from 'highstock-release';

import StockAPI from '../api/stock-api';
import StockActions from "../actions/stock-actions";
import StockStore from '../stores/stock-store';

export default class StockChart extends React.Component {

    constructor(props){
        super(props);
        let period = StockStore.getPeriod();

        this.state = {
            period : period,
            data   : StockStore.getData(this.props.name,period)
        };

        this.onChangeData = this.onChangeData.bind(this);
    }

    componentWillMount(){
        StockAPI.fetchData[StockStore.getPeriod()](this.props.name);
        StockStore.on('changeData',() => {
            if (StockStore.getName() === this.props.name) {
                this.onChangeData();
            }
        });
        StockStore.on('changePeriod',() => {
            if (StockStore.getName() === this.props.name) {
                StockAPI.fetchData[StockStore.getPeriod()](this.props.name);
            }
        });
    }

    renderChart(){
        this.chart = new Highstock.stockChart({

            chart: {
                renderTo: this.refs.chart,
                borderColor: '#C0C0C0',
                borderWidth: 1,
                borderRadius: 0
            },

            navigation: {
                buttonOptions: {
                    enabled: false
                }
            },

            rangeSelector: {
                enabled: false
            },

            title: {
                text: `${this.props.name} Stocks`
            },

            series: [{
                name: this.props.name,
                data: this.state.data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
            
        });
    }

    changePeriod(period){
        StockActions.receiveStockPeriod(this.props.name,period)
    }

    onChangeData(){
        let period = StockStore.getPeriod();
        let data   = StockStore.getData(this.props.name,period);

        this.setState({ data, period },() => this.renderChart());
    }

    render(){
        return (
            <div>
                <div className="btn-group">
                    <button type="button"
                            className={"btn " + ( this.state.period === "day"   ? "btn-primary" : "btn-default")}
                            onClick={() => this.changePeriod("day")}> Day </button>
                    <button type="button"
                            className={"btn " + ( this.state.period === "month" ? "btn-primary" : "btn-default")}
                            onClick={() => this.changePeriod("month")}> Month </button>
                    <button type="button"
                            className={"btn " + ( this.state.period === "year"  ? "btn-primary" : "btn-default")}
                            onClick={() => this.changePeriod("year")}> Year </button>
                </div>
                    <br/><br/>
                <div className="chart " ref="chart"></div>
                    <br/>
            </div>
        )
    }

}