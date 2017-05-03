import React from 'react';
import StockActions from "../actions/stock-actions";

export default class AddStock extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            inputValue: ""
        };

        this.handleClick = this.handleClick.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    updateInput(evt){
        this.setState({
            inputValue: evt.target.value
        });
    }

    handleClick(){
        StockActions.receiveStockName(this.state.inputValue);
    }

    render(){
        return (
            <div className="row">
                <br/>
                <div className="col-md-10">
                    <input type="text" placeholder="Stock code. For example AAPL, GOOGL and etc." name="stock-name" className="form-control input-lg"
                           value={this.state.inputValue}
                           onChange={this.updateInput}/>
                </div>
                <div className="col-md-2 text-right">
                    <button className="btn btn-primary btn-lg" type="button"
                            onClick={this.handleClick}>Add stock chart</button>
                </div>
            </div>
        );
    }

}