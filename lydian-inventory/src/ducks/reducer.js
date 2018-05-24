
import axios from 'axios';

const initialState={
    user: {},
    instId: 0

}

const GET_USER='GET_USER';
const GET_INST_ID='GET_INST_ID';

export function get_inst_id(instId){
    return{
        type: GET_INST_ID,
        payload: instId
    }
}

export function getUser(){
    let userData=axios.get('/auth/me').then(res=>{
        return res.data;
    })
    return {
        type: GET_USER,
        payload: userData
    }
}

export default function reducer(state=initialState, action){
    // return state;
    switch(action.type){
        case GET_USER + '_FULFILLED':
        return Object.assign({}, state, {user:action.payload}) 
        case GET_INST_ID:
        console.log(action.payload);
        return Object.assign({}, state, {instId: action.payload})    
        default:
        return state;
    }
}