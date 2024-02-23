import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { Landing, Login, Logout, Questionnaire } from './pages';
import "./index.css"
import { Refereed } from "./pages/refereed";
import { Articles } from "./pages/articles";
import { ChooseTherapist } from "./pages/chooseTherapist";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/sign-in",
        element: <Login />,
    },
    {
        path: "/logout",
        element: <Logout />,
    },
    {
        path: "/questionnaire",
        element: <Questionnaire />,
    },
    {
        path: "/choose-therapist",
        element: <ChooseTherapist />
    },
    {
        path: "/articles/:name",
        element: <Articles />
    },
    {
        path: "user/me/refereed",
        element: <Refereed />
    }
]);

ReactDOM.createRoot((document.getElementById("root")) as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

