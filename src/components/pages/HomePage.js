import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { MenuContainerSpecView } from "../spec/MenuContainerSpecView";

export default function HomePage() {


    return (
        <View style={styles.container}>
            <MenuContainerSpecView />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
