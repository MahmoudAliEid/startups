import React from "react";

const Heading = ({
  textLeft,
  textRight,
}: {
  textLeft: string;
  textRight?: string;
}) => {
  return (
    <h1 className="heading">
      {textLeft} <br /> {textRight}
    </h1>
  );
};

export default Heading;
