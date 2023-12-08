import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

/**
 * Adds a product to the cart.
 * 
 * This function dispatches an action to add a product to the cart state. It fetches product
 * details from the API, then dispatches the action with the product details and desired quantity.
 * Finally, it updates the cart items in the local storage.
 *
 * @param {string} id - The ID of the product to add to the cart.
 * @param {number} qty - The quantity of the product to add.
 * @returns {Function} A thunk action that handles the asynchronous operation.
 */
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

/**
 * Removes a product from the cart.
 * 
 * This function dispatches an action to remove a product from the cart state. After dispatching,
 * it updates the cart items in local storage.
 *
 * @param {string} id - The ID of the product to be removed from the cart.
 * @returns {Function} A thunk action that handles the operation.
 */
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

/**
 * Saves the shipping address.
 * 
 * Dispatches an action to save the shipping address in the state and stores it in local storage.
 *
 * @param {Object} data - The shipping address data.
 * @returns {Function} A thunk action that handles the operation.
 */
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

/**
 * Saves the selected payment method.
 * 
 * Dispatches an action to save the payment method in the state and stores it in local storage.
 *
 * @param {string} data - The selected payment method.
 * @returns {Function} A thunk action that handles the operation.
 */
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}