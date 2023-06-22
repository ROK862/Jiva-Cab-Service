import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ACTION_COLOR, PLATFORM_SHADOWS } from "../../data/settings";
import { useSelector } from "react-redux";

export const CustomButton = ({ title, style, onPress }) => {
    const { loading } = useSelector((state) => state.api);

    return (
        <>
            <TouchableOpacity onPress={(!loading) ? (onPress || (() => { })) : (() => { })} style={{
                ...styles.custom_button, ...style,
                ...(loading) ? { backgroundColor: "gray", color: "black", borderColor: "gray" } : {}
            }}>
                <Text style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>{title.length > 35 ? title.slice(0, 35) + "..." : title}</Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    custom_button: {
        backgroundColor: "white",
        borderWidth: 2,
        display: "flex",
        borderColor: "#eee",
        borderRadius: 5,
        backgroundColor: "white",
        width: "80%",
        margin: "auto",
        flexDirection: "row",
        padding: 12,
        fontWeight: "bold",
        backgroundColor: ACTION_COLOR,
        borderColor: ACTION_COLOR,
        ...PLATFORM_SHADOWS,
    }
});
