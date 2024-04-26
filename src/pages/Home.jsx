import { useState,useEffect } from "react";
import Logo from "../assets/icon/Logo.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { Marker, Popup, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapComponent from "../components/MapComponents";
import Button from "../components/ui/Button";
const Home = () => {
  useEffect(() => {
    AOS.init({
      delay: 200,
      duration: 1000,
      easing: "ease-in-sine",
    });
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const handleclick = () => {
    setIsOpen(!isOpen);
  };
 

  return (
    <>
    <MapContainer
                  className=" w-screen h-screen"
                  center={[
                    -7.295589735374133,112.73733134664052
                  ]}
                  zoom={40}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker
                    position={[
                      -7.295589735374133,112.73733134664052
                    ]}
                  >
                    <Popup>
                      <img src={Logo} alt="" />
                      Kebon</Popup>
                  </Marker>
                  {/* <MapComponent/> */}
                </MapContainer>
                
    {/* <div  className=" rounded-3xl flex justify-center items-center bg-slate-400 w-1/2 h-[60vh] mx-auto mt-[20vh] transform transition-transform animate-bounce shadow-2xl shadow-slate-800">
    <h1 className=" text-6xl font-bold text-text-black w-3/4 text-center" >Hackfest Punya Power Rangers</h1>
    <Button variation={"secondary"} type={"submit"} >Anjay</Button>
    </div> */}
    
    </>
  );
};

export default Home;
