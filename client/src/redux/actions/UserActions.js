import SendApiRequest from "../../services/ApiService";
import Constants from "../../Constants";
import UserService from "../../services/UserService";
import ACTIONS from "./actionConstants/UserActionsConstants";

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
        } catch (err) {

        }
    }
};

export const LogoutAction = () => {
    return async (dispatch) => {
        try {
            await SendApiRequest('/auth/logout');
            localStorage.removeItem('jwt');
            dispatch(Logout());
        } catch (error) {
            console.log(error);
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