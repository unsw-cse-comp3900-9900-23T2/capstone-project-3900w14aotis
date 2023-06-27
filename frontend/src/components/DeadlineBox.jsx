import React from "react";

const DeadlineBox = ({ deadline }) => {
  const date = new Date(deadline);
  console.log(date);
  return <div>date</div>;
};
export default DeadlineBox;
