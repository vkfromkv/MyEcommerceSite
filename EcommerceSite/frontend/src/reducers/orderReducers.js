import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_CREATE_RESET,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

/**
 * Reducer for handling the state related to order creation.
 *
 * @param {Object} state - The current state of the order creation.
 * @param {Object} action - The action dispatched to update the state.
 * @returns {Object} - The updated state based on the action type.
 */
export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        /**
         * Handles the request to create an order.
         *
         * @returns {Object} - The state indicating that the order creation is in progress.
         */
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }

        /**
         * Handles the success of order creation.
         *
         * @param {Object} action.payload - The created order.
         * @returns {Object} - The state indicating successful order creation.
         */
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        /**
         * Handles the failure of order creation.
         *
         * @param {string} action.payload - The error message.
         * @returns {Object} - The state indicating the failure of order creation.
         */
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        /**
         * Handles the reset of order creation state.
         *
         * @returns {Object} - The state with default values for order creation.
         */
        case ORDER_CREATE_RESET:
            return {}

        /**
         * Default case: returns the current state.
         */
        default:
            return state
    }
}

/**
 * Reducer for handling the state related to order creation.
 *
 * @param {Object} state - The current state of the order creation.
 * @param {Object} action - The action dispatched to update the state.
 * @returns {Object} - The updated state based on the action type.
 */
export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        /**
         * Handles the request to create an order.
         *
         * @returns {Object} - The state indicating that the order creation is in progress.
         */
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        /**
         * Handles the success of order details success..
         */
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        /**
         * Handles the success of order details fail..
         */
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }


        default:
            return state
    }
}


export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        /**
         * Handles the success of order pay request..
         */
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }

        /**
         * Handles the pay success..
         */
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }

        /**
         * Handles the pay fail..
         */
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        /**
         * Handles the success of pay reset..
         */
        case ORDER_PAY_RESET:
            return {}

        default:
            return state
    }
}


export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return {
                loading: true
            }

        /**
         * Handles the success of delivery request..
         */
        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        /**
         * Handles the failure of delivery request..
         */
        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        /**
         * Handles the reset of delivery request..
         */
        case ORDER_DELIVER_RESET:
            return {}

        default:
            return state
    }
}


export const orderListMyReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        /**
         * Handles the success of list my request..
         */
        case ORDER_LIST_MY_REQUEST:
            return {
                loading: true
            }
        /**
         * Handles the success of list my..
         */
        case ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        /**
         * Handles the failure of list my request..
         */
        case ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        /**
         * Handles the reset of list my request..
         */
        case ORDER_LIST_MY_RESET:
            return {
                orders: []
            }

        default:
            return state
    }
}