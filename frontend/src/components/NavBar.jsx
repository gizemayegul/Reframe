import React from "react";
import { Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <Nav variant="underline">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/timeline">
          <p style={{ margin: "0" }} className="h8">
            Memories
          </p>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/today">
          <p style={{ margin: "0" }} className="h8">
            Today
          </p>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/inner-support">
          <p style={{ margin: "0" }} className="h8">
            Insights
          </p>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;
