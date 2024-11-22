import { atom } from 'recoil';

export const userTokenState = atom({
  key: 'userTokenState', 
  default: '', 
});

export const userState = atom({
  key: 'userState', 
  default: {
    accountId: null, 
    email: '', 
    phone_number: '',
    nickname: '', 
    point: 0, 
    profileImageUrl: '',
    userRole: 'child', 
  },
});