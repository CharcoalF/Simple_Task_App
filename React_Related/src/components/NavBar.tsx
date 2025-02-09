import { HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import logo from "../assets/ITC_Logo.gif"; // import ITC Logo
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" padding="10px">
      {" "}
      {/*Change switcher's position to right side but also keep padding so that it's not on the right boundary*/}
      <Image src={logo} /> {/*modify NavBar logo size: boxSize="100px"*/}
      {/*<Text>NavBar</Text>*/} {/* description for NavBar*/}
      <ColorModeSwitch /> {/*Switcher: dark/light mode*/}
    </HStack>
  );
};

export default NavBar;
