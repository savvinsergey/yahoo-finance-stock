import React from 'react';
import Highstock from 'highstock-release';

import StockAPI from '../api/stock-api';
import StockActions from "../actions/stock-actions";
import StockStore from '../stores/stock-store';

function _getColor(dataType){
    switch(dataType){
        case "none":
            return "#286090";
        case "low":
            return "#BF0B23";
        case "high":
            return "#1ABF0B";
    }
}

export default class StockChart extends React.Component {

    constructor(props){
        super(props);
        let period = StockStore.getPeriod();
        let datatype = StockStore.getDatatype();

        this.state = {
            period : period,
            datatype : datatype,
            data   : StockStore.getData(this.props.name, period, datatype)
        };

        this.changePeriod = this.changePeriod.bind(this);
        this.changeDataType = this.changeDataType.bind(this);
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
                color: _getColor(this.state.datatype),
                tooltip: {
                    valueDecimals: 2
                }
            }]
            
        });
    }

    changePeriod(period){
        StockActions.receiveStockPeriod(this.props.name, period);
    }

    changeDataType(e){
        StockActions.receiveStockDataType(this.props.name, e.target.value);
    }

    onChangeData(){
        let period = StockStore.getPeriod();
        let datatype = StockStore.getDatatype();
        let data   = StockStore.getData(this.props.name, period, datatype);

        this.setState({ data, period, datatype },() => this.renderChart());
    }

    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-md-10">
                        <label className="center-block">Period: </label>
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
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Type of values: </label>
                            <select className="form-control" onChange={this.changeDataType}>
                                <option value="none">none</option>
                                <option value="low">low</option>
                                <option value="high">high</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="chart " ref="chart"></div>
                    <br/><br/>
            </div>
        )
    }

}