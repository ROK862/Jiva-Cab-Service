import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Animated } from "react-native";
import { APP_ICONS, PLATFORM_SHADOWS } from "../../data/settings";
import journeySlice from "../../redux/features/journey/journeySlice";
import { useDispatch, useSelector } from "react-redux";
import utilSlice from "../../redux/features/util/utilSlice";

export const SmartSearchButton = ({ initial, type, onSelect, style }) => {
    const { setLocations, setSearchAssist, setSearchHighlight: setHighlight } = journeySlice.actions;
    const { triggerGlobalChange } = utilSlice.actions;
    const { locations } = useSelector((state) => state.journey);
    const { search_assists_highlight: highlight } = useSelector((state) => state.journey);

    const dispatch = useDispatch();

    const [location, setLocation] = useState(locations[initial]);
    const [isSearch, setIsSearch] = useState(false);
    const searchInput = useRef(null);
    const searchViewAnimation = useRef(new Animated.Value(0)).current;

    const onInitiateSearch = () => {
        setIsSearch(!isSearch);

        onSelect(initial, !isSearch);
    };

    const onSetLocation = (value) => {
        setLocation(value);
    }

    const onBlurSearchInput = () => {
        setIsSearch(false);
        if (locations[initial] !== location) {
            dispatch(setLocations({ index: initial, value: location }));
        }
        onSelect(initial, !isSearch);
    };

    useEffect(() => {
        if (isSearch) {
            if (initial === 1) dispatch(setSearchAssist(true));

            Animated.timing(searchViewAnimation, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false,
            }).start();

            if (initial === 0) {
                // Set fucus to the search field.
                const timeout = setTimeout(() => {
                    if (searchInput.current) {
                        searchInput.current.focus();
                    }
                }, 500);

                return () => {
                    clearTimeout(timeout);
                };
            }
        } else {
            Animated.timing(searchViewAnimation, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
            }).start();

            dispatch(setSearchAssist(false));
        }
    }, [isSearch]);

    useEffect(() => {
        if (location !== locations[initial]) {
            setLocation(locations[initial]);
            triggerGlobalChange();
        }
    }, [locations])

    React.useEffect(() => {
        if (highlight === -1) {
            onBlurSearchInput();
        }
    }, [highlight])

    const searchViewStyle = {
        ...styles.search_view,
        transform: [
            {
                translateY: searchViewAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -50],
                }),
            },
        ],
    };

    return (
        <>
            <TouchableOpacity onPress={() => onInitiateSearch()} style={{ ...styles.point, ...(isSearch ? { opacity: 0 } : { opacity: 1 }), ...style }}>
                {APP_ICONS[`location_${type.toLowerCase()}`]}
                <Text>{location.length > 35 ? location.slice(0, 35) + "..." : location}</Text>
            </TouchableOpacity>
            {isSearch && (
                <Animated.View style={searchViewStyle}>
                    {APP_ICONS[`location_${type.toLowerCase()}`]}
                    <TextInput onBlur={onBlurSearchInput} style={styles.search_bar} ref={searchInput} value={location} onChangeText={(text) => onSetLocation(text)}></TextInput>
                </Animated.View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    a: {
        ...{
            paddingLeft: 3,
            justifyContent: "center",
            alignItems: "center",
            fontSize: 18,
            width: 20,
            height: 20,
            borderColor: "orange",
            borderRadius: 200,
            borderWidth: 4,
            backgroundColor: "orange",
            color: "white",
        },
    },
    b: {
        ...{
            paddingLeft: 3,
            justifyContent: "center",
            alignItems: "center",
            fontSize: 18,
            width: 20,
            height: 20,
            borderColor: "#3b82f6",
            borderRadius: 200,
            borderWidth: 4,
            backgroundColor: "#3b82f6",
            color: "white",
        },
    },
    point: {
        backgroundColor: "white",
        borderWidth: 2,
        display: "flex",
        borderColor: "#eee",
        borderRadius: 10,
        backgroundColor: "white",
        width: "80%",
        margin: "auto",
        flexDirection: "row",
        padding: 15,
        ...PLATFORM_SHADOWS,
    },
    search_view: {
        position: "absolute",
        top: 0,
        width: "80%",
        margin: "auto",
        transform: [{ translateY: 50 }],
    },
    search_bar: {
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 15,
        padding: 15,
        backgroundColor: "white",
        ...PLATFORM_SHADOWS,
    },
});
