import React, { Component } from "react";
import Link from "next/link";
import { Text, Box, Button, Flex } from "@chakra-ui/react";

export default class Sale extends Component {
  render() {
    const sale = this.props.sale;
    return (
      <div>
        {sale.map((sale) => (
          <div key={sale.id}>
            <Link href={`/property/${sale.externalId}`}>
              <Flex flexWrap="wrap"></Flex>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
