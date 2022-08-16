import React, { Component } from 'react'
import Image from 'next/image'
import Router, { withRouter } from 'next/router'
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import SearchFilters from '../components/searchFilters';
import Property from '../components/Property';
import NoResult from '../assets/images/noresult.svg'
import { baseUrl, config } from '../utils/fetchApi';
import axios from "axios";

export default withRouter(class search extends Component {
  constructor(props){
    super(props)
    this.state={
      searchFilters: true,
      properties: [],
      isLoading: true   
    }
  }

  componentDidMount(){
    this.getProperties()
  }

  getProperties = () => {
    const {query} = this.props.router
    const {asPath} = this.props.router
    
    const purpose = asPath.slice(16, 55) 
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';
  
    axios.request(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`, config)
    .then(resp => this.setState({properties: resp.data.hits, isLoading: false}))
  }

  handleClick = () => {
    this.setState((prevState)=>({searchFilters: !prevState.searchFilters}))
  }


  render() {
    const {searchFilters, properties, isLoading} = this.state
    const propertyType = this.props.router.query.purpose

    return (
      <Box>
        <Flex
          cursor="pointer"
          bg="gray.100"
          borderBottom="1px"
          borderColor="gray.200"
          p="2"
          fontWeight="black"
          fontSize="lg"
          justifyContent="center"
          alignItems="center"
          onClick={this.handleClick}
        >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
        </Flex>
        {searchFilters && <SearchFilters />}
        <Text fontSize="2xl" p="4" fontWeight="bold">
          Properties {propertyType}
        </Text>
        <Flex flexWrap="wrap">
          {properties.map((property) => <Property property={property} key={property.id} />)}
        </Flex>
        {properties.length === 0 && ( !isLoading ? 
          <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5" marginBottom="5">
            <Image alt="no result" src={NoResult}/>
            <Text fontSize="2xl" marginTop="3">No Results Found</Text>
          </Flex>
        : null)}
      </Box>
    )
  }
})
