import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Modal from 'react-modal';
import * as dayjs from "dayjs";
import localeData from 'dayjs/plugin/localeData';
import "dayjs/locale/bg"

import {
    Articles,
    ChooseTherapist,
    Landing,
    Login,
    Questionnaire,
    Refereed,
    Users,
    Sessions
} from '@components/pages';

import "./index.css"
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
        path: "/sessions/:id",
        element: <Sessions />
    }
]);

dayjs.extend(localeData)
dayjs.localeData()
dayjs.locale('bg')
dayjs.weekdays()

Modal.setAppElement("#root")

ReactDOM.createRoot((document.getElementById("root")) as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

