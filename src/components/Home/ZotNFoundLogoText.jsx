import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { useState } from "react";
import logo from "../../assets/images/small_logo.png";
import instagram from "../../assets/logos/instagram.svg";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function ZotNFoundLogoText() {
  const [screenWidth, setScreenWidth] = useState(window.screen.width);

  window.onresize = () => {
    setScreenWidth(window.screen.width);
  };
  return (
    <Flex
      alignItems="center"
      w={{ base: "20%", md: "20%" }}
      className="med"
      minWidth={{ base: "125px", md: "315px" }}
    >
      <Image
        width={{ base: "50px", md: "100px" }}
        src={logo}
        mb="5%"
        mt="3%"
        ml="10%"
        display={screenWidth < 350 ? "None" : "inline"}
      />
      <Menu autoSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          size={{ base: "4xl", md: "4xl" }}
          ml="3%"
          fontSize={{ base: "xl", md: "4xl" }}
          background="white"
          justifyContent="center"
          alignItems="center"
          padding={2}
        >
          ZotNFound
        </MenuButton>

        {/* ZotnFound Logo/Text Dropdown */}
        <MenuList zIndex={10000}>
          <MenuItem
            alignItems={"center"}
            justifyContent={"center"}
            as={"a"}
            href="https://www.instagram.com/zotnfound/"
          >
            @ZotNFound
            <Image
              src={instagram}
              maxWidth="10%"
              maxHeight="10%"
              ml="5%"
            ></Image>
          </MenuItem>
          <MenuItem
            alignItems={"center"}
            justifyContent={"center"}
            as={"a"}
            href="/update"
          >
            News
          </MenuItem>
          <MenuItem
            alignItems={"center"}
            justifyContent={"center"}
            as={"a"}
            href="/about"
          >
            About
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
