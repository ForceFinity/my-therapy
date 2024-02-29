import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import * as dayjs from "dayjs";
import localeData from 'dayjs/plugin/localeData';
import "dayjs/locale/bg"

import {
    Articles,
    ChooseTherapist,
    Landing,
    Login,
    Logout,
    Questionnaire,
    Refereed,
    VideoCall
} from '@components/pages';

import "./index.css"
import { Users } from "@components/pages/users";
import { Upcoming } from "@components/pages/users/upcoming/upcoming";


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
        path: "/users/:id",
        element: <Users />
    },
    {
        path: "/users/:id/refereed",
        element: <Refereed />
    },
    {
        path: "/users/:id/upcoming",
        element: <Upcoming />
    },
    {
        path: "/video-call",
        // element: <SocketProvider><VideoCall /></SocketProvider>
        element: <VideoCall />
    }
]);

dayjs.extend(localeData)
dayjs.localeData()
dayjs.locale('bg')
dayjs.weekdays()

ReactDOM.createRoot((document.getElementById("root")) as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

