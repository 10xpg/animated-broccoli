import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "./components/ui";
import { useSelector } from "react-redux";

function App() {
  const { loader } = useSelector((state) => state.loaderReducer);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {loader && <Loader />}
      <Outlet />
    </div>
  );
}

export default App;
