import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../apis";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../redux";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const handleCredentialsChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = null;

    try {
      dispatch(showLoader());
      res = await loginUser(credentials);
      dispatch(hideLoader());
      if (res.success) {
        toast.success(res.message);
        window.localStorage.setItem("token", res.accessToken);
        window.location.href = "/";
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(res.message);
    }
  };

  return (
    <div className="container">
      <div className="container-back-img"></div>
      <div className="container-back-color"></div>
      <div className="card">
        <div className="card_title">
          <h1>Login Here</h1>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleCredentialsChange}
              value={credentials.email}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleCredentialsChange}
              value={credentials.password}
            />
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="card_terms">
          <span>
            Don't have an account yet?
            <Link to={"/signup"}>Signup Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
