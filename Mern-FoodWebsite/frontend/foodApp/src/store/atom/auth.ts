import { atom } from "recoil";

export const authState = atom({
    key:"authState",
    default:{
        signup:false,
        login:false,
        issignUp:true
    }
})

