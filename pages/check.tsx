import { red } from "@mui/material/colors";
import { url } from "inspector";
import sliderImage from "../images/slider1.jpeg";

export default function Check() {
  return (
    <>
      {/* <div className="bg-local ..." style={{
            // backgroundImage: url("./image.png"),
            // backgroundImage:url('/images/')
        }}> */}
      {/* section content */}
      <section
        className="bg-cover bg-center h-screen"
        style={{
          backgroundImage: `url("slider1.jpeg")`,
        }}
      >  
        <p>We are IT Service Agency ~</p>
        <h1>Think Biq We Make It Possible!</h1>
        <p>We place you at the center of international Networks to advance your strategic intersts</p>
        
      </section>
      {/* </div> */}
    </>
  );
}
