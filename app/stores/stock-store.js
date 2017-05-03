import moment from 'moment';

import AppDispatcher from "../dispatcher/app-dispatcher";
import {ActionTypes} from "../constants/stock-constants";
import {EventEmitter} from "events";

//------------- private ----------------//

let _stocks = {},
    _currentName = null,
    _currentDatatype = "none",
    _currentPeriod = "year";

function _parseFromYQL(action){
    ['Close','Low','High'].forEach(dataType => {
        _stocks[_currentName][_currentPeriod][_getDataType(dataType)] = action.data.map(item => {
            let timestamp = parseInt(moment(item.Date,"YYYY-MM-DD").format('x'),10);
            return [ timestamp, +item[dataType] ];
        }).sort(_sortDataByDate);
    });
}

function _parseFromChartAPI(action){
    ['close','low','high'].forEach(dataType => {
        _stocks[_currentName][_currentPeriod][_getDataType(dataType)] = action.data.map(item => {
            return [ item.Timestamp * 1000, +item[dataType] ];
        }).sort(_sortDataByDate);
    });
}

function _getDataType(dataType){
    dataType = dataType.toLowerCase();
    return dataType === "close" ? "none" : dataType;
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
                        _stocks[_currentName][_currentPeriod] = {};
                    }

                    if (!Object.keys(_stocks[_currentName][_currentPeriod]).length) {
                        if (_currentPeriod === "month" || _currentPeriod === "year") {
                            _parseFromYQL(action);
                        } else {
                            _parseFromChartAPI(action);
                        }
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
                case ActionTypes.RECEIVE_STOCK_DATATYPE:
                    ({ name:_currentName, datatype:_currentDatatype } = action.data);
                    this.emit("changeData");
                    break;
            }
        });
    }

    getData(name, period, datatype) {
        if (!_stocks[name]) {
             _stocks[name] = {};
        }

        if (!_stocks[name][period]) {
            _stocks[name][period] = {};
        }

        return _stocks[name][period][datatype];
    }

    getName() {
        return _currentName;
    }

    getPeriod() {
        return _currentPeriod;
    }

    getDatatype() {
        return _currentDatatype;
    }
}

export default new StockStore();