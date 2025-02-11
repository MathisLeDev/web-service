import React, {useEffect} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Home from "../Home/Home";

type Props = {
  isAuthenticated: boolean;
}

const Root = (props: Props) => {
  const { isAuthenticated } = props;
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    if (!isAuthenticated && location !== "/login") {
      navigate("/login");
    }
    setIsLoading(false);
  }, [isAuthenticated]);

  return (
    <div className={"flex-1"}>
      {!isLoading && location !== "/" ? <Outlet /> : <Home />}
      </div>
  );
};

export default Root;
