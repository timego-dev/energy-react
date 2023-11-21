import React, { useEffect, useState } from "react";
import "./App.css";
import { ReactComponent as SunIcon } from "./assets/sun.svg";
import { ReactComponent as CloudIcon } from "./assets/cloud.svg";
import { ReactComponent as GridIcon } from "./assets/grid.svg";
import { ReactComponent as ArrowIcon } from "./assets/arrow.svg";
import { ReactComponent as CloseIcon } from "./assets/close.svg";

interface IData {
  date: string;
  time: string;
  time_short: string;
  batt_perc: string;
  batt: string;
  solar: string;
  home: string;
  grid: string;
  surplus: string;
  powerwall_connection_status: string;
}

const SERVER_API =
  process.env.SERVER_API || "http://2.233.121.120:1085/energy.php";

function App() {
  const [data, setData] = useState<IData>();

  const fetchData = () => {
    fetch(SERVER_API)
      .then((res: Response) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setInterval(() => {
      fetchData();
    }, 7000);
  }, []);

  return (
    <div className="app">
      {data ? (
        <>
          <span className="date">
            {data?.date} {data?.time_short}
          </span>
          {data?.powerwall_connection_status === "0" && (
            <>
              <span className="alert">DATA NOT AVAILABLE</span>
              <CloseIcon className="close" />
            </>
          )}
          {+data.solar > 1 && (
            <SunIcon className={`sun ${+data.solar > 2 && "sunny"}`} />
          )}
          {+data.solar < 2 && (
            <CloudIcon className={`cloud ${+data.solar < 1 && "cloudy"}`} />
          )}
          <ArrowIcon
            className={`grid-arrow ${+data.grid < 0 && "opposite"}`}
            strokeWidth={+data.grid * 100}
          />
          <ArrowIcon
            className={`battery-arrow ${+data.batt < 0 && "opposite"}`}
            strokeWidth={+data.batt}
          />
          <svg
            fill="#000000"
            height="800px"
            width="800px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 60"
            className="battery"
          >
            <g>
              <rect
                x="17"
                y={7 + 50 * (1 - +data.batt_perc / 100)}
                width="26"
                height={50 * (+data.batt_perc / 100)}
                fill="#000000"
              />
              <path d="M42.536,4H36V0H24v4h-6.536C15.554,4,14,5.554,14,7.464v49.072C14,58.446,15.554,60,17.464,60h25.071 C44.446,60,46,58.446,46,56.536V7.464C46,5.554,44.446,4,42.536,4z M44,56.536C44,57.344,43.343,58,42.536,58H17.464 C16.657,58,16,57.344,16,56.536V7.464C16,6.656,16.657,6,17.464,6H24h12h6.536C43.343,6,44,6.656,44,7.464V56.536z" />
              {+data.batt < 0 && (
                <path
                  fill="#ff0000"
                  d="M37,29h-3V17.108c0.013-0.26-0.069-0.515-0.236-0.72c-0.381-0.467-1.264-0.463-1.642,0.004 c-0.026,0.032-0.05,0.066-0.072,0.103L22.15,32.474c-0.191,0.309-0.2,0.696-0.023,1.013C22.303,33.804,22.637,34,23,34h4 l0.002,12.929h0.001c0.001,0.235,0.077,0.479,0.215,0.657C27.407,47.833,27.747,48,28.058,48c0.305,0,0.636-0.16,0.825-0.398 c0.04-0.05,0.074-0.103,0.104-0.159l8.899-16.979c0.163-0.31,0.151-0.682-0.03-0.981S37.35,29,37,29z"
                />
              )}
            </g>
          </svg>
          <GridIcon className="grid" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            x="0px"
            y="0px"
            className="home"
            fill={`rgb(${(255 * +data.home) / 3}, 0, 0)`}
          >
            <g>
              <path d="M8,35.305V57a1,1,0,0,0,1,1H57a1,1,0,0,0,1-1V38h1a1,1,0,0,0,.706-1.708L55.4,32H58a1,1,0,0,0,.707-1.707L42.652,14.238a1,1,0,0,0-.707-.293h-18a1,1,0,0,0-.707,1.707L27.586,20h-6.36a.99.99,0,0,0-.988.238L4.293,36.184,5.707,37.6ZM17,56V42h8V56Zm10,0V41a1,1,0,0,0-1-1H16a1,1,0,0,0-1,1V56H10V33.305L20.919,22.386,32,33.429V56Zm29,0H34V35.422l2.294,2.286A1,1,0,0,0,37,38H56Zm.58-20H37.414l-14-14H29v3h2V23.414l8.293,8.293A1,1,0,0,0,40,32h2v2h2V32h8.566ZM46.469,30,32.414,15.945h3.172L49.641,30Zm9.117,0H52.469L38.414,15.945h3.117Zm-26-14.055L43.641,30H40.414L26.359,15.945Z" />
              <path d="M59.294,26.708l1.412-1.416-15.055-15A1,1,0,0,0,44.945,10H36v2h8.532Z" />
              <path d="M39,52H51a1,1,0,0,0,1-1V43a1,1,0,0,0-1-1H39a1,1,0,0,0-1,1v8A1,1,0,0,0,39,52Zm11-2H46V44h4ZM40,44h4v6H40Z" />
              <rect x="19" y="48" width="2" height="2" />
              <path d="M8,62H21V60H8a2,2,0,0,1-2-2V50H4v8A4,4,0,0,0,8,62Z" />
              <rect x="23" y="60" width="2" height="2" />
              <rect x="32" y="10" width="2" height="2" />
            </g>
          </svg>
        </>
      ) : (
        <span className="loading">Loading...</span>
      )}
    </div>
  );
}

export default App;
