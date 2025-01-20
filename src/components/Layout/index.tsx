import React, { useEffect, useState } from "react";
import Header from "../Header";
import Drawer from "../Drawer";
import { Outlet, useNavigate } from "react-router-dom";
import { init } from "@noriginmedia/norigin-spatial-navigation";
import { LayoutStyled } from "./style";
import { useKeyboardEvents } from "../../contexts/keyboard-events";
import { useAppManager } from "../../contexts/app-manager";
import Info from "../Info";

function Layout(/*{ children }: { children: React.ReactNode }*/) {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const { register } = useKeyboardEvents("layout");
  const { destroy } = useAppManager();
  const navigate = useNavigate();

  useEffect(() => {
    register("back,backspace", () => {
      // TODO: only go back if previous url is in the scope of the /app

      navigate(-1);
    });
    register("red,r", () => {
      destroy();
    });
    register("yellow,y", () => {
      setShowInfo((prevShowInfo) => !prevShowInfo);
    });
  }, [register, navigate, destroy, showInfo]);

  init({
    // debug: true,
    // visualDebug: true,
    distanceCalculationMethod: "center",
    rtl: true,
  });

  return (
    <LayoutStyled>
      <Header />
      <Drawer focusKey="MENU" />
      <div id="content">
        <Outlet />
      </div>
      <Info visible={showInfo} />
    </LayoutStyled>
  );
}

export default Layout;
