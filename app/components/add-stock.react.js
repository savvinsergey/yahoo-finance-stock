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
            <div>
                <input type="text" placeholder="Stock code" name="stock-name"
                       value={this.state.inputValue}
                       onChange={this.updateInput}/>
                <button className="btn btn-default"
                        onClick={this.handleClick}>Add stock</button>
            </div>
        );
    }

}