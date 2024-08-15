import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, MarkerF, PolylineF, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  height: "100vh",
};

const defaultCenter = { lat: -6.9189553594069455, lng: 107.61826572207039 };

const MapsView = ({ travelPlan }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [places, setPlaces] = useState([
    {
      lat: travelPlan.start_location.lat,
      lng: travelPlan.start_location.lng,
    },
  ]);

  const mapRef = useRef();

  useEffect(() => {
    if (travelPlan.destinations.length > 0) {
      const newPlaces = travelPlan.destinations.map((destination) => ({
        lat: destination.detail_location.lat,
        lng: destination.detail_location.lng,
      }));
      setPlaces([
        {
          lat: travelPlan.start_location.lat,
          lng: travelPlan.start_location.lng,
        },
        ...newPlaces,
      ]);
    }
  }, [travelPlan]);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      if (places.length > 0) {
        fitBounds(mapRef.current, places);
      } else {
        mapRef.current.setCenter(defaultCenter);
        mapRef.current.setZoom(10);
      }
    }
  }, [isLoaded, places]);

  const fitBounds = (map, places) => {
    const bounds = new window.google.maps.LatLngBounds();
    places.forEach((place) => {
      bounds.extend(new window.google.maps.LatLng(place.lat, place.lng));
    });
    map.fitBounds(bounds);
  };

  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;
      if (places.length > 0) {
        fitBounds(map, places);
      } else {
        map.setCenter(defaultCenter);
        map.setZoom(10);
      }
    },
    [places]
  );

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} onLoad={onLoad} onUnmount={onUnmount}>
      {places.map((place, index) => (
        <MarkerF key={index} position={{ lat: place.lat, lng: place.lng }} />
      ))}

      <PolylineF
        path={places}
        options={{
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        }}
      />
    </GoogleMap>
  ) : (
    <div className="h-screen flex justify-center items-center">
      <h1 className="titel2">Loading...</h1>
    </div>
  );
};

export default MapsView;
