import { AsyncStorage } from "react-native";

import { TeamData, PlayerData } from './dataObjects';

export const POST_LOGIN = "aftershock/login/LOAD";
export const POST_LOGIN_SUCCESS = "aftershock/login/LOAD_SUCCESS";
export const POST_LOGIN_FAIL = "aftershock/login/LOAD_FAIL";

export const GET_PING = "aftershock/login/PING";

export const GET_PLAYER_DATA = "aftershock/playerDetails/GET_PLAYER_DATA";

export const GET_TEAM_DATA = "aftershock/players/GET_TEAM_DATA";
export const GET_TEAM_DATA_SUCCESS = "aftershock/players/GET_TEAM_DATA_SUCCESS";

export const POST_PLAYER_DATA = "aftershock/player/POST_PLAYER_DATA";

export const STORE_TOKEN = "aftershock/STORE_TOKEN";

export default function reducer(state = { login: false, player: {} }, action) {
    switch(action.type) {
        case POST_LOGIN:
            return {...state, loading: true};
        case POST_LOGIN_SUCCESS:
            if (action.payload.data.token !== null) {
                AsyncStorage.setItem('token', action.payload.data.token);
            }
            return { ...state, login: action.payload.data.success, loading: false, error: "", token: action.payload.data.token };
        case POST_LOGIN_FAIL:
            return { ...state, loading: false, error: "Username or Password not found"}
        case GET_PING:
            return { ...state, awake: true }
        case GET_TEAM_DATA_SUCCESS:
            return { ...state, players: action.payload.data.players }
        case GET_PLAYER_DATA:
            return { ...state, player: PlayerData[action.id] }
        case POST_PLAYER_DATA: {
            return {...state};
        }
        case STORE_TOKEN:
            return { ...state, token: action.token}
        default:
            return state;
    }
}

export function wakeupServer() {
    return {
         type: GET_PING,
         payload: {
             request: {
                 method: "get",
                 url:"/ping",
                 data: {}
             }
         }
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

export function getTeamData(token) {
    return {
        type: GET_TEAM_DATA,
        payload: {
            request: {
                method: 'get',
                url: `/players`,
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        }
    };
}

export function getPlayerData(player_id) {
    return {
        type: GET_PLAYER_DATA,
        id: player_id,
        payload: {
            request: {
                method: 'get',
                url: `/player/${player_id}`
            }
        }
    };
}

export function postPlayerData(player_data, token) {
    return {
        type: POST_PLAYER_DATA,
        payload: {
            request: {
                method: 'Post',
                url: '/player',
                data: player_data,
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        }
    };
}

export function storeToken(token) {
    return {
        type: STORE_TOKEN,
        token: token
    }
}
