import { createSlice } from "@reduxjs/toolkit"
import { generalApiService } from "../../Apis/General"

let initialState = {
    general: null
}

export const GeneralSlice = createSlice({
    name: 'generalSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(generalApiService.endpoints.getGeneral.matchFulfilled, (state, action) => {
            let { success, data } = action.payload
            if (success) {
                state.general = data
            }
        })
    }
})

export const { } = GeneralSlice.actions
export default GeneralSlice.reducer
