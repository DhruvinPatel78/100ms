import React, { useState } from "react";
const PreviewScreen = (props) => {
  const [userName, setUserName] = useState("");
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
  };
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, width: "100%" }}>
      <h2> Join Room</h2>
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
