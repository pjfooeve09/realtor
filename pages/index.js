import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Text, Box, Button, Flex} from '@chakra-ui/react'
import axios from "axios";
import { baseUrl, config } from '../utils/fetchApi';
import RentalBanner from '../components/RentalBanner';
import SaleBanner from '../components/SaleBanner';
import RentalProperties from '../components/RentalProperties';
import SaleProperties from '../components/SaleProperties';

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
    const {rentalProperties} = this.state
    const {saleProperties} = this.state
    const {isLoading} = this.state
    
    return (
      <Box>
        {!isLoading ? <RentalBanner /> : null}
        <RentalProperties rental={rentalProperties}/>
        {!isLoading ? <SaleBanner /> : null}
        <SaleProperties sale={saleProperties} />
      </Box>
    )
  }
}
