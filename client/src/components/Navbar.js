import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import logo from '../assets/images/logo1.jpg';
import guestAvatar from '../assets/images/user.icon.jpeg'; // Guest avatar image

function NavBar({ user, onSignOut }) {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://groceryshopping-list.netlify.app/">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Grocery Shopping-List Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Grocery Shopping-List</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={user && user.picture ? user.picture : guestAvatar} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user ? user.name : "User Name"}</span>
            <span className="block truncate text-sm font-medium">{user ? user.email : "name@example.com"}</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={onSignOut}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

export default NavBar;