import React from "react";
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import eco_car_binary from "../../../assets/car.png";
import motor_bike_binary from "../../../assets/motorbike.png";
import truck_binary from "../../../assets/truck.png";
import { PLATFORM_SHADOWS_DARK } from "../../data/settings";
import { useDispatch } from "react-redux";
import journeySlice from "../../redux/features/journey/journeySlice";
import menuSlice from "../../redux/features/menu/menuSlice";

const icon_dictionary = {
    economic: eco_car_binary,
    motorbike: motor_bike_binary,
    truck: truck_binary,
};

export const ServicesSpecView = ({ children, actions }) => {
    const { toggleSideBar } = menuSlice.actions;
    const dispatch = useDispatch();

    return (
        <View style={styles.nav_container}>
            <ScrollView
                horizontal
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {(actions || []).map((e, idx) => {
                    return (
                        <TouchableOpacity key={idx} activeOpacity={0.7} onPress={() => { dispatch(toggleSideBar(false)) }}>
                            <View style={{ ...styles.order_history, ...{ marginLeft: 10 } }} key={idx}>

                                <View>
                                    {e.icon}
                                    <Text style={{ fontWeight: "bold" }}>{e.title.length > 35 ? e.title.slice(0, 35) + "..." : e.title}</Text>
                                    <Text>{e.subtitle}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    nav_container: {
        position: "relative",
        top: -50
    },
    container: {
        height: "auto",
        padding: 15,
        margin: 0,
        marginBottom: 5,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative",
    },
    nav_component_container_selected: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        borderColor: "#3b82f6",
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: "white",
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 6,
            },
            android: {
                elevation: 6,
            },
        })
    },
    nav_component_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        borderColor: "white",
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: "white",
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 6,
            },
            android: {
                elevation: 6,
            },
        })
    },
    nav_images: {
        width: 70,
        height: 45,

    },
    nav_components: {
        width: 60,
        height: 60,
        marginHorizontal: 5,
        paddingEnd: 90
    },
    order_history: {
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        minWidth: 200,
        backgroundColor: "white",
        ...PLATFORM_SHADOWS_DARK
    }
});
