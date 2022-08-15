import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Text, Box, Button, Flex} from '@chakra-ui/react'
import axios from "axios";
import { baseUrl, config } from '../utils/fetchApi';
import RentalBanner from '../components/RentalBanner';
import SaleBanner from '../components/SaleBanner';
import Property from '../components/Property';

export default class index extends Component {
  constructor (props){
    super(props);
    this.state={
      rentalProperties: [],
      saleProperties: [], 
      isLoading: true   
    };
  }
  
  componentDidMount(){
    this.getRentalProperties();
    this.getSaleProperties()
  }

  getRentalProperties = () => {
    axios.request(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`, config)
      .then(resp => this.setState({rentalProperties: resp.data.hits, isLoading: false}))
  }

  getSaleProperties(){
    axios.request(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`, config)
      .then(resp => this.setState({saleProperties: resp.data.hits}))
  }

  render() {
    const {rentalProperties, saleProperties, isLoading} = this.state
    
    return (
      <Box>
        {!isLoading ? <RentalBanner /> : null}
        <Flex flexWrap='wrap'>
          {rentalProperties.map((property) => <Property property={property} key={property.id} />)}
        </Flex>
        {!isLoading ? <SaleBanner /> : null}
        <Flex flexWrap='wrap'>
          {saleProperties.map((property) => <Property property={property} key={property.id} />)}
        </Flex>
      </Box>
    )
  }
}
