import {
    FETCH_INVOICES_FAILED,
    FETCH_INVOICES_SUCCESS,
    FETCH_INVALID_INVOICES_FAILED,
    FETCH_INVALID_INVOICES_SUCCESS
} from '../types';

const initialState = {
    valid: {
        invoices: [],
        isLoaded: null,
        page: 0,
        fetched: 0
    },
    invalid: {
        invoices: [],
        isLoaded: null,
        page: 0,
        fetched: 0
    }
};

export default function invoiceReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_INVOICES_SUCCESS:
            return {
                ...state,
                valid: {
                    invoices: action.payload,
                    isLoaded: true,
                    page: state.valid.page+1,
                    fetched: action.payload.length,
                }
            };
        case FETCH_INVOICES_FAILED:
            return {
                ...state,
                valid: {
                    isLoaded: false
                }
            };
        case FETCH_INVALID_INVOICES_SUCCESS:
            return {
                ...state,
                invalid: {
                    invoices: action.payload,
                    isLoaded: false,
                    page: state.valid.page+1,
                    fetched: action.payload.length,
                }
            };
        case FETCH_INVALID_INVOICES_FAILED:
            return {
                ...state,
                valid: {
                    isLoaded: false
                }
            };
        default:
            return state;
    }
}
