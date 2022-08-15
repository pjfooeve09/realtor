import React, { Component } from "react";
import { Text, Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

export default class RentalBanner extends Component {
  banner = (
    purpose,
    title1,
    title2,
    desc1,
    desc2,
    buttonText,
    linkName,
    imageUrl
  ) => {
    return (
      <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
        <Image src={imageUrl} width={450} height={250} />
        <Box p="8">
          <Text color="gray.480" fontSize="sm" fontWeight="medium">
            {purpose}
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            {title1}
            <br />
            {title2}
          </Text>
          <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.600">
            {desc1}
            <br />
            {desc2}
          </Text>
          <Button fontSize="xl">
            <Link href={linkName}>{buttonText}</Link>
          </Button>
        </Box>
      </Flex>
    );
  };
  render() {
    return (
      <div>
        {this.banner(
          "RENT A PROPERTY",
          "Rental Homes for",
          "Everyone",
          "Explore Homes, Condos, Villas, lands",
          "and much more",
          "See All Properties",
          "/search?purpose=for-rent",
          "https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
        )}
      </div>
    );
  }
}
