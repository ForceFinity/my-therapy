# The frontend of MyTherapy.
I led the development of the frontend for MyTherapy, a mental health and therapy support platform submitted to the Bulgarian National IT Olympiad 2024. The project was awarded 5th place in the national rankings.
Built in React, the app interfaces directly with the custom [FastAPI backend](https://github.com/ForceFinity/my-therapy-api), offering a responsive and intuitive experience across devices.

The frontend emphasizes modularity and performance, with a clean component structure and efficient data handling via SWR. OAuth2 integration via Google and Firebase ensures secure authentication, while the UI enables seamless session booking, real-time communication, and calendar management.
## Features
- Authentication – OAuth2 with Google via `@react-oauth/google` and Firebase
- Call Sessions – Powered by `@stream-io/video-react-sdk` for video conferencing
- Therapist Discovery & Scheduling – Filterable therapist views, date pickers, and calendar-based booking
- Real-Time Updates – WebSocket-based messaging using `socket.io-client`
- Responsive Design – Built with `styled-components`, `react-responsiv`, and `Sass`

## Stack
Typescript, React 18, React Router v6, SWR, Axios, Styled Components, Stream SDK, Jest
