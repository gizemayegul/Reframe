import axios from "axios";
import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import ButtonForm from "../components/ButtonForm";
import PageLanding from "../components/PageLanding";
import { AuthContext } from "../context/auth.context";
import "./LoginPage.css";
import BlurColorHighlight from "../components/BlurColorHighlight";
import Logo from "../../public/logo-animation.json";
import Lottie from "lottie-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const apiEndpoint = "http://localhost:5005/auth/login";
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(enteredEmail)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginUserPayload = {
      email,
      password,
    };

    try {
      const response = await axios.post(apiEndpoint, loginUserPayload);
      setEmail("");
      setPassword("");
      storeToken(response.data.token);
      authenticateUser();
      navigate("/today");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <PageLanding />
      <BlurColorHighlight
        position={{ top: "5%", left: "-10%" }}
        size="200px"
        filter="blur(40px)"
        zIndex="-1"
      />
      <div className="login-h1">
        <h1>Log into your journey</h1>
      </div>
      <div className="logo-animation-circle">
        <Lottie animationData={Logo} />
      </div>
      <div className="login-form">
        <Form onSubmit={handleSubmit}>
          <InputField
            id="email-login"
            type="email"
            value={email}
            label="Email"
            onChange={handleEmail}
          />
          <InputField
            id="password-login"
            type="password"
            value={password}
            label="Password"
            onChange={handlePassword}
          />
          <div className="login-button-wrap">
            <ButtonForm
              label="Log In "
              classCss={"btn-grey custom-button"}
              onClick={handleSubmit}
            />
          </div>
        </Form>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>
      <div className="signup-link">
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </>
  );
}
