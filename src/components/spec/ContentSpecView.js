import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import journeySlice from "../../redux/features/journey/journeySlice";
import { LOCAL_A_COLOR, LOCAL_B_COLOR, PLATFORM_SETTINGS, GOOGLE_MAPS_API_KEY } from "../../data/settings";
import apiSlice from "../../redux/features/api/apiSlice";

export default function ContentSpecView() {
    const { setDistance, setLocations, setDestination, setCurrent } = journeySlice.actions;
    const { locations } = useSelector((state) => state.journey);
    const { fetchSuccess, fetchDataStart } = apiSlice.actions;
    const dispatch = useDispatch();

    const destination = locations[1];

    const [minorUpdate, setMinorUpdate] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [destinationCoordinates, setDestinationCoordinates] = useState(null);

    const mapRef = useRef(null);

    useEffect(() => {
        if (minorUpdate || destination === PLATFORM_SETTINGS.destination_template) {
            setMinorUpdate(false);
            return;
        }
        dispatch(fetchDataStart());
        // Request permission to access the user's location
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }

            // Get the user's current location
            const location = await Location.getCurrentPositionAsync();
            setCurrentLocation(location.coords);

            // Reverse geocode the current location to get the address
            const addressList = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            if (addressList.length > 0) {
                const address = addressList[0];
                const address_string = `${address.name}, ${address.street}, ${address.district}`;

                if (address_string !== locations[0]) {
                    setMinorUpdate(true);
                    dispatch(setLocations({ index: 0, value: address_string }));
                }
            }

            // Geocode the destination address to get its coordinates
            const destinationCoordinates = await Location.geocodeAsync(destination + PLATFORM_SETTINGS.general_location);
            if (destinationCoordinates.length > 0) {
                const destinationCoords = destinationCoordinates[0];
                setDestinationCoordinates(destinationCoords);
            }

            // Set geo-locations for destination and current location.
            dispatch(setDestination(destinationCoordinates[0]));
            dispatch(setCurrent(location.coords));
            dispatch(fetchSuccess());
        })();
    }, [locations]);

    useEffect(() => {
        if (currentLocation && destinationCoordinates && mapRef.current) {
            // Calculate the midpoint between point A and point B
            const midpoint = {
                latitude: (currentLocation.latitude + destinationCoordinates.latitude) / 2,
                longitude: (currentLocation.longitude + destinationCoordinates.longitude) / 2,
            };

            // Calculate the distance between point A and point B
            const distance = calculateDistance(currentLocation, destinationCoordinates);

            // Calculate the zoom level based on the distance
            const zoomLevel = calculateZoomLevel(distance);

            // Animate the map to the new midpoint and zoom level
            mapRef.current.animateToRegion({
                latitude: midpoint.latitude,
                longitude: midpoint.longitude,
                latitudeDelta: zoomLevel,
                longitudeDelta: zoomLevel,
            });
        }
    }, [currentLocation, destinationCoordinates]);

    const calculateDistance = (locationA, locationB) => {
        const lat1 = locationA.latitude;
        const lon1 = locationA.longitude;
        const lat2 = locationB.latitude;
        const lon2 = locationB.longitude;

        const R = 6371; // Radius of the Earth in kilometers
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        dispatch(setDistance(distance));

        return distance;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const calculateZoomLevel = (distance) => {
        const maxZoomLevel = 40;
        const minZoomLevel = 0.8;
        const zoomScaleFactor = 1; // Adjust this value as needed

        // Calculate the desired zoom level based on the distance
        const zoomLevel = maxZoomLevel - (Math.log2(distance) * zoomScaleFactor);

        // Clamp the zoom level within the min and max values
        return Math.max(Math.min(maxZoomLevel - zoomLevel, maxZoomLevel), minZoomLevel) * 0.04;
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={
                    currentLocation && {
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                }
                scrollEnabled={true}
            >
                {currentLocation && (
                    <Marker
                        coordinate={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                        }}
                        title="Your Location"
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerLabelA}>A</Text>
                        </View>
                    </Marker>
                )}

                {destinationCoordinates && (
                    <Marker
                        coordinate={{
                            latitude: destinationCoordinates.latitude,
                            longitude: destinationCoordinates.longitude,
                        }}
                        title="Destination"
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerLabelB}>B</Text>
                        </View>
                    </Marker>
                )}

                {currentLocation && destinationCoordinates && (
                    <MapViewDirections
                        origin={currentLocation}
                        destination={destinationCoordinates}
                        apikey={GOOGLE_MAPS_API_KEY}
                        strokeWidth={4}
                        strokeColor="#1a73e8"
                    />
                )}
            </MapView>
            <LinearGradient colors={["transparent", "white"]} style={styles.gradient} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        flex: 1,
        width: "100%",
        height: "130%",
    },
    gradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
    },
    marker: {
        width: 40,
        height: 40,
        borderRadius: 80,
        justifyContent: "center",
        alignItems: "center",
    },
    markerLabelA: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        width: 35,
        backgroundColor: LOCAL_A_COLOR,
        borderRadius: 80,
        padding: 6,
        paddingLeft: 12
    },
    markerLabelB: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        width: 35,
        backgroundColor: LOCAL_B_COLOR,
        borderRadius: 80,
        padding: 6,
        paddingLeft: 12
    },
});