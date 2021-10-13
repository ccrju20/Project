import { React, useContext } from "react";
import UserInfoContext from "../store/userinfo-context";

const Confirmation = () => {
  const userCtx = useContext(UserInfoContext);
  console.log(userCtx.info.email);

  return (
    <div>
      <h2>Thank you for your purchase!</h2>
      <p>{userCtx.info.firstname}</p>
      <p>{userCtx.info.lastname}</p>
      <p>{userCtx.info.email}</p>
      <p>{userCtx.info.phone}</p>
      <p>{userCtx.info.address}</p>
      <p>{userCtx.info.city}</p>
      <p>{userCtx.info.state}</p>
      <p>{userCtx.info.postal}</p>
    </div>
  );
};

export default Confirmation;
