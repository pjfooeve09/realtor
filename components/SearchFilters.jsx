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
import { withRouter } from "next/router";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import { filterData, getFilterValues } from "../utils/filterData";
import { createBrowserHistory } from "history";

class searchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: filterData,
    };
  }

  handleChange = (filterValues) => {
    localStorage.setItem("CCC", JSON.stringify(filterValues));
    const path = this.props.params.pathname;
    const { query } = this.props.params;
    const values = getFilterValues(filterValues);
    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
        console.log(item);
      }
    });
    this.props.params.push({ pathname: path, query: query });
  };

  componentDidUpdate(prevProps) {
    // const filterValues = JSON.parse(localStorage.getItem("CCC"));
    // if (prevProps.params !== this.props.params) {
    //   const path = this.props.params.pathname;
    //   const { query } = this.props.params;
    //   const values = getFilterValues(filterValues);
    //   values.forEach((item) => {
    //     if (item.value && filterValues?.[item.name]) {
    //       query[item.name] = item.value;
    //     }
    //   });
    //   this.props.params.push({ pathname: path, query: query });
    // }
  }

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
              onChange={(e) =>
                this.handleChange({ [filter.queryName]: e.target.value })
              }
            >
              {filter.items.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
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
