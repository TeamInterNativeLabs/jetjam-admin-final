import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authApiService } from "../Apis/Auth";
import { feedbackApiService } from "../Apis/Feedback";
import { imageApiService } from "../Apis/Image";
import { userApiService } from "../Apis/User";

import { albumApiService } from "../Apis/Albums";
import { bannerApiService } from "../Apis/Banner";
import { brandsApiService } from "../Apis/Brands";
import { discountApiService } from "../Apis/Discount";
import { generalApiService } from "../Apis/General";
import { genreApiService } from "../Apis/Genre";
import { notificationApiService } from "../Apis/Notification";
import { orderApiService } from "../Apis/Order";
import { packageApiService } from "../Apis/Package";
import { productApiService } from "../Apis/Product";
import { subcategoryApiService } from "../Apis/Subcategory";
import { subscriptionApiService } from "../Apis/Subscription";
import AuthSlice, { logout } from "../Slices/Auth";
import GeneralSlice from "../Slices/General";
import { snpVideoApiService } from "../Apis/SnpVideo";

const apiErrorHandler = (store) => (next) => (action) => {
  if (action.type.endsWith("/rejected")) {
    if (action.payload?.data?.message) {
      toast.error(action?.payload?.data?.message);
    }

    if (action.payload?.status === 500) {
      store.dispatch(logout());
    }
  }

  return next(action);
};

const persistConfig = {
  key: "jetjams-admin-91e15a4d-60bc-82b3-4c83-232cdd7c3375",
  storage: storage,
};

export const rootReducers = combineReducers({
  authSlice: AuthSlice,
  generalSlice: GeneralSlice,
  [authApiService.reducerPath]: authApiService.reducer,
  [userApiService.reducerPath]: userApiService.reducer,
  [packageApiService.reducerPath]: packageApiService.reducer,
  [albumApiService.reducerPath]: albumApiService.reducer,
  [subscriptionApiService.reducerPath]: subscriptionApiService.reducer,
  [feedbackApiService.reducerPath]: feedbackApiService.reducer,
  [imageApiService.reducerPath]: imageApiService.reducer,
  [notificationApiService.reducerPath]: notificationApiService.reducer,
  [brandsApiService.reducerPath]: brandsApiService.reducer,
  [genreApiService.reducerPath]: genreApiService.reducer,
  [productApiService.reducerPath]: productApiService.reducer,
  [subcategoryApiService.reducerPath]: subcategoryApiService.reducer,
  [generalApiService.reducerPath]: generalApiService.reducer,
  [orderApiService.reducerPath]: orderApiService.reducer,
  [discountApiService.reducerPath]: discountApiService.reducer,
  [bannerApiService.reducerPath]: bannerApiService.reducer,
  [snpVideoApiService.reducerPath]: snpVideoApiService.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApiService.middleware)
      .concat(userApiService.middleware)
      .concat(packageApiService.middleware)
      .concat(albumApiService.middleware)
      .concat(subscriptionApiService.middleware)
      .concat(feedbackApiService.middleware)
      .concat(imageApiService.middleware)
      .concat(notificationApiService.middleware)
      .concat(brandsApiService.middleware)
      .concat(genreApiService.middleware)
      .concat(productApiService.middleware)
      .concat(subcategoryApiService.middleware)
      .concat(generalApiService.middleware)
      .concat(orderApiService.middleware)
      .concat(discountApiService.middleware)
      .concat(bannerApiService.middleware)
      .concat(bannerApiService.middleware)
      .concat(snpVideoApiService.middleware)
      .concat(apiErrorHandler),
});

setupListeners(store.dispatch);
