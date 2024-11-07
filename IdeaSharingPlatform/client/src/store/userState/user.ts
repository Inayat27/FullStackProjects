import {
    atom
  } from 'recoil';

const userAuthState = atom({
    key:'userAuthState',
    default:{
        email:"",
        name:""
    }
});

const userLoginState= atom({
    key:'userLoginState',
    default:false
});


export {userLoginState,userAuthState};