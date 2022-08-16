import React, { Component } from "react";
import { Box } from "@chakra-ui/react";
import { FaGratipay } from "react-icons/fa";

export default class Footer extends Component {
  render() {
    return (
      <Box
        textAlign="center"
        p="5"
        color="gray.600"
        borderTop="1px"
        borderColor="gray.100"
      >
        © 2021 Realtor, Inc.
      </Box>
    );
  }
}
