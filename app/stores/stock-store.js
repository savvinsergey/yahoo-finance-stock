import moment from 'moment';

import AppDispatcher from "../dispatcher/app-dispatcher";
import {ActionTypes} from "../constants/stock-constants";
import {EventEmitter} from "events";

//------------- private ----------------//

let _stocks = {},
    _currentName = null,
    _currentPeriod = "year";

function _parseFromYQL(action){
    _stocks[_currentName][_currentPeriod] = action.data.map(item => {
        let timestamp = parseInt(moment(item.Date,"YYYY-MM-DD").format('x'),10);
        return [ timestamp, +item.Close ];
    });
}

function _parseFromChartAPI(action){
    _stocks[_currentName][_currentPeriod] = action.data.map(item => {
        return [ item.Timestamp * 1000, +item.close ];
    });
}

function _sortDataByDate(a,b){
    if (a[0] < b[0]) {
        return -1;
    }
    if (a[0] > b[0]) {
        return 1;
    }
    return 0;
}

//------------- public ----------------//

class StockStore extends EventEmitter{
    constructor(props){
        super(props);

        AppDispatcher.register(action => {
            switch(action.actionType){
                case ActionTypes.RECEIVE_STOCK_DATA:
                    if (!_stocks[_currentName]) {
                         _stocks[_currentName] = {};
                    }

                    if (!_stocks[_currentName][_currentPeriod]) {

                        if (_currentPeriod === "month" || _currentPeriod === "year") {
                            _parseFromYQL(action);
                        } else {
                            _parseFromChartAPI(action);
                        }

                        _stocks[_currentName][_currentPeriod] = _stocks[_currentName][_currentPeriod]
                            .sort(_sortDataByDate);
                    }

                    this.emit("changeData");
                    break;
                case ActionTypes.RECEIVE_STOCK_NAME:
                    _currentName = action.name;
                    this.emit("changeName");
                    break;
                case ActionTypes.RECEIVE_STOCK_PERIOD:
                    ({ name:_currentName, period:_currentPeriod } = action.data);
                    this.emit("changePeriod");
                    break;
            }
        });
    }

    getData(name,period){
        if (!_stocks[name]) {
             _stocks[name] = {};
        }

        return _stocks[name][period];
    }

    getName(){
        return _currentName;
    }

    getPeriod(){
        return _currentPeriod;
    }
}

export default new StockStore();