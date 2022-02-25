import React from "react";

const UserInfoContext = React.createContext({
  info: {},
  saveInfo: () => {}
});

export default UserInfoContext;
