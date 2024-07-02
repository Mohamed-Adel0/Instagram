import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home.jsx";
import InfoMessages from "../Components/InfoMessage/InfoMessages.jsx";
import ChangeChat from "../Components/InfoMessage/ChangeChat.jsx";
import ViewChat from "../Components/InfoMessage/ViewChat.jsx";
import Profiles from "../Components/Profiles/Profiles.jsx";
import Login from "../Components/Login&Register/Login.jsx";
import Register from "../Components/Login&Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import EditProfile from "../Components/Profiles/EditProfile.jsx";
import CreateProfile from "../Components/Profiles/CreateProfile.jsx";
import SingalProfile from "../Components/Profiles/SingalProfile.jsx";
export const Routing = createBrowserRouter([
  { index: true, element: <ProtectedRoute><Home/></ProtectedRoute> }, //Hna 3mlt Secourity ly Page Home we 3'era mn 5lal ProtectedRoute
  {
    path: "/message",
    element: <ProtectedRoute><InfoMessages /></ProtectedRoute>,
    children: [{ path: "/message", element:  <ProtectedRoute><ChangeChat /></ProtectedRoute>}],
  },
  {
    path: "/message",
    element: <ProtectedRoute>< InfoMessages/></ProtectedRoute>  ,
    children: [{ path: "/message/:id", element: <ProtectedRoute>< ViewChat/></ProtectedRoute>  }],
  },
  { path: "/profile/:id", element: <ProtectedRoute>< Profiles /></ProtectedRoute>  },
  { path: "/messag/:id", element: <ProtectedRoute>< ViewChat /></ProtectedRoute>  },
  { path: "/:id", element: <ProtectedRoute>< SingalProfile /></ProtectedRoute>  },
  { path: "/:id/edit", element: <ProtectedRoute>< EditProfile /></ProtectedRoute>  },
  { path: "/:id/createprofile", element: <ProtectedRoute>< CreateProfile /></ProtectedRoute>  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/",
    element: (
        <ProtectedRoute>
            <Home />
        </ProtectedRoute>
    ),
},
]);
