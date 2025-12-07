import React, { useEffect, useRef } from "react";
import L from "leaflet";

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Init Map
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      minZoom: 3,
      maxZoom: 18,
    }).setView([40.4168, -3.7038], 6);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "&copy; CARTO",
        subdomains: "abcd",
        maxZoom: 20,
      }
    ).addTo(map);

    // Custom Icon
    const pinIcon = L.divIcon({
      className: "custom-pin",
      html: `<div style="background-color: #F28B50; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px #F28B50;"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -10],
    });

    // Mock Pins
    const pins = [
      { coords: [40.4168, -3.7038], title: "Madrid Night Out" },
      { coords: [41.3851, 2.1734], title: "Barcelona Beach" },
    ];

    pins.forEach((pin) => {
      L.marker(pin.coords, { icon: pinIcon })
        .addTo(map)
        .bindPopup(
          `<b style="color:#151925; font-family:'Nunito'">${pin.title}</b>`
        );
    });

    // Handle Map Clicks (New Pin)
    map.on("click", function (e) {
      const { lat, lng } = e.latlng;
      const popupContent = `
        <div class="new-pin-form">
            <h4>New Memory</h4>
            <input type="text" id="new-memory-text" placeholder="What happened here?">
            <button onclick="window.saveNewPin(${lat}, ${lng})">Save Pin</button>
        </div>
      `;
      L.popup().setLatLng(e.latlng).setContent(popupContent).openOn(map);
    });

    mapInstanceRef.current = map;

    // GLOBAL FUNCTION for Leaflet Popup (React workaround)
    window.saveNewPin = (lat, lng) => {
      const textInput = document.getElementById("new-memory-text");
      const text = textInput ? textInput.value : "";
      
      // --- VALIDATION: Map Pin ---
      if (!text || !text.trim()) {
        alert("Please write a memory!");
        return;
      }
      if (text.length > 40) {
        alert("Memory is too long! Keep it under 40 characters.");
        return;
      }

      L.marker([lat, lng], { icon: pinIcon })
        .addTo(map)
        .bindPopup(
          `<b style="color:#151925; font-family:'Nunito'">${text}</b>`
        );
      map.closePopup();
      console.log("Saving to backend:", { lat, lng, text });
    };

    return () => {
      // Cleanup global function on unmount
      window.saveNewPin = null;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div id="map" ref={mapContainerRef}></div>;
};

export default MapComponent;
