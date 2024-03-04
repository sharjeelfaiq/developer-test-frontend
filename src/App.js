import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ShowData from "./showData";

const App = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [date, setDate] = React.useState("");
  const [data, setData] = React.useState([]);

  const handleChange = (e, inputType) => {
    try {
      if (inputType === "name") {
        setName(e.target.value);
      } else if (inputType === "email") {
        setEmail(e.target.value);
      } else if (inputType === "date") {
        setDate(e.target.value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.error(error);
    }
  });

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:8080/show-data");
      const data = await res.json();

      let infoArr = [];

      if (data) {
        data.forEach((info) => {
          infoArr.push(info);
        });
        setData(infoArr);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.warn(name, email, date);

      await fetch("http://localhost:8080/details", {
        method: "post",
        body: JSON.stringify({ name, email, date }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setName("");
      setEmail("");
      setDate("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        type="text"
        value={name}
        placeholder="Enter Name"
        onChange={(e) => handleChange(e, "name")}
      />
      <TextField
        type="email"
        value={email}
        placeholder="Enter Email"
        onChange={(e) => handleChange(e, "email")}
      />
      <TextField
        type="text"
        value={date}
        placeholder="Enter Date"
        onChange={(e) => handleChange(e, "date")}
      />
      <Stack spacing={2} direction="row">
        <Button variant="text" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
      {data.length > 0 && data.map(info => (
        <ShowData name={info.name} email={info.email} date={info.date} key={data.name} />
      ))}
    </Box>
  );
};

export default App;
