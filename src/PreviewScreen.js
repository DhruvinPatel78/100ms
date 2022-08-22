import React, { useState } from "react";
const PreviewScreen = (props) => {
  const [userName, setUserName] = useState("");
  // const [role, setRole] = useState("");
  // const roles = [
  //   {
  //     id: 1,
  //     role: "host",
  //   },
  //   {
  //     id: 2,
  //     role: "guest",
  //   },
  // ];
  console.log(
    " userName.includes('host')",
    userName.toLowerCase().includes("host")
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    let role = "";
    if (userName) {
      const checkRole = userName.toLowerCase().includes("host");
      if (checkRole) {
        role = "host";
      } else {
        role = "guest";
      }
      props.submitHandler(userName, role);
    }
    // userName.includes('host')
    // props.submitHandler(userName, role);
  };
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, width: "100%" }}>
      <h2> Join Room</h2>
      {/*<div className="input-container">*/}
      {/*  <select*/}
      {/*    value={role}*/}
      {/*    onChange={(e) => setRole(e.target.value)}*/}
      {/*    id="userName"*/}
      {/*    name="userName"*/}
      {/*    placeholder="select roles"*/}
      {/*  >*/}
      {/*    <option value={""}>select Roles</option>*/}
      {/*    {roles.map((item) => {*/}
      {/*      return (*/}
      {/*        <option value={item.role} key={item.id}>*/}
      {/*          {item.role}*/}
      {/*        </option>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </select>*/}
      {/*</div>*/}
      <div className="input-container">
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          id="userName"
          type="text"
          name="userName"
          placeholder="Enter your UserName"
          style={{ padding: "10px" }}
        />
      </div>
      <button className="btn-primary">Submit</button>
    </form>
  );
};
export default PreviewScreen;
