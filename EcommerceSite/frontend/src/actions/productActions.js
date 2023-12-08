import axios from 'axios'
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

} from '../constants/productConstants'

/**
 * Fetches a list of products.
 * 
 * Dispatches a request action, then makes an API call to retrieve a list of products. The keyword
 * parameter is used for filtering products. Upon success, it dispatches a success action with
 * the product data. In case of failure, it dispatches an error action.
 *
 * @param {string} keyword - The keyword for filtering products (optional).
 * @returns {Function} A thunk action that handles the asynchronous operation.
 */
export const listProducts = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`/api/products${keyword}`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

/**
 * Fetches details of a specific product.
 * 
 * Dispatches a request action, then makes an API call to fetch the details of a product
 * based on the provided ID. It dispatches a success action with the product details on
 * success, or an error action in case of failure.
 *
 * @param {string} id - The ID of the product to fetch details for.
 * @returns {Function} A thunk action that handles the asynchronous operation.
 */
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

/**
 * Creates a review for a product.
 * 
 * Dispatches a request action and makes an API call to create a review for a product. The function
 * requires user authentication. On successful creation, it dispatches a success action with the
 * review data. In case of failure, it dispatches an error action.
 *
 * @param {string} productId - The ID of the product to review.
 * @param {Object} review - The review data to be submitted.
 * @returns {Function} A thunk action that handles the asynchronous operation.
 */
export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/products/${productId}/reviews/`,
            review,
            config
        )
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })



    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}