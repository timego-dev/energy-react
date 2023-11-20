import React, { useEffect, useState } from "react";
import "./App.css";
import { ReactComponent as HomeIcon } from "./assets/home.svg";
import { ReactComponent as SunIcon } from "./assets/sun.svg";
import { ReactComponent as CloudIcon } from "./assets/cloud.svg";
import { ReactComponent as BatteryIcon } from "./assets/battery.svg";
import { ReactComponent as GridIcon } from "./assets/grid.svg";
import { ReactComponent as ArrowIcon } from "./assets/arrow.svg";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://localhost:3200/energy.php")
      .then((res: Response) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="app">
      <SunIcon className="sun" />
        <ArrowIcon className="grid-arrow" />
        <ArrowIcon className="battery-arrow" />
      <CloudIcon className="cloud" />
      <BatteryIcon className="battery" />
      <GridIcon className="grid" />
      <HomeIcon className="home" />
    </div>
  );
}

export default App;
