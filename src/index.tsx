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
import { VideoCall } from "./pages/videoCall";
// import { SocketProvider } from "./pages/videoCall/socket";

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
        path: "/user/me/refereed",
        element: <Refereed />
    },
    {
        path: "/video-call",
        // element: <SocketProvider><VideoCall /></SocketProvider>
        element: <VideoCall />
    }
]);

ReactDOM.createRoot((document.getElementById("root")) as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

