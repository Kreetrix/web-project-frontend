import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "../../styles/MapSection.css";

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
    `,
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

const createSvgIcon = (type) => {
    const icons = {
        restaurant: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <filter id="shadow" x="-20%" y="0%" width="140%" height="130%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.3"/>
        </filter>
        <circle cx="12" cy="12" r="10" fill="#E74C3C" stroke="white" stroke-width="2" filter="url(#shadow)" />
        <path d="M14.5,11 C14.5,8.5 12,7 12,7 C12,7 9.5,8.5 9.5,11 C9.5,12.5 10.5,13.5 12,13.5 C13.5,13.5 14.5,12.5 14.5,11 Z M7,18 L17,18 L17,16 L7,16 L7,18 Z" fill="white"/>
      </svg>
    `,
        user: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <filter id="shadow" x="-20%" y="0%" width="140%" height="130%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.3"/>
        </filter>
        <circle cx="12" cy="12" r="10" fill="#3498DB" stroke="white" stroke-width="2" filter="url(#shadow)" />
        <path d="M12,7 C10.9,7 10,7.9 10,9 C10,10.1 10.9,11 12,11 C13.1,11 14,10.1 14,9 C14,7.9 13.1,7 12,7 Z M12,13 C10.33,13 7,13.67 7,16 L7,17 L17,17 L17,16 C17,13.67 13.67,13 12,13 Z" fill="white"/>
      </svg>
    `,
        userStop: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
        <filter id="shadow" x="-20%" y="0%" width="140%" height="130%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.3"/>
        </filter>
        <circle cx="12" cy="12" r="10" fill="#27AE60" stroke="white" stroke-width="2" filter="url(#shadow)" />
        <path d="M16,12 C16,10.89 15.1,10 14,10 L10,10 L10,8 L8,8 L8,16 L10,16 L10,14 L14,14 L14,13 L16,13 L16,12 Z M10,12 L10,12 L14,12 L14,12 L10,12 Z" fill="white"/>
      </svg>
    `,
        restaurantStop: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
        <filter id="shadow" x="-20%" y="0%" width="140%" height="130%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.3"/>
        </filter>
        <circle cx="12" cy="12" r="10" fill="#9B59B6" stroke="white" stroke-width="2" filter="url(#shadow)" />
        <path d="M16,12 C16,10.89 15.1,10 14,10 L10,10 L10,8 L8,8 L8,16 L10,16 L10,14 L14,14 L14,13 L16,13 L16,12 Z M10,12 L10,12 L14,12 L14,12 L10,12 Z" fill="white"/>
      </svg>
    `,
    };

    return L.divIcon({
        html: icons[type],
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20]
    });
};
const MapSection = () => {
    const [userCoords, setUserCoords] = useState(null);
    const [userStops, setUserStops] = useState([]);
    const [restaurantStops, setRestaurantStops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mapCenter, setMapCenter] = useState(RESTAURANT_COORDS);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    const restaurantIcon = createSvgIcon('restaurant');
    const userIcon = createSvgIcon('user');
    const userStopIcon = createSvgIcon('userStop');
    const restaurantStopIcon = createSvgIcon('restaurantStop');

    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

                    const centerLat = (userLat + RESTAURANT_COORDS[0]) / 2;
                    const centerLon = (userLon + RESTAURANT_COORDS[1]) / 2;
                    setMapCenter([centerLat, centerLon]);
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

    const getMapHeight = () => {
        if (viewportWidth < 640) return 'h-64';
        if (viewportWidth < 1024) return 'h-96';
        return 'h-128';
    };

    if (loading) {
        return (
            <div className="w-full my-8 flex flex-col items-center justify-center bg-gray-50 rounded-xl shadow-sm p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-600 font-medium">Loading map and data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full my-8 bg-red-50 text-red-800 p-8 rounded-xl shadow-sm">
                <div className="flex items-center justify-center">
                    <svg className="w-8 h-8 mr-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    <span className="font-medium">Error: {error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full my-8">
            <div className="mb-6 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-white mb-2">Transport Map</h2>
                <div className="flex flex-wrap items-center gap-4 text-base font-medium text-blue-100">
                    <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-red-400 mr-2 shadow-sm border border-white"></div>
                        <span>Restaurant</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-blue-300 mr-2 shadow-sm border border-white"></div>
                        <span>You</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-green-300 mr-2 shadow-sm border border-white"></div>
                        <span>Stops near you</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-purple-300 mr-2 shadow-sm border border-white"></div>
                        <span>Stops near restaurant</span>
                    </div>
                </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <MapContainer
                    center={mapCenter}
                    zoom={13}
                    className={`w-full ${getMapHeight()} z-0`}
                    zoomControl={false}
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        subdomains="abcd"
                        maxZoom={19}
                    />
                    <ZoomControl position="bottomright" />

                    <Marker position={RESTAURANT_COORDS} icon={restaurantIcon}>
                        <Popup className="custom-popup">
                            <div className="font-medium text-red-600">Restaurant</div>
                            <div className="text-gray-600 dark:text-gray-300">Helsinki City Center</div>
                        </Popup>
                    </Marker>

                    {userCoords && (
                        <Marker position={userCoords} icon={userIcon}>
                            <Popup className="custom-popup">
                                <div className="font-medium text-blue-600">Your location</div>
                                <div className="text-gray-600 dark:text-gray-300">Current position</div>
                            </Popup>
                        </Marker>
                    )}

                    {userStops.map((stop) => (
                        <Marker key={`user-${stop.id}`} position={[stop.lat, stop.lon]} icon={userStopIcon}>
                            <Popup className="custom-popup">
                                <div className="font-medium text-green-600">{stop.name}</div>
                                <div className="text-gray-600 dark:text-gray-300">Distance: {Math.round(stop.distance)} m</div>
                            </Popup>
                        </Marker>
                    ))}

                    {restaurantStops.map((stop) => (
                        <Marker key={`restaurant-${stop.id}`} position={[stop.lat, stop.lon]} icon={restaurantStopIcon}>
                            <Popup className="custom-popup">
                                <div className="font-medium text-purple-600">{stop.name}</div>
                                <div className="text-gray-600 dark:text-gray-300">Distance from restaurant: {Math.round(stop.distance)} m</div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800/50">
                        <h3 className="font-bold text-green-800 dark:text-green-300 flex items-center">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                            Stops near you ({userStops.length})
                        </h3>
                        <ul className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                            {userStops.slice(0, 3).map(stop => (
                                <li key={stop.id} className="mb-1 flex justify-between">
                                    <span>{stop.name}</span>
                                    <span className="font-medium text-green-700 dark:text-green-400">{Math.round(stop.distance)} m</span>
                                </li>
                            ))}
                            {userStops.length > 3 && (
                                <li className="text-green-600 dark:text-green-400 font-medium text-right">
                                    + {userStops.length - 3} more
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800/50">
                        <h3 className="font-bold text-purple-800 dark:text-purple-300 flex items-center">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                            Stops near restaurant ({restaurantStops.length})
                        </h3>
                        <ul className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                            {restaurantStops.slice(0, 3).map(stop => (
                                <li key={stop.id} className="mb-1 flex justify-between">
                                    <span>{stop.name}</span>
                                    <span className="font-medium text-purple-700 dark:text-purple-400">{Math.round(stop.distance)} m</span>
                                </li>
                            ))}
                            {restaurantStops.length > 3 && (
                                <li className="text-purple-600 dark:text-purple-400 font-medium text-right">
                                    + {restaurantStops.length - 3} more
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapSection;