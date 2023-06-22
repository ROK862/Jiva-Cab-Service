import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import loading_binary from "../../../assets/loading.gif";
import { PLATFORM_SHADOWS_DARK } from '../../data/settings';
import { useSelector } from 'react-redux';

const LoadingView = () => {
    const { loading } = useSelector((state) => state.api);

    return (
        <>
            {loading && <View style={styles.loading_view}>
                <View style={styles.loading_img_view}>
                    <Image style={styles.loading_img} source={loading_binary} />
                </View>
            </View>}
        </>
    );
};

const styles = StyleSheet.create({
    loading_view: {
        flex: 1,
        position: "absolute",
        margin: "auto",
        width: "100%",
        top: 50,
        padding: 0,
        overflow: "hidden",
        zIndex: 201,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading_img_view: {
        width: 60,
        height: 60,
        margin: "auto",
        borderColor: "#d6d6d6",
        borderWidth: 2,
        borderRadius: 15,
        overflow: "hidden",
        ...PLATFORM_SHADOWS_DARK
    },
    loading_img: {
        width: "100%",
        height: "100%",
        margin: "auto",
    }
})

export default LoadingView;