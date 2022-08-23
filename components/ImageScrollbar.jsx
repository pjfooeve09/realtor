import { useContext } from "react";
import Image from "next/image";
import { Box, Icon, Flex } from "@chakra-ui/react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export default function ImageSrollbar({ data }) {
  return (
    <ScrollMenu style={{ overflow: "hidden" }}>
      {data.map((item) => (
        <Box
          width="915px"
          // itemId={item.id}
          key={item.id}
          overflow="hidden"
          p="1"
        >
          <Image
            placeholder="blur"
            blurDataURL={item.url}
            src={item.url}
            width={1000}
            height={500}
            sizes="(max-width: 450px) 100px, (max-width: 1020px) 400px, 900px"
          />
        </Box>
      ))}
    </ScrollMenu>
  );
}
