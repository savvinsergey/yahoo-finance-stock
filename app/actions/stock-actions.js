import AppDispatcher from "../dispatcher/app-dispatcher";
import {ActionTypes} from "../constants/stock-constants";

export default {
    receiveStockData(data) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.RECEIVE_STOCK_DATA,
            data
        })
    },
    receiveStockName(name) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.RECEIVE_STOCK_NAME,
            name
        })
    },
    receiveStockPeriod(name, period) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.RECEIVE_STOCK_PERIOD,
            data: { name, period }
        })
    },
    receiveStockDataType(name, datatype) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.RECEIVE_STOCK_DATATYPE,
            data: { name, datatype }
        })
    }
};