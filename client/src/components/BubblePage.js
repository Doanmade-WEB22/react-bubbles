import React, { useEffect, useState } from "react";
import { axize } from "../utils/axize";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axize()
      .get("http://localhost:5000/api/colors")
      .then(rez => {
        console.log("Color List", rez);
        setColorList(rez.data);
      })
      .catch(errs => console.log(errs.response));
  }, []);
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
