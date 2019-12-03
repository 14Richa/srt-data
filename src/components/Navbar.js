import React from "react";
import { Nav, NavItem, NavLink } from "shards-react";

export default function NavExample() {
  return (
    <Nav>
      <NavItem>
        <NavLink href="/">
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/about">About</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/data">Data</NavLink>
      </NavItem>
      
    </Nav>
  );
}
