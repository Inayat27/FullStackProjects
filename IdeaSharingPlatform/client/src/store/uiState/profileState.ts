import {
    atom
  } from 'recoil';


  const profileState = atom({
    key:'isProfileOpen',
    default:false
  })


  export {profileState}