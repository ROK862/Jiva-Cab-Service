import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { PLATFORM_SHADOWS } from "../../data/settings";

export const InfoButton = ({ title, style, onPress }) => {

    return (
        <TouchableOpacity onPress={onPress || (() => { })} style={{ ...styles.point, ...style }}>
            <Text style={{ fontWeight: "bold" }}>{title.length > 35 ? title.slice(0, 35) + "..." : title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    point: {
        backgroundColor: "white",
        borderWidth: 2,
        display: "flex",
        borderColor: "#eee",
        borderRadius: 10,
        backgroundColor: "white",
        width: "80%",
        margin: "auto",
        marginTop: 15,
        flexDirection: "row",
        padding: 25,
        fontWeight: "bold",
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
