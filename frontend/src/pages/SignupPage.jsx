import axios from "axios";
import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import PageLanding from "../components/PageLanding";
import InputField from "../components/InputField";
import ButtonForm from "../components/ButtonForm";
import "./SignupPage.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import BlurColorHighlight from "../components/BlurColorHighlight";
import Logo from "../../public/logo-animation.json";
import Lottie from "lottie-react";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const apiEndpoint = "http://localhost:5005/auth/signup";
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleCheckPassword = (e) => setCheckPassword(e.target.value);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      firstName,
      email,
      password,
      checkPassword,
    };

    try {
      const response = await axios.post(apiEndpoint, newUser)
      setFirstName("");
        setEmail("");
        setPassword("");
        setCheckPassword("");
        storeToken(response.data.token);
        authenticateUser();
        // navigate("/inner-support");;
    } catch (err) {setError(err.response.data);}
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
      <div className="signup-h1">
        <h1>Sign up to start your journey</h1>
      </div>
      <div className="logo-animation-circle">
        <Lottie animationData={Logo} />
      </div>
      <div className="signup-form">
        <Form>
          <InputField
            id="firstName"
            type="text"
            value={firstName}
            label="First name"
            onChange={handleFirstName}
          />
          <InputField
            id="email"
            type="email"
            value={email}
            label="Email"
            onChange={handleEmail}
          />
          <InputField
            id="password"
            type="password"
            value={password}
            label="Password"
            onChange={handlePassword}
          />
          <InputField
            id="checkPassword"
            type="password"
            value={checkPassword}
            label="Repeat your password"
            onChange={handleCheckPassword}
          />
          <div className="signup-button-wrap">
            <ButtonForm
              label="Sign Up "
              classCss={"btn-form btn-primary"}
              onClick={handleSubmit}
            />
          </div>
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
        </Form>
      </div>
      <div className="login-link">
        <p>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </>
  );
}
