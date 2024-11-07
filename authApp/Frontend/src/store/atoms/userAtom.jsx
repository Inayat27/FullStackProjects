
import {atom } from 'recoil'


export const userState = atom({
    key:'userInfo',
    default:false
})


export const loginState = atom({
    key:'loginInfo',
    default:false
})


export const userData = atom({
    key:'user',
    default:{}
})
