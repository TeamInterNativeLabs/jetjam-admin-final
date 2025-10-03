import { createSlice } from "@reduxjs/toolkit"
import { authApiService } from "../../Apis/Auth"
import { userApiService } from "../../Apis/User"
import { generalApiService } from "../../Apis/General"
import { genreApiService } from "../../Apis/Genre"
import { subcategoryApiService } from "../../Apis/Subcategory"
import { brandsApiService } from "../../Apis/Brands"

let initialState = {
    isLoggedIn: false,
    token: null,
    user: null
}

export const AuthSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false
            state.token = null
            state.user = null
            authApiService.util.resetApiState()
            userApiService.util.resetApiState()
            generalApiService.util.resetApiState()
            genreApiService.util.resetApiState()
            subcategoryApiService.util.resetApiState()
            brandsApiService.util.resetApiState()
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApiService.endpoints.login.matchFulfilled, (state, action) => {
            let { success, token, data } = action.payload
            if (success) {
                state.isLoggedIn = success
                state.token = token
                state.user = data
            } else {
                state.isLoggedIn = false
                state.token = null
                state.user = null
            }
        })
        builder.addMatcher(userApiService.endpoints.updateUser.matchFulfilled, (state, action) => {
            let { success, data } = action.payload

            if (success && state.user._id === data._id) {
                state.user = data
            }

        })
    }
})

export const { logout } = AuthSlice.actions
export default AuthSlice.reducer
