import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import axios from "axios";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from "styled-components";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

// import { InfoButton } from "./ViewModal";
import { useHistory } from "react-router-dom";
import { UserState } from "../context/UserProvider";
import { InfoButton } from "./ShowModal";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1.5rem;
`;

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "email",
    label: "E-mail",
    minWidth: 100,
  },
  {
    id: "contact",
    label: "Contact",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "product",
    label: "Product Name",
    minWidth: 120,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 50,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "description",
    label: "Product Info",
    minWidth: 160,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 60,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 60,
  },
];
// for the pagination Part !

const useStyles = makeStyles({
  root: {
    width: "97%",
    maxHeight: "100vh",
    margin: "1rem",
    backgroundColor: "#faeee7",
  },
  head: {},
  container: {
    maxHeight: 440,
  },
});
export default function ProductsTable({ products }) {
  const classes = useStyles();
  const history = useHistory();
  const { user } = UserState();
//   const [products, setProducts] = useState();
//   useEffect(() => {
//     fetchProducts();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [history]);
//   const fetchProducts = async () => {
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.get(
//         `https://product-enquiry.herokuapp.com/product-enquiry/`,
//         config
//       );
//       setProducts(data);
//     } catch (error) {
//       if (error) console.log(error.message);
//       return;
//     }
//   };
  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(
        `https://product-enquiry.herokuapp.com/product-enquiry/${id}`,
        config
      );
      history.push("/");
    } catch (error) {
      if (error) console.log(error.message);
      return;
    }
  };
  return (
    <Paper className={classes.root}>
      <TableContainer
        className={classes.container}
        style={{ maxHeight: "100vh" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    backgroundColor: "#f3d3c0",
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align={"left"}>{row.name}</TableCell>
                  <TableCell align={"left"}>{row.email}</TableCell>
                  <TableCell align={"left"}>{row.contact}</TableCell>
                  <TableCell align={"left"}>{row.productName}</TableCell>
                  <TableCell align={"left"}>{row.productQuantity}</TableCell>
                  <TableCell align={"left"}>{row.productDescription}</TableCell>
                  <TableCell align={"left"}>{row.status}</TableCell>
                  <TableCell align={"right"}>
                    <ButtonWrapper>
                      <InfoButton info={row}></InfoButton>
                      <DeleteForeverIcon
                        style={{
                          color: "red",
                          fontSize: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleDelete(row._id);
                        }}
                      />
                    </ButtonWrapper>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
