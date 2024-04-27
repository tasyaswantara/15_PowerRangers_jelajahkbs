import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Marker, Popup, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MainLayout from "../components/layout/MainLayout";
import { Marker_peta } from "../components/utils/marker";
import InfoPopup from "../components/peta/InfoPopup";
import { ImLocation } from "react-icons/im";
import Monyet from "../assets/icon/Monyet_hijau.png";
import { databyid, getAllData } from "../api/services/handler";

const Peta = () => {
  const [data, setData] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await getAllData();
      setData((prevData) => [...prevData, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const selectedData = data.find((item) => item.id === parseInt(1));

  console.log(selectedData);

  const [currentLoc, setCurrentLoc] = useState("Pintu Masuk");
  const [isDone, setIsdone] = useState(true);

  useEffect(() => {
    AOS.init({
      delay: 200,
      duration: 1000,
      easing: "ease-in-sine",
    });
  }, []);

  const [isOpen, setIsOpen] = useState({id:"",status:false});

  const handleMarkerClick = (id) => {
    setIsOpen({ id: id, status: true });
  };
  return (
    <>
      {isOpen.status && <InfoPopup id={isOpen.id} data={data} />}

      <MainLayout>
        <MapContainer
          className="w-screen md:max-w-sm h-screen"
          center={[-7.295589735374133, 112.73733134664052]}
          zoomControl={false}
          zoom={17}
          scrollWheelZoom={true}
        >
          <div
            className={`w-full flex justify-center items-center h-10 top-8 md:top-[5vh] z-[999] absolute mx-auto ${
              isOpen ? "hidden" : "block"
            }`}
          >
            <div className="w-[50%] bg-primary-green flex justify-center items-center h-10 rounded-full absolute mx-auto text-white font-bold text-lg">
              PETA LOKASI
            </div>
          </div>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.map((data) => {
            return (
              <Marker
                eventHandlers={{
                  click: () => handleMarkerClick(data.id),
                }}
                position={[data.koordinatx, data.koordinaty]}
                icon={
                  !data.dikunjungi
                    ? L.icon({
                        iconUrl: Marker_peta.find(
                          (item) => item.id === parseInt(data.id)
                        ).marker_default,
                        iconSize: [40, 50],
                      })
                    : L.icon({
                        iconUrl: Marker_peta.find(
                          (item) => item.id === parseInt(data.id)
                        ).marker_hijau,
                        iconSize: [40, 50],
                      })
                }
              ></Marker>
            );
          })}
        </MapContainer>
        <div
          className={`w-full absolute bottom-20 md:bottom-24 z-[999] flex justify-center items-center ${
            isOpen ? "hidden" : "block"
          }`}
        >
          <div className="bg-white rounded-3xl w-[80%] mx-auto h-24 px-6 py-4">
            <p className="font-bold">Lokasi Anda Saat ini</p>
            <div className="flex w-full items-center mt-2 gap-2">
              <ImLocation className="text-red-600" size={20} />
              {currentLoc}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Peta;
