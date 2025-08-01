import { useState } from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import { signupUser } from "../../apis";
import toast from "react-hot-toast";

export default function SignUp() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = null;

    try {
      res = await signupUser(user);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(res.message);
    }
  };

  return (
    <div className="container">
      <div className="container-back-img"></div>
      <div className="container-back-color"></div>
      <div className="card">
        <div className="card_title">
          <h1>Create Account</h1>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="column">
              <input
                type="text"
                placeholder="First Name"
                name="firstname"
                value={user.firstname}
                onChange={handleUserChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                value={user.lastname}
                onChange={handleUserChange}
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleUserChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleUserChange}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="card_terms">
          <span>
            Already have an account?
            <Link to={"/login"}>Login Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
