import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,

} from '../constants/userConstants'

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

/**
 * Logs in a user.
 * 
 * Dispatches a request action, then makes an API call to authenticate the user. Upon successful
 * authentication, it dispatches a success action with user data and stores the user info in local storage.
 * In case of failure, it dispatches an error action.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Function} A thunk action that handles the asynchronous operation.
 */
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/login/',
            { 'username': email, 'password': password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

/**
 * Logs out the current user.
 * 
 * Removes user information from local storage and dispatches actions to reset user and order details.
 *
 * @returns {Function} A thunk action that handles the operation.
 */
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
}

/**
 * Registers a new user.
 * 
 * Dispatches a request action, then makes an API call to register the user. Upon successful
 * registration, it dispatches success actions for both registration and login, and stores the user
 * info in local storage. In case of failure, it dispatches an error action.
 *
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password for the new account.
 * @returns {Function} A thunk action that handles the asynchronous operation.
 */
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/register/',
            { 'name': name, 'email': email, 'password': password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


/**
 * Fetches details of a specific user.
 * 
 * Dispatches a request action, then makes an API call to fetch user details based on the provided ID.
 * Requires user authentication. On success, it dispatches a success action with the user details,
 * or an error action in case of failure.
 *
 * @param {string} id - The ID of the user to fetch details for.
 * @returns {Function} A thunk action that handles the asynchronous operation.
 */
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
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

        const { data } = await axios.get(
            `/api/users/${id}/`,
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

/**
 * Updates the profile of the logged-in user.
 * 
 * Dispatches a request action and makes an API call to update the user profile. Requires user
 * authentication. On successful update, it dispatches success actions for both profile update and
 * user login, and updates the user info in local storage. In case of failure, it dispatches an error action.
 *
 * @param {Object} user - The updated user data.
 * @returns {Function} A thunk action that handles the asynchronous operation.
 */
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
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

        const { data } = await axios.put(
            `/api/users/profile/update/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}