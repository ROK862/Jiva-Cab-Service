import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import eco_car_binary from "../../../assets/car.png";
import motor_bike_binary from "../../../assets/motorbike.png";
import truck_binary from "../../../assets/truck.png";
import journeySlice from "../../redux/features/journey/journeySlice";
import { ACTION_COLOR, PLATFORM_SETTINGS } from "../../data/settings";

const icon_dictionary = {
    economic: eco_car_binary,
    motorbike: motor_bike_binary,
    truck: truck_binary,
};

export const SelectShuttlesSpecView = ({ children }) => {
    const { setShuttle } = journeySlice.actions;
    const { data } = useSelector((state) => state.api);
    const { distance } = useSelector((state) => state.journey);
    const [actions, setShuttles] = React.useState(data.shuttles)

    const dispatch = useDispatch();

    const [selected, setSelected] = React.useState(actions[0] || null);


    React.useEffect(() => {
        setShuttles(data.shuttles);
    }, [data]);

    return (
        <View style={styles.nav_container}>
            <ScrollView
                horizontal
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {(actions || []).map((e, idx) => {
                    const s = (e === selected) ? styles.nav_component_container_selected : styles.nav_component_container;
                    const price = PLATFORM_SETTINGS.get_price_at_rate(distance, e);
                    e.subtitle = `~ ${price} NAD`;

                    return (
                        <TouchableOpacity key={idx} activeOpacity={0.7} onPress={() => { setSelected(e); dispatch(setShuttle(e)); }}>
                            <View style={{ ...s, ...{ paddingLeft: 10, paddingRight: 10 } }} key={idx}>
                                <View style={styles.nav_components}>
                                    <Image style={styles.nav_images} source={icon_dictionary[e.icon]} />
                                </View>
                                <View>
                                    <Text>{e.title}</Text>
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
        borderColor: ACTION_COLOR,
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
    }
});
