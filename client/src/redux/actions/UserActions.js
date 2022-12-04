import SendApiRequest from "../../services/ApiService";
import Constants from "../../Constants";
import UserService from "../../services/UserService";
import ACTIONS from "./actionConstants/UserActionsConstants";
import { DispatchError, Successful } from "./ApiHandlerActions";
import ApiMessagesConstants from "../../ApiMessagesConstants";

const Login = () => ({
    type: ACTIONS.LOGIN
});

const Logout = () => ({
    type: ACTIONS.LOGOUT
});

export const LoginAction = (login_form) => {
    return async (dispatch) => {
        try {
            const form_encrypted_password = await UserService.EncryptForm(login_form);
            await SendApiRequest('/auth/login', Constants.API_METHODS.POST, form_encrypted_password);
            dispatch(Login());
            dispatch(Successful(ApiMessagesConstants.login.successful));
        } catch (err) {
            dispatch(Logout());
            DispatchError(dispatch, err, ApiMessagesConstants.login.failed);
        }
    }
};

export const LogoutAction = () => {
    return async (dispatch) => {
        try {
            await SendApiRequest('/auth/logout');
            localStorage.removeItem('jwt');
            dispatch(Logout());
            dispatch(Successful(ApiMessagesConstants.logout.successful));
        } catch (err) {
            DispatchError(dispatch, err, ApiMessagesConstants.logout.failed);
        }
    }
}

export const AuthUserAction = () => {
    return async (dispatch) => {
        try {
            await SendApiRequest('/auth/token');
            dispatch(Login());
        } catch (err) {
            dispatch(Logout());
        }
    }
}