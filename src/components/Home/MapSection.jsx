import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const RESTAURANT_COORDS = [60.1695, 24.9354];

const fetchStopsByRadius = async (lat, lon, radius = 700) => {
    const query = {
        query: `
        {
            stopsByRadius(lat: ${lat}, lon: ${lon}, radius: ${radius}, first: 10) {
                edges {
                    node {
                        stop {
                            gtfsId
                            name
                            lat
                            lon
                        }
                        distance
                    }
                }
            }
        }
        `
    };

    try {
        const res = await fetch("https://api.digitransit.fi/routing/v2/hsl/gtfs/v1", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "digitransit-subscription-key": "ba6aa23c85144f7c984cec91a194a782"
            },
            body: JSON.stringify(query)
        });

        const data = await res.json();
        return data.data.stopsByRadius.edges;
    } catch (error) {
        console.error("Error fetching stops:", error);
        return [];
    }
};

const MapSection = () => {
    const [userCoords, setUserCoords] = useState(null);
    const [userStops, setUserStops] = useState([]);
    const [restaurantStops, setRestaurantStops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let userLat = null;
                let userLon = null;

                if (navigator.geolocation) {
                    const position = await new Promise((resolve, reject) =>
                        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true })
                    );
                    userLat = position.coords.latitude;
                    userLon = position.coords.longitude;
                    setUserCoords([userLat, userLon]);
                }

                const restaurantLat = RESTAURANT_COORDS[0];
                const restaurantLon = RESTAURANT_COORDS[1];

                const [userStopsRaw, restaurantStopsRaw] = await Promise.all([
                    fetchStopsByRadius(userLat, userLon),
                    fetchStopsByRadius(restaurantLat, restaurantLon)
                ]);

                const formatStops = (raw) =>
                    raw?.map(item => ({
                        id: item.node.stop.gtfsId,
                        name: item.node.stop.name,
                        lat: item.node.stop.lat,
                        lon: item.node.stop.lon,
                        distance: item.node.distance
                    })) || [];

                const uniqueById = (stops) =>
                    Array.from(new Map(stops.map(stop => [stop.id, stop])).values());

                setUserStops(uniqueById(formatStops(userStopsRaw)));
                setRestaurantStops(uniqueById(formatStops(restaurantStopsRaw)));
            } catch (err) {
                console.error("Failed to fetch location or stops", err);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const stopIconUser = L.divIcon({
        html: `<div style="background:#34A853;width:12px;height:12px;border-radius:50%;border:2px solid white"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });

    const stopIconRestaurant = L.divIcon({
        html: `<div style="background:#4285F4;width:12px;height:12px;border-radius:50%;border:2px solid white"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });

    const userMarkerIcon = L.divIcon({
        html: `<div style="background:#FF4500;width:14px;height:14px;border-radius:50%;border:2px solid white"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
    });

    if (loading) return <div>Loading map and transit data...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <MapContainer
                center={userCoords || RESTAURANT_COORDS}
                zoom={15}
                style={{ height: "500px", width: "100%", borderRadius: "8px" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Restaurant marker */}
                <Marker position={RESTAURANT_COORDS}>
                    <Popup>
                        <strong>Restaurant</strong><br />
                        Helsinki City Center
                    </Popup>
                </Marker>

                {/* User's location */}
                {userCoords && (
                    <Marker position={userCoords} icon={userMarkerIcon}>
                        <Popup>You are here</Popup>
                    </Marker>
                )}

                {/* Stops near user */}
                {userStops.map((stop) => (
                    <Marker key={`user-${stop.id}`} position={[stop.lat, stop.lon]} icon={stopIconUser}>
                        <Popup>
                            <strong>{stop.name}</strong><br />
                            Distance from you: {Math.round(stop.distance)} meters
                        </Popup>
                    </Marker>
                ))}

                {/* Stops near restaurant */}
                {restaurantStops.map((stop) => (
                    <Marker key={`restaurant-${stop.id}`} position={[stop.lat, stop.lon]} icon={stopIconRestaurant}>
                        <Popup>
                            <strong>{stop.name}</strong><br />
                            Distance from restaurant: {Math.round(stop.distance)} meters
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <div style={{ marginTop: "10px" }}>
                <p>🟢 {userStops.length} stops near you | 🔵 {restaurantStops.length} stops near the restaurant</p>
            </div>
        </div>
    );
};

export default MapSection;
