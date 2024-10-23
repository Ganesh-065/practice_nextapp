// "use client";
// import { Box, Button, ButtonGroup } from "@mui/material";
// import Card, { SecondaryCard } from "./component/Card";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import * as React from "react";

// // Home component with data passed as props
// function Home() {
//   const [uData, setUData] = React.useState<
//     {
//       id: number;
//       name: string;
//       email: string;
//       username: string;
//       company: {
//         name: string;
//       };
//     }[]
//   >([]);

//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch data from the API
//         const res = await fetch("https://jsonplaceholder.typicode.com/users");
//         const userData = await res.json();
//         setUData(userData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setUData([]); // Handle error case by setting an empty array
//       }
//     };

//     fetchData();
//   }, []);

//   const buttons = [
//     <Button variant="contained" key="one">
//       Courses
//     </Button>,
//     <Button key="two" color="secondary">
//       Prompt places
//     </Button>,
//   ];

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column" }}>
//       <Box sx={{ display: "flex", flexDirection: "row" }}>
//         <Box
//           sx={{
//             height: "450px",
//             width: "650px",
//             display: "flex",
//             flexDirection: "row",
//             flexWrap: "wrap",
//             justifyContent: "space-between",
//             gap: 3,
//             p: 3,
//           }}
//         >
//           <Card />
//           <Card />
//           <Card />
//           <Card />
//         </Box>
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//           <SecondaryCard />
//           <SecondaryCard />
//         </Box>
//       </Box>

//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           "& > *": {
//             m: 1,
//           },
//         }}
//       >
//         <ButtonGroup
//           size="medium"
//           aria-label="Small button group"
//           sx={{ borderRadius: "40px" }}
//         >
//           {buttons}
//         </ButtonGroup>
//       </Box>

//       <TableContainer component={Paper} sx={{ width: 900 }}>
//         <Table sx={{ width: 900 }} aria-label="simple table">
//           <TableHead sx={{ backgroundColor: "cornflowerblue" }}>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Username</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Company</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {uData.map((user) => (
//               <TableRow
//                 key={user.id}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row">
//                   {user.name}
//                 </TableCell>
//                 <TableCell>{user.username}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.company.name}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

// export default Home;

"use client";
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Card, { SecondaryCard } from "./component/Card";
import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  company: {
    name: string;
  };
}

const Home: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const actionButtons = [
    <Button variant="contained" key="courses">
      Courses
    </Button>,
    <Button key="places" color="secondary">
      Prompt places
    </Button>,
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            height: "450px",
            width: "650px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 3,
            p: 3,
          }}
        >
          {[...Array(4)].map((_, index) => (
            <Card key={index} />
          ))}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <SecondaryCard />
          <SecondaryCard />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": { m: 1 },
        }}
      >
        <ButtonGroup
          size="medium"
          aria-label="button group"
          sx={{ borderRadius: "40px" }}
        >
          {actionButtons}
        </ButtonGroup>
      </Box>

      <TableContainer component={Paper} sx={{ width: 900 }}>
        <Table sx={{ width: 900 }} aria-label="users table">
          <TableHead sx={{ backgroundColor: "cornflowerblue" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.company.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Home;
