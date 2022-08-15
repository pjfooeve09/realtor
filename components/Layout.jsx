import Head from "next/head";
import { Box } from "@chakra-ui/react";
import React, { Component } from "react";

export default class Layout extends Component {
  render() {
    const children = this.props.children;
    return (
      <>
        <Head>
          <title>Realtor</title>
        </Head>
        <Box maxWidth="1280px" m="auto">
          <main>{children}</main>
        </Box>
      </>
    );
  }
}
