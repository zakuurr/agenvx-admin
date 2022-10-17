import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

// agenvx
import Dashboard from "cmsagenvx/dashboard/Dashboard"
import CompanyList from "cmsagenvx/companies/CompanyList"
import CompanyEdit from "cmsagenvx/companies/CompanyEdit"
import LeaderboardList from "cmsagenvx/leaderboard/LeaderboardList"
import UserList from "cmsagenvx/users/UserList"
import LeaderboardDetail from "cmsagenvx/leaderboard/LeaderboardDetail"
import MediaList from "cmsagenvx/media/MediaList"

import BookAssetList from "cmsagenvx/bookasset/BookAssetList"
import BookAssetEdit from "cmsagenvx/bookasset/BookAssetEdit"

import VideoAssetList from "cmsagenvx/videoasset/VideoAssetList"

import BookEdit from "cmsagenvx/media/edit/BookEdit"
import VideoEdit from "cmsagenvx/media/edit/VideoEdit"
import CompanyDetail from "cmsagenvx/companies/CompanyDetail"

// manual mapping media assets ID
export const mediaAssets = {
  bookAssetID: '6a7bd028-d3cd-42d6-9244-238d04871cae',
  videoAssetID: '89b8b31a-4a2f-46c4-84f8-71d6e700d526',
}


const userRoutes = [
  // AGEn Virtual Exhibition - CMS
  // { path: "/dashboard", component: Dashboard },
  // { path: "/dashboard", component: () => <Redirect to="/users/list" /> },
  
  { path: "/users", component: () => <Redirect to="/users/list" /> },
  { path: "/users/list", component: UserList },
  
  { path: "/leaderboard", component: () => <Redirect to="/leaderboard/list" /> },
  { path: "/leaderboard/list", component: LeaderboardList },
  { path: "/leaderboard/detail/:userID", component: LeaderboardDetail },
  
  { path: "/companies", component: () => <Redirect to="/companies/list" /> },
  { path: "/companies/list", component: CompanyList },
  { path: "/companies/detail/:companyID", component: CompanyDetail },
  { path: "/companies/edit/:companyID", component: CompanyEdit },

  { path: "/media", component: () => <Redirect to="/media/list" /> },
  { path: "/media/list", component: MediaList },
  { path: `/media/edit/${mediaAssets.bookAssetID}`, component: BookEdit },
  { path: `/media/edit/${mediaAssets.videoAssetID}`, component: VideoEdit },


  { path : '/video', component: () => <Redirect to="/video/list"/>},
  { path: "/video/list", component: VideoAssetList },
  // { path: `/book/edit/:assetID`, component: BookAssetEdit },

  { path : '/book', component: () => <Redirect to="/book/list"/>},
  { path: "/book/list", component: BookAssetList },
  { path: `/book/edit/:assetID`, component: BookAssetEdit },


  // this route should be at the end of all other routes
  { path: "/*", component: () => <Redirect to="/users/list" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
]

export { userRoutes, authRoutes }
