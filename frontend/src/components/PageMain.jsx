import "./PageMain.css";
import NavBar from "./NavBar";
import Avatar from "./Avatar";
import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND = import.meta.env.VITE_SERVER_URL;

export default function PageMain(props) {
  const [error, setError] = useState(null);
  const [avatarName, setAvatarName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${BACKEND}/api/users`, {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        setAvatarName(response.data[0].firstName);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []);

  if (!avatarName) {
    return null;
  }

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        margin: "0",
        padding: "0",
        // height: "100vh",
        // width: "100vw",
      }}
      className="page-main-container"
    >
      <div
        className="background-grey"
        style={{
          position: "fixed",
          top: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#F1F2E9",
          zIndex: "-2",
        }}
      ></div>

      <div
        className="Avatar-wrapper"
        style={{
          zIndex: "1",
          position: "fixed",
          top: "2.5em",
          right: "1.5em",
          height: "0",
          margin: "0",
        }}
      >
        <Avatar name={avatarName} scale="0.23" />
      </div>

      <div style={{ position: "relative" }}>{/* {props.children} */}</div>

      <div
        style={{
          position: "fixed",
          bottom: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          minWidth: "235px",
        }}
      >
        <NavBar />
      </div>
    </div>
  );
}
