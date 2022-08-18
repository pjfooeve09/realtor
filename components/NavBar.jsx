import React, { Component } from "react";
import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";

export default class NavBar extends Component {
  render() {
    return (
      <Flex p="2" borderBottom="1px" borderColor="gray.100">
        <Box fontSize="3xl" color="blue.400" fontWeight="bold">
          <Link href="/" paddingLeft="2">
            Realtor
          </Link>
        </Box>
        <Spacer />
        <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FcMenu />}
              variant="outline"
              color="red.400"
            />
            <MenuList>
              <a href="/">
                <MenuItem icon={<FcHome />}>Home</MenuItem>
              </a>
              <a href="/search">
                <MenuItem icon={<BsSearch />}>Search</MenuItem>
              </a>
              <a href="/search?purpose=for-sale">
                <MenuItem icon={<FcAbout />}>Properties for Sale</MenuItem>
              </a>
              <a href="/search?purpose=for-rent">
                <MenuItem icon={<FiKey />}>Properties for Rent</MenuItem>
              </a>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    );
  }
}
