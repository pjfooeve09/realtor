import React, { Component } from 'react'
import Image from 'next/image'
import { withRouter } from 'next/router'
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';

export default withRouter(class search extends Component {
  constructor(props){
    super(props)
    this.state={
      searchFilters: false
    }
  }
  render() {
    return (
      <Box>
        <Flex
          cursor="pointer"
          bg="gray.100"
        >

        </Flex>
      </Box>
    )
  }
})

