import {
  USER_LOGIN,
  USER_LOGIN_COMPLETED,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_LOGIN_UI_RESET,
  USER_LOGOUT,
  USER_REGISTER,
  USER_REGISTER_COMPLETED,
  USER_REGISTER_ERROR,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_UI_RESET,
} from '../actions';

const INITIAL_STATE = {
  // Login
  data: null,
  isLoading: false,
  isError: false,
  errorMessage: null,
  // Registration
  registerData: null,
  registerLoading: false,
  registerError: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  console.log(action.type);
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        data: null,
        isLoading: true,
        isError: false,
        errorMessage: null,
      };

    case USER_LOGIN_COMPLETED:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
        errorMessage: null,
      };

    case USER_LOGIN_ERROR:
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: true,
        errorMessage: action.payload || 'Login failed',
      };

    case USER_LOGIN_RESET:
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: false,
        errorMessage: null,
      };

    case USER_LOGIN_UI_RESET:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: null,
      };

    case USER_LOGOUT:
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: false,
        errorMessage: null,
      };

    case USER_REGISTER_REQUEST:
      return {
        ...state,
        registerData: null,
        registerLoading: true,
        registerError: null,
      };

    case USER_REGISTER_COMPLETED:
      return {
        ...state,
        registerData: action.payload,
        registerLoading: false,
        registerError: null,
      };

    case USER_REGISTER_ERROR:
      return {
        ...state,
        registerData: null,
        registerLoading: false,
        registerError: action.payload || 'Registration failed',
      };

    case USER_REGISTER_RESET:
      return {
        ...state,
        registerData: null,
        registerLoading: false,
        registerError: null,
      };

    case USER_REGISTER_UI_RESET:
      return {
        ...state,
        registerLoading: false,
        registerError: null,
      };

    default:
      return state;
  }
}

export const userLogin = payload => ({
  type: USER_LOGIN,
  payload,
});

export const resetLogin = () => ({
  type: USER_LOGIN_RESET,
});

export const resetLoginUi = () => ({
  type: USER_LOGIN_UI_RESET,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const userRegister = payload => ({
  type: USER_REGISTER,
  payload,
});

export const resetRegister = () => ({
  type: USER_REGISTER_RESET,
});

export const resetRegisterUi = () => ({
  type: USER_REGISTER_UI_RESET,
});