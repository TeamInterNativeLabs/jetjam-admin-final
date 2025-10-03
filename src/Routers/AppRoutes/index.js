import React from "react";

import Album from "../../Screens/Album";
import AddAlbum from "../../Screens/Album/AddAlbum";
import AlbumDetails from "../../Screens/Album/AlbumDetails";
import EditAlbum from "../../Screens/Album/EditAlbum";

import PaidAlbum from "../../Screens/PaidAlbum";
// import AddAlbum from "../../Screens/Album/AddAlbum";
// import AlbumDetails from "../../Screens/Album/AlbumDetails";
// import EditAlbum from "../../Screens/Album/EditAlbum";

import ForgetPassword from "../../Screens/Auth/ForgetPassword";
import ForgetPassword2 from "../../Screens/Auth/ForgetPassword2";
import ForgetPassword3 from "../../Screens/Auth/ForgetPassword3";
import AdminLogin from "../../Screens/Auth/Login";
import { Dashboard } from "../../Screens/Dashboard";
import Error from "../../Screens/Error";
import Genre from "../../Screens/Genre";
import AddGenre from "../../Screens/Genre/AddGenre";
import Packages from "../../Screens/Packages";
import PackageDetails from "../../Screens/Packages/PackageDetails";
import SnpVideos from "../../Screens/SnpVideos";
import DetailVideo from "../../Screens/SnpVideos/DetailVideo";
import AddVideo from "../../Screens/SnpVideos/AddVideo";
import Subscriptions from "../../Screens/Subscriptions";
import { UserManagement } from "../../Screens/UserManagement";
import UserDetails from "../../Screens/UserManagement/UserDetails";
import AddPaidAlbum from "../../Screens/PaidAlbum/AddAlbum";

let AppRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    isProtected: true,
  },
  {
    path: "/login",
    element: <AdminLogin />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/forget-password2",
    element: <ForgetPassword2 />,
  },
  {
    path: "/forget-password3",
    element: <ForgetPassword3 />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    isProtected: true,
  },
  {
    path: "/users",
    element: <UserManagement />,
    isProtected: true,
  },
  {
    path: "/users/:id",
    element: <UserDetails />,
    isProtected: true,
  },
  {
    path: "/packages",
    element: <Packages />,
    isProtected: true,
  },
  {
    path: "/packages/:id",
    element: <PackageDetails />,
    isProtected: true,
  },
  {
    path: "/paid-albums",
    element: <PaidAlbum />,
    isProtected: true,
  },
  {
    path: "/paid-albums/add",
    element: <AddPaidAlbum />,
    isProtected: true,
  },
  {
    path: "/albums",
    element: <Album />,
    isProtected: true,
  },
  {
    path: "/albums/:id",
    element: <AlbumDetails />,
    isProtected: true,
  },
  {
    path: "/albums/add",
    element: <AddAlbum />,
    isProtected: true,
  },
  {
    path: "/albums/edit/:id",
    element: <EditAlbum />,
    isProtected: true,
  },
  {
    path: "/subscriptions",
    element: <Subscriptions />,
    isProtected: true,
  },
  {
    path: "/genre",
    element: <Genre />,
    isProtected: true,
  },
  {
    path: "/genre/add",
    element: <AddGenre />,
    isProtected: true,
  },
  {
    path: "/snp-videos",
    element: <SnpVideos />,
    isProtected: true,
  },
  {
    path: "/snp-videos/:id",
    element: <DetailVideo />,
    isProtected: true,
  },
  {
    path: "/snp-videos/add",
    element: <AddVideo />,
    isProtected: true,
  },
  {
    path: "*",
    element: <Error />,
  },
];

export default AppRoutes;
