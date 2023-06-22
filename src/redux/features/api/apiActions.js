import { useSelector } from 'react-redux';
import { fetchDataStart, fetchSuccess, fetchShuttleDataSuccess, fetchOrderDataSuccess, fetchDataFailure } from './apiSlice';
import { PLATFORM_SETTINGS } from '../../../data/settings';

export const fetchShuttlesData = () => async dispatch => {
    dispatch(fetchDataStart());

    try {
        const response = await fetch("https://eu-west-1.aws.data.mongodb-api.com/app/data-webug/endpoint/data/v1/action/find", {
            method: 'POST',
            headers: {
                "api-key": "LObhark0VJAg6FgLqapnbgyX9Ltj7tZsCkbjWd4Nig0eb9LKL5rUZH1utHqeSnxW",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dataSource: "Cluster0",
                database: "jiva_production",
                collection: "shuttles",
                filter: {},
            }),
            redirect: 'follow',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
        }

        const result = await response.json();
        dispatch(fetchShuttleDataSuccess(result.documents));
    } catch (error) {
        dispatch(fetchDataFailure(error.message));
    }
};

export const insertOrder = (orderData) => async (dispatch) => {
    dispatch(fetchDataStart());

    try {
        const response = await fetch(
            'https://eu-west-1.aws.data.mongodb-api.com/app/data-webug/endpoint/data/v1/action/insertOne',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': 'LObhark0VJAg6FgLqapnbgyX9Ltj7tZsCkbjWd4Nig0eb9LKL5rUZH1utHqeSnxW',
                },
                body: JSON.stringify({
                    dataSource: 'Cluster0',
                    database: 'jiva_production',
                    collection: 'orders',
                    document: orderData,
                }),
                redirect: 'follow',
            }
        );

        if (!response.ok) {
            throw new Error('Failed to insert data into the API');
        }

        const result = await response.json();
        dispatch(fetchOrderDataSuccess(result));
    } catch (error) {
        dispatch(fetchDataFailure(error.message));
    }
};

export const executeOrder = () => async (dispatch) => {

}