import { useState } from "react";

import UserInfoContext from "./userinfo-context";

const UserInfoProvider = (props) => {
  const [userInfo, setUserInfo] = useState({});

  const saveInfoHandler = (values) => {
      setUserInfo(values);
  }

  const userContext = {
    info: userInfo,
    saveInfo: saveInfoHandler
  };

  return (
    <UserInfoContext.Provider value={userContext}>
      {props.children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
