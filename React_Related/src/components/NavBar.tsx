import { HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import logo from "../assets/ITC_Logo.gif"; // import ITC Logo

const NavBar = () => {
  return (
    <HStack>
      <Image src={logo} /> {/*modify NavBar logo size: boxSize="100px"*/}
      <Text>NavBar</Text> {/* description for NavBar*/}
    </HStack>
  );
};

export default NavBar;
