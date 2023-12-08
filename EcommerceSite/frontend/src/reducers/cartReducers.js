import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS,
} from '../constants/cartConstants'


/**
 * Reducer function for managing the shopping cart state.
 *
 * @param {Object} state - The current state of the shopping cart.
 * @param {Object} action - The action dispatched to update the state.
 * @returns {Object} - The updated state based on the action type.
 */
export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? item : x)
                }

            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        /**
         * Removes an item from the shopping cart.
         *
         * @param {string} action.payload - The ID of the item to be removed.
         * @returns {Object} - The updated state with the removed item.
         */
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        /**
         * Saves the shipping address to the shopping cart state.
         *
         * @param {Object} action.payload - The shipping address to be saved.
         * @returns {Object} - The updated state with the saved shipping address.
         */
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        /**
         * Saves the payment method to the shopping cart state.
         *
         * @param {string} action.payload - The selected payment method.
         * @returns {Object} - The updated state with the saved payment method.
         */
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        /**
         * Clears all items from the shopping cart.
         *
         * @returns {Object} - The updated state with an empty cart.
         */
        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }
            
        /**
         * Default case: returns the current state.
         */
        default:
            return state
    }
}