import Head from "next/head";
import { Box } from "@chakra-ui/react";
import React, { Component } from "react";
// import NavBar from "./NavBar";

export default class Layout extends Component {
  render() {
    const children = this.props.children;
    return (
      <>
        <Head>
          <title>Realtor</title>
        </Head>
        <Box maxWidth="1280px" m="auto">
          <header>{/* <NavBar /> */}</header>
          <main>{children}</main>
        </Box>
      </>
    );
  }
}
