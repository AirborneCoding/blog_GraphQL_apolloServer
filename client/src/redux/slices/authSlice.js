import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("01-BLOG_USER")) || null
}

const themes = {
    winter: 'winter',
    dracula: 'night',
};

const getThemeFromLocalStorage = () => {
    const theme = localStorage.getItem('theme') || themes.winter;
    document.documentElement.setAttribute('data-theme', theme);
    return theme;
};

const initialState = {
    user: getUserFromLocalStorage(),
    registerMessage: false,
    isEmailVerified: false,
    verifyResetPasswordMessage: {
        isSend: false,
        isVerified: false,
        isChanged: false
    },
    theme: getThemeFromLocalStorage(),
}




const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            const token = action?.payload?.data?.login?.user?.token
            const user = { ...action?.payload?.data?.login?.user, token };
            state.user = user;
            localStorage.setItem('01-BLOG_USER', JSON.stringify(user));
        },
        logout(state, action) {
            state.user = null
            localStorage.removeItem("01-BLOG_USER")
        },
        setVerifyEmailMessage(state, action) {
            state.isEmailVerified = true
        },
        setIsSendVerifyPassword(state, action) {
            state.verifyResetPasswordMessage.isSend = action.payload
        },
        setIsVerifyPasswordLink(state, action) {
            state.verifyResetPasswordMessage.isVerified = action.payload
        },
        setIsPasswordChanged(state, action) {
            state.verifyResetPasswordMessage.isChanged = action.payload
        },
        toggleTheme: (state) => {
            const { dracula, winter } = themes;
            state.theme = state.theme === dracula ? winter : dracula;
            document.documentElement.setAttribute('data-theme', state.theme);
            localStorage.setItem('theme', state.theme);
        },

    }
})

export const {
    login,
    logout,
    toggleTheme,

    setVerifyEmailMessage,
    setIsSendVerifyPassword,
    setIsVerifyPasswordLink,
    setIsPasswordChanged,
} = authSlice.actions

export default authSlice.reducer