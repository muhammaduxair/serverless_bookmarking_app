import React from "react";

const NotFound = () => {
  React.useEffect(() => {
    window.location.replace(window.location.origin);
  }, []);

  return <div></div>;
};
export default NotFound;
