import React, { Component } from "react";
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import { filterData, getFilterValues } from "../utils/filterData";

class searchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: filterData,
    };
  }

  filterProperties = (filterValues) => {
    //3. because we are using useFilter, we can now access the params in the URL
    const { params } = this.props;
    const { query } = this.props.params; //5. where this.params.query come from? when we have anything after the question mark in search (search?), it will assign a query; for ex: when we have "search?purpose=for-rent", if we console.log this.params.query, we will get query: {purpose: for-rent}
    const { pathname } = this.props.params; //4. this return "/search"
    const values = getFilterValues(filterValues); //6. console.log just filterValues returns what we defined in #1 below which is "purpose: for-rent". Now, console.log(getFilterValues(filterValues)) will destruct "purpose" and returns the attributes "name" and "value". Take a look at geFilterValues function in filterData.js
    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        //7. this is where we assign each attribute to the query array. It will not be updated in the url unless we push them to the params below
        query[item.name] = item.value; //[item.name] is the string "purpose" in filterData.js and item.value is the value of purpose, which is "for rent". It will return purpose: 'for-rent' and assign it to the query
      }
    });
    params.push({ pathname: pathname, query: query }); //this is where we see the url gets updated to show the path and the query
  };

  render() {
    const { filters } = this.state;
    return (
      <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
        {filters.map((filter) => (
          <Box key={filter.queryName}>
            <Select
              placeholder={filter.placeholder}
              w="fit-content"
              p="2"
              onChange={
                (e) =>
                  this.filterProperties({ [filter.queryName]: e.target.value }) //1. this would return for ex: "purpose: for-rent"
              }
            >
              {filter?.items?.map(
                (
                  item //2. this returns the actual values in options
                ) => (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                )
              )}
            </Select>
          </Box>
        ))}
      </Flex>
    );
  }
}

const withParams = (Component) => {
  return (props) => <Component {...props} params={useRouter()} />;
};

export default withParams(searchFilters);
