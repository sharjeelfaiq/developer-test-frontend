import React from "react";

const showData = ({ name, email, date }) => {
  return (
    <>
      <p style={{width:"500px"}}>
        Name: {name}
        <br />
        Email: {email}
        <br />
        Date: {date}
      </p>
    </>
  );
};

export default showData;
