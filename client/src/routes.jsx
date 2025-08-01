import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { element: <Home />, index: true },
      { element: <Login />, path: "login" },
      { element: <SignUp />, path: "signup" },
    ],
  },
]);
