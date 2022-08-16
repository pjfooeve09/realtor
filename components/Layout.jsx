import Head from "next/head";
import { Box } from "@chakra-ui/react";
import React, { Component } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default class Layout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const children = this.props.children;
    return (
      <>
        <Head>
          <title>Real Estate</title>
        </Head>
        <Box maxWidth="1280px" m="auto">
          <header>
            <NavBar />
          </header>
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
        </Box>
      </>
    );
  }
}
