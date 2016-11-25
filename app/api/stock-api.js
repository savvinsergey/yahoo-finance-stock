import axios from 'axios';
import jsonp from 'browser-jsonp';
import moment from 'moment';

import StockActions from "../actions/stock-actions";

//------------- private ----------------//

function _requestToYQL(symbol,startDate,endDate){
    return axios.get('http://query.yahooapis.com/v1/public/yql', {
        params: {
            q: `select * from yahoo.finance.historicaldata  where
                symbol in ("${symbol}") 
                and startDate = "${startDate}"
                and endDate = "${endDate}"`,
            format: 'json',
            env: 'store://datatables.org/alltableswithkeys'
        }
    }).then(response => {
        if (response.data.query.results) {
            StockActions.receiveStockData(response.data.query.results.quote);
        }
    })
}

//------------- public ----------------//

export default {
    fetchData : {
        day(symbol){
            return jsonp({
                url:`http://chartapi.finance.yahoo.com/instrument/1.0/${symbol}/chartdata;type=close;range=1d/json`,
                success: response => {
                    if (response.series) {
                        StockActions.receiveStockData(response.series);
                    }
                }});
        },

        month(symbol) {
            let startDate = moment().subtract(1,'month').format("YYYY-MM-DD");
            let endDate = moment().format("YYYY-MM-DD");

            return _requestToYQL(symbol,startDate,endDate);
        },

        year(symbol) {
            let startDate = moment().subtract(1,'year').format("YYYY-MM-DD");
            let endDate = moment().format("YYYY-MM-DD");

            return _requestToYQL(symbol,startDate,endDate);
        }
    }
}