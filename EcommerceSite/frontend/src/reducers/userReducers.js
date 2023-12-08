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
    USER_UPDATE_PROFILE_RESET,

} from '../constants/userConstants'

/**
 * Reducer for handling the state related to user login.
 *
 * @param {Object} state - The current state of the user login.
 * @param {Object} action - The action dispatched to update the state.
 * @returns {Object} - The updated state based on the action type.
 */
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        /**
         * Handles the request for user login.
         *
         * @returns {Object} - The state indicating that user login is in progress.
         */
        case USER_LOGIN_REQUEST:
            return { loading: true }

        /**
         * Handles the success of user login.
         *
         * @param {Object} action.payload - The user information.
         * @returns {Object} - The state with the logged-in user information.
         */
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        /**
         * Handles the failure of user login.
         *
         * @param {string} action.payload - The error message.
         * @returns {Object} - The state indicating the failure of user login.
         */
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        /**
         * Handles user logout.
         *
         * @returns {Object} - The state with default values after user logout.
         */
        case USER_LOGOUT:
            return {}

        /**
         * Default case: returns the current state.
         */
        default:
            return state
    }
}

/**
 * Reducer for handling the state related to user registration.
 *
 * @param {Object} state - The current state of user registration.
 * @param {Object} action - The action dispatched to update the state.
 * @returns {Object} - The updated state based on the action type.
 */
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        /**
         * Handles the request for user registration.
         *
         * @returns {Object} - The state indicating that user registration is in progress.
         */
        case USER_REGISTER_REQUEST:
            return { loading: true }

        /**
         * Handles the success of user registration.
         *
         * @param {Object} action.payload - The user information.
         * @returns {Object} - The state with the registered user information.
         */
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }

        /**
         * Handles the failure of user registration.
         *
         * @param {string} action.payload - The error message.
         * @returns {Object} - The state indicating the failure of user registration.
         */
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        /**
         * Handles user logout.
         *
         * @returns {Object} - The state with default values after user logout.
         */
        case USER_LOGOUT:
            return {}

        /**
         * Default case: returns the current state.
         */
        default:
            return state
    }
}


/**
 * Reducer for handling the state related to user details.
 *
 * @param {Object} state - The current state of user details.
 * @param {Object} action - The action dispatched to update the state.
 * @returns {Object} - The updated state based on the action type.
 */
export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        /**
         * Handles the request for user details.
         *
         * @returns {Object} - The state indicating that user details are being requested.
         */
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }

        /**
         * Handles the success of fetching user details.
         *
         * @param {Object} action.payload - The user details.
         * @returns {Object} - The state with the fetched user details.
         */
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }

        /**
         * Handles the failure of fetching user details.
         *
         * @param {string} action.payload - The error message.
         * @returns {Object} - The state indicating the failure to fetch user details.
         */
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        /**
         * Handles the reset of user details state.
         *
         * @returns {Object} - The state with default values for user details.
         */
        case USER_DETAILS_RESET:
            return { user: {} }

        /**
         * Default case: returns the current state.
         */
        default:
            return state
    }
}

/**
 * Reducer for handling the state related to updating user profile.
 *
 * @param {Object} state - The current state of updating user profile.
 * @param {Object} action - The action dispatched to update the state.
 * @returns {Object} - The updated state based on the action type.
 */
export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        /**
         * Handles the request for updating user profile.
         *
         * @returns {Object} - The state indicating that user profile update is in progress.
         */
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }

        /**
         * Handles the success of updating user profile.
         *
         * @param {Object} action.payload - The updated user information.
         * @returns {Object} - The state indicating successful user profile update.
         */
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }

        /**
         * Handles the failure of updating user profile.
         *
         * @param {string} action.payload - The error message.
         * @returns {Object} - The state indicating the failure of user profile update.
         */
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }

        /**
         * Handles the reset of user profile update state.
         *
         * @returns {Object} - The state with default values for user profile update.
         */
        case USER_UPDATE_PROFILE_RESET:
            return {}
        /**
         * Default case: returns the current state.
         */
        default:
            return state
    }
}