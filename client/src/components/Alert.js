import React from "react";
import "../assets/css/Alert.css";
import { useAppContext } from "../context/appContext";
const Alert = () => {
  const { alertType, alertText } = useAppContext();
  console.log(alertText, alertType);
  return <div className={`alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
