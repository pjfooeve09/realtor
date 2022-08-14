import React, { Component } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

export default class Rental extends Component {
  render() {
    const rental = this.props.rental;
    return (
      <div>
        {rental.map((property) => (
          <div key={property.id}>
            <Link href={`/property/${property.externalId}`}>
              <Flex
                flexWrap="wrap"
                w="420px"
                h="420px"
                p="5"
                paddingTop="0"
                justifyContent="flex-start"
                cursor="pointer"
              >
                <Box>
                  <Image
                    src={
                      property.coverPhoto
                        ? property.coverPhoto.url
                        : property.defaultImage
                    }
                  />
                </Box>
              </Flex>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
