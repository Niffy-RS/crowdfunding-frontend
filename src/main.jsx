import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFound from "./pages/404Page.jsx";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import FundraiserPage from "./pages/FundraiserPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import NewFundraiserPage from "./pages/NewFundraiserPage.jsx";
import NewPledgePage from "./pages/NewPledgePage.jsx";
import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import "./style.css"

const router = createBrowserRouter([
  {
      path: "/",
      element: <NavBar />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "login", element: <LoginPage />},
        { path: "fundraisers/:id", element: <FundraiserPage /> },
        { path: "fundraisers", element: <NewFundraiserPage /> },
        { path: "pledges/:id", element: <NewPledgePage /> },
        { path: "users/:id", element: <UserPage /> },
        { path: "signup", element: <SignupPage /> },
        { path: "*", element: <NotFound /> }
      ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
     {/* Here we wrap our app in the router provider so they render */}
    <RouterProvider router={router} />
  </AuthProvider>
  </React.StrictMode>
);