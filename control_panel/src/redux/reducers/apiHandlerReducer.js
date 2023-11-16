import ACTIONS from "../actions/actionConstants/apiHandlerActionsConstants";

const InitState = {
    successful: false,
    failed: false,
    message: "",
    errors: []
};

const reducer = (state = InitState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ACTIONS.INIT_API_HANDLER: {
            return InitState;
        }
        case ACTIONS.SUCCESSFUL: {
            return {
                successful: true,
                failed: false,
                message: payload,
                errors: []
            };
        }
        case ACTIONS.FAILED: {
            return {
                successful: false,
                failed: true,
                message: payload,
                errors: []
            };
        }
        case ACTIONS.FAILED_WITH_FORM: {
            const parsed_errors = {};
            payload.errors.forEach(error => {
                parsed_errors[error.param] = error.msg;
            });
            return {
                successful: false,
                failed: true,
                message: payload.message,
                errors: parsed_errors
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;