import PageSub from "../components/PageSub";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import ButtonForm from "../components/ButtonForm";
import { AuthContext } from "../context/auth.context";
import ButtonIcon from "../components/ButtonIcon";
import BlurColorHighlight from "../components/BlurColorHighlight";
import ButtonSave from "../components/ButtonSave";
import Logo from "../../public/logo-animation.json";
import Lottie from "lottie-react";

import "./Account.css";

export default function AccountPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    const enteredEmail = e.target.value;
    setError("");
    setEmail(enteredEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(enteredEmail)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      setMessage("");
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError("");
    setMessage("");
  };
  const handleCheckPassword = (e) => {
    setCheckPassword(e.target.value);
    setError("");
    setMessage("");
  };
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setError("");
    setMessage("");
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const userInfo = await axios.get("http://localhost:5005/api/users", {
          headers: { Authorization: ` ${token}` },
        });
        console.log(userInfo.data[0].firstName);
        setFirstName(userInfo.data[0].firstName);
        setEmail(userInfo.data[0].email);
      } catch (err) {
        console.error(err);
      }
    };
    getInfo();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiEndPoint = "http://localhost:5005/api/users";
      const response = await axios.delete(apiEndPoint, {
        headers: { Authorization: ` ${token}` },
      });

      if (response.status === 200) {
        console.log("User deleted successfully");
        logOutUser();
        navigate("/");
      } else {
        setError("Failed to delete user");
      }
    } catch (error) {
      setError("Error deleting user");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInfo = {
      firstName,
      email,
      password,
      checkPassword,
    };
    const apiEndpoint = "http://localhost:5005/api/users";
    try {
      const token = localStorage.getItem("token");

      if ((password && !checkPassword) || (checkPassword && !password)) {
        setError("Oops!\nPlease confirm your new password.");
        return;
      }
      if (password && password !== checkPassword) {
        setError("Oops!\nThe passwords are not matching.");
        return;
      }

      const response = await axios.put(apiEndpoint, userInfo, {
        headers: { authorization: `${token}` },
      });
      setMessage("Success!\nYou updated your account.");
      console.log(response.data);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div>
        <BlurColorHighlight
          position={{ top: "2%", left: "1%" }}
          size="200px"
          filter="blur(50px)"
          zIndex="-1"
        />
      </div>
      <div className="logo-animation-account">
        <Lottie animationData={Logo} />
      </div>
      <div className="account-title">
        <h1>My account</h1>
      </div>
      <div className="account-text">
        <p>You can change your credentials here:</p>
      </div>
      <div className="btn-logout-user">
        <ButtonIcon
          imgSrc="../../public/logout.svg"
          onClick={logOutUser}
          navigate="/"
        />
      </div>
      <div className="account-form">
        <Form>
          <InputField
            id="name-account"
            type="text"
            defaultValue={firstName}
            label="First Name"
            onChange={handleFirstName}
          />
          <InputField
            id="email-account"
            type="email"
            label="Email"
            onChange={handleEmail}
            defaultValue={email}
          />
          <InputField
            id="password-account"
            type="password"
            label="Password"
            onChange={handlePassword}
            defaultValue={"********"}
          />
          <InputField
            id="checkPassword-account"
            type="password"
            label="Please repeat your password"
            onChange={handleCheckPassword}
            defaultValue={""}
          />
          <ButtonSave onClick={handleSubmit} />
        </Form>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        {message && (
          <div className="success-message">
            <p>{message}</p>
          </div>
        )}
      </div>
      <div className="delete-user-wrap">
        <div className="btn-delete-user">
          <ButtonIcon
            onClick={handleDeleteUser}
            imgSrc="../../public/deleteRed.svg"
            label=" Delete account"
            navigate="/"
          />
        </div>
      </div>
      <PageSub />
    </>
  );
}
