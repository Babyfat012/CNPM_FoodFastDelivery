import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import placeholder from '../../assets/bluee.png';
const icon = L.icon({
  iconUrl: placeholder,
  iconSize: [50, 50],
});


const position = [20.5937, 78.9629]; // Default center position

function ResetCenterView({ originPosition, destinationPosition }) {
  const map = useMap();

  useEffect(() => {
    if (originPosition || destinationPosition) {
      const targetPosition = originPosition || destinationPosition;
      map.setView(
        L.latLng(targetPosition.lat, targetPosition.lon),
        map.getZoom(),
        { animate: true }
      );
    }
  }, [originPosition, destinationPosition, map]);

  return null;
}

export default function Maps({ originPosition, destinationPosition }) {
  const originLocation = [originPosition?.lat, originPosition?.lon];
  const destinationLocation = [destinationPosition?.lat, destinationPosition?.lon];
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);

  const getDirection = async () => {
    if (!originPosition || !destinationPosition) return;
    try {
      const params = new URLSearchParams({
        key: '6n8mOkjIr008hDT2QOx9Vs9NNsAmCWEz',
        from: `${originPosition.lat},${originPosition.lon}`,
        to: `${destinationPosition.lat},${destinationPosition.lon}`
      });

      const response = await fetch(`/api/addresses/directions?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text();
      console.log("Response Text:", text);

      try {
        const data = JSON.parse(text);
        console.log("Parsed JSON Data:", data);

        const { route } = data;
        if (route && route.legs) {
          const coordinates = route.legs[0].maneuvers.map(maneuver => [maneuver.startPoint.lat, maneuver.startPoint.lng]);
          setPolylineCoordinates(coordinates);
        }
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  useEffect(() => {
    getDirection();
  }, [originPosition, destinationPosition]);

  return (
    <MapContainer
      center={position}
      zoom={8}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=R6S31tmKaNHFiHca1Itl"
      />
      {originPosition && (
        <Marker position={originLocation} icon={icon}>
          <Popup>Origin: {originPosition.display_name}</Popup>
        </Marker>
      )}
      {destinationPosition && (
        <Marker position={destinationLocation} icon={icon}>
          <Popup>Destination: {destinationPosition.display_name}</Popup>
        </Marker>
      )}
      {polylineCoordinates.length > 0 && (
        <Polyline positions={polylineCoordinates} color="green" />
      )}
      <ResetCenterView originPosition={originPosition} destinationPosition={destinationPosition} />
    </MapContainer>
  );
}
