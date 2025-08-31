import Banner from "./Components/Banner";
import ImageWithText from "./Components/ImageWithText";
import Slider from "./Components/Slider";
import cctvImg from './Assets/ImgText.png';
import imgbackgound  from './Assets/7025981.jpg'

export default function Home() {
  return (
    <div className="">
    <Banner imgbackgound={imgbackgound } heading={ "AI-powered Criminal Identification !"} sub1={"No HD photo needed. No needless search. Just upload a sketch & Let AI Find the Face."} sub2={"Every second counts in criminal investigations. Imagine a world where a hand-drawn sketch is enough to identify and locate a suspect across a network of surveillance cameras—without needing HD images or prior records. That world is here."} />
      {/* <ImageWithText image={cctvImg}
        heading={"AI-powered Criminal Identification"}
        subHeading={"No HD photo needed. No needless search. Just upload a sketch & Let AI Find the Face."}
        description={"Every second counts in criminal investigations. Imagine a world where a hand-drawn sketch is enough to identify and locate a suspect across a network of surveillance cameras—without needing HD images or prior records. That world is here."} /> */}
      <Slider />
      {/* <ImageWithText heading={"Transforming CCTV Feeds into Crime Detection"}
        subHeading={"Does surveillance cameras really prevent crime in real time? "}
        description={"Most security systems rely on manual monitoring and post-incident footage reviews, leaving criminals steps ahead. That changes today. With our AI-powered surveillance system, every camera in your network becomes a proactive investigator capable of identifying suspects from just a sketch and tracking their movements in real time."} buttonName={"Go to Surveillance Page"} buttonPath={'/survellance'} /> */}
    </div>
  );
}