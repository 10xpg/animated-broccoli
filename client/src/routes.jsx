import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import { ProtectRoute } from "./components/security";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: (
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        ),
        index: true,
      },
      { element: <Login />, path: "login" },
      { element: <SignUp />, path: "signup" },
    ],
  },
]);
