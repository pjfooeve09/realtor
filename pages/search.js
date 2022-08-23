import React, { Component } from 'react'
import Image from 'next/image'
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import SearchFilters from '../components/searchFilters';
import Property from '../components/Property';
import NoResult from '../assets/images/noresult.svg'
import { baseUrl, config } from '../utils/fetchApi';
import axios from "axios";
import { useRouter } from "next/router";

class Search extends Component {
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

  componentDidUpdate(prevProps){
    if(prevProps.params !== this.props.params){
      this.getProperties()
    }
  }

  getProperties = () => {
    const {query} = this.props.params
    const {asPath} = this.props.params
    const purpose = asPath.slice(16, 55) || 'for-sale'
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '2000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';
  
    axios.request(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`, config)
    .then(resp => this.setState({properties: resp.data.hits, isLoading: false}))
  }

  filterSearch = () => {
    this.setState((prevState)=>({searchFilters: !prevState.searchFilters}))
  }

  render() {
    const {searchFilters, properties, isLoading} = this.state
    const propertyType = this.props.params.query.purpose

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
          onClick={this.filterSearch}
        >
          <Text>Search Property By Filters</Text>
          <Icon paddingLeft="2" w="7" as={BsFilter} />
        </Flex>
        {searchFilters && <SearchFilters/>}
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
}

const withParams = (Component) => {
  return (props) => <Component {...props} params={useRouter()} />;
};

export default withParams(Search);
