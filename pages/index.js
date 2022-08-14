import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Text, Box, Button, Flex} from '@chakra-ui/react'
import axios from "axios";
import { baseUrl, config } from '../utils/fetchApi';
import Banner from '../components/Banner';
import Rental from '../components/Rental';
import Sale from '../components/Sale';

export default class index extends Component {
  constructor (props){
    super(props);
    this.state={
      rentalProperties: [],
      saleProperties: []
    };
  }
  
  componentDidMount(){
    this.getrentalProperties();
    this.getsaleProperties()
  }

  getrentalProperties = () => {
    axios.request(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`, config)
      .then(resp => this.setState({rentalProperties: resp.data.hits}))
  }

  getsaleProperties(){
    axios.request(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`, config)
      .then(resp => this.setState({saleProperties: resp.data.hits}))
  }

  banner = (purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl) => {
    return(
      <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
      <Image src={imageUrl} width={450} height={250} />
      <Box p='8'>
        <Text color='gray.480' fontSize='sm' fontWeight='medium'>{purpose}</Text>
        <Text fontSize='3xl' fontWeight='bold'>{title1}<br />{title2}</Text>
        <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.600'>{desc1}<br />{desc2}</Text>
        <Button fontSize='xl'>
          <Link href={linkName}>{buttonText}</Link>
        </Button>
      </Box>
    </Flex>
    )
  };

  render() {
    const {rentalProperties} = this.state
    const {saleProperties} = this.state
    return (
      <Box>
        <Banner purpose={this.banner('RENT A PROPERTY', 'Rental Homes for', 'Everyone', 'Explore Homes, Condos, Villas, lands', 'and much more', 'See All Properties', '/search?purpose=for-rent', 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4')}/>
          <Flex flexWrap="wrap">
            <Rental rental={rentalProperties}/>
          </Flex>
        <Banner purpose={this.banner('OWN A PROPERTY', 'Own Your', 'Dream House', 'Explore Homes, Condos, Villas, lands', 'and more', 'See All Properties', '/search?purpose=for-sale', 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008')}/>
          <Flex flexWrap="wrap">
            <Sale sale={saleProperties} />
          </Flex>
      </Box>
    )
  }
}
