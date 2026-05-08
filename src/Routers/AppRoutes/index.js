import React from "react";

import Album from "../../Screens/Album";
import AddAlbum from "../../Screens/Album/AddAlbum";
import AlbumDetails from "../../Screens/Album/AlbumDetails";
import EditAlbum from "../../Screens/Album/EditAlbum";

import PaidAlbum from "../../Screens/PaidAlbum";
import AddPaidAlbum from "../../Screens/PaidAlbum/AddAlbum";

import ForgetPassword from "../../Screens/Auth/ForgetPassword";
import ForgetPassword2 from "../../Screens/Auth/ForgetPassword2";
import ForgetPassword3 from "../../Screens/Auth/ForgetPassword3";
import AdminLogin from "../../Screens/Auth/Login";
import { Dashboard } from "../../Screens/Dashboard";
import Error from "../../Screens/Error";
import Genre from "../../Screens/Genre";
import AddGenre from "../../Screens/Genre/AddGenre";
import Packages from "../../Screens/Packages";
import AddPackage from "../../Screens/Packages/AddPackage";
import PackageDetails from "../../Screens/Packages/PackageDetails";
import SnpVideos from "../../Screens/SnpVideos";
import DetailVideo from "../../Screens/SnpVideos/DetailVideo";
import AddVideo from "../../Screens/SnpVideos/AddVideo";
import Subscriptions from "../../Screens/Subscriptions";
import { UserManagement } from "../../Screens/UserManagement";
import UserDetails from "../../Screens/UserManagement/UserDetails";

// Previously unreachable screens — now registered
import { Feedbacks } from "../../Screens/Feedbacks";
import FeedbackDetails from "../../Screens/Feedbacks/FeedbackDetails";
import Notifications from "../../Screens/Notifications";
import { Representatives } from "../../Screens/Representatives";
import RepresentativeDetails from "../../Screens/Representatives/RepresentativeDetails";
import { Customers } from "../../Screens/Customers";
import CustomerDetails from "../../Screens/Customers/CustomerDetails";
import { Orders } from "../../Screens/Orders";
import OrderDetails from "../../Screens/Orders/OrderDetails";
import Profile from "../../Screens/Profile";
import EditProfile from "../../Screens/Profile/EditProfile";
import ChangePassword from "../../Screens/Profile/ChangePassword";

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
  // User Management
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
  // Subscription Plans (Packages)
  {
    path: "/packages",
    element: <Packages />,
    isProtected: true,
  },
  {
    path: "/packages/add",
    element: <AddPackage />,
    isProtected: true,
  },
  {
    path: "/packages/:id",
    element: <PackageDetails />,
    isProtected: true,
  },
  // Paid Albums
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
  // Free Albums
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
  // Subscriptions (paid records)
  {
    path: "/subscriptions",
    element: <Subscriptions />,
    isProtected: true,
  },
  // Genre
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
  // SNP Videos
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
  // Feedbacks — FIX: was missing route for details
  {
    path: "/feedbacks",
    element: <Feedbacks />,
    isProtected: true,
  },
  {
    path: "/feedbacks/feedback-details/:id",
    element: <FeedbackDetails />,
    isProtected: true,
  },
  // Notifications
  {
    path: "/notifications",
    element: <Notifications />,
    isProtected: true,
  },
  // Representatives — FIX: add-representative route was missing
  {
    path: "/representatives",
    element: <Representatives />,
    isProtected: true,
  },
  {
    path: "/representatives/:id",
    element: <RepresentativeDetails />,
    isProtected: true,
  },
  {
    path: "/add-representative",
    element: <RepresentativeDetails />,
    isProtected: true,
  },
  // Customers — FIX: view route was missing
  {
    path: "/customers",
    element: <Customers />,
    isProtected: true,
  },
  {
    path: "/representative/customers/details/:id",
    element: <CustomerDetails />,
    isProtected: true,
  },
  // Orders
  {
    path: "/orders",
    element: <Orders />,
    isProtected: true,
  },
  {
    path: "/orders/:id",
    element: <OrderDetails />,
    isProtected: true,
  },
  // Profile — FIX: routes were wrong
  {
    path: "/profile",
    element: <Profile />,
    isProtected: true,
  },
  {
    path: "/profile/edit-profile",
    element: <EditProfile />,
    isProtected: true,
  },
  {
    path: "/profile/change-password",
    element: <ChangePassword />,
    isProtected: true,
  },
  {
    path: "*",
    element: <Error />,
  },
];

export default AppRoutes;
