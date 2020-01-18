export const POST_LOGIN = "aftershock/login/LOAD";
export const POST_LOGIN_SUCCESS = "aftershock/login/LOAD_SUCCESS";
export const POST_LOGIN_FAIL = "aftershock/login/LOAD_FAIL";

export default function reducer(state = { login: false }, action) {
    switch(action.type) {
        case POST_LOGIN:
            return {...state, loading: true};
        case POST_LOGIN_SUCCESS:
            return { ...state, login: action.payload.data.success, loading: false, error: "" };
        case POST_LOGIN_FAIL:
            return { ...state, loading: false, error: "Username or Password not found"}
        default:
            return state;
    }
}

export function submitLogin(username, password) {
    return {
        type: POST_LOGIN,
        payload: {
            request: {
                method: 'post',
                url: "/login",
                data: {
                    username: username,
                    password: password
                }
            }
        }
    };
}