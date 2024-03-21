"use client";
import {atom} from "recoil";

export const activationCodeState = atom({
    key: 'activationCode',
    default: '',
});

export const userState = atom({
    key: 'user',
    default: {
        username: "",
        email: "",
        password: ""
    },
});