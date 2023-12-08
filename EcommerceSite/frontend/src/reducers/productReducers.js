import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
} from '../constants/productConstants'

/**
 * Reducer for handling the state related to the list of products.
 *
 * @param {Object} state - The current state of the product list.
 * @param {Object} action - The action dispatched to update the state.
 * @returns {Object} - The updated state based on the action type.
 */
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        /**
         * Handles the request to get the list of products.
         *
         * @returns {Object} - The state indicating that the product list is being requested.
         */
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }

        /**
         * Handles the success of fetching the product list.
         *
         * @param {Object} action.payload - The product list, page information, and total pages.
         * @returns {Object} - The state with the fetched product list.
         */
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages
            }

        /**
         * Handles the failure of fetching the product list.
         *
         * @param {string} action.payload - The error message.
         * @returns {Object} - The state indicating the failure to fetch the product list.
         */
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        /**
         * Default case: returns the current state.
         */
        default:
            return state
    }
}


/**
 * Reducer for handling the state related to product details.
 *
 * @param {Object} state - The current state of the product details.
 * @param {Object} action - The action dispatched to update the state.
 * @returns {Object} - The updated state based on the action type.
 */
export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        /**
         * Handles the request to get product details.
         *
         * @returns {Object} - The state indicating that product details are being requested.
         */
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }

        /**
         * Handles the success of fetching product details.
         *
         * @param {Object} action.payload - The product details.
         * @returns {Object} - The state with the fetched product details.
         */
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }

        /**
         * Handles the failure of fetching product details.
         *
         * @param {string} action.payload - The error message.
         * @returns {Object} - The state indicating the failure to fetch product details.
         */
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        /**
         * Default case: returns the current state.
         */
        default:
            return state
    }
}

/**
 * Reducer for handling the state related to creating product reviews.
 *
 * @param {Object} state - The current state of creating product reviews.
 * @param {Object} action - The action dispatched to update the state.
 * @returns {Object} - The updated state based on the action type.
 */
export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        /**
         * Handles the request to create a product review.
         *
         * @returns {Object} - The state indicating that the review is being created.
         */
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }

        /**
         * Handles the success of creating a product review.
         *
         * @returns {Object} - The state indicating successful review creation.
         */
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, }

        /**
         * Handles the failure of creating a product review.
         *
         * @param {string} action.payload - The error message.
         * @returns {Object} - The state indicating the failure to create a review.
         */
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        /**
         * Handles the reset of the product review creation state.
         *
         * @returns {Object} - The state with default values for review creation.
         */
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}

        /**
         * Default case: returns the current state.
         */
        default:
            return state
    }
}

