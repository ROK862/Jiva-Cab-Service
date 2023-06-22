import { Image, Platform, StyleSheet, Text } from "react-native";
import { AntDesign } from 'react-native-vector-icons';
import logo_binary from "../../assets/logo.png";

export const MERCHANT_ID = "HIDDEN";
export const ACTION_COLOR = "#83cc37";
export const LOCAL_A_COLOR = "#8d10ac";
export const LOCAL_B_COLOR = ACTION_COLOR;
export const GOOGLE_MAPS_API_KEY = "HIDDEN";

export const icon_dictionary = {
    logo: logo_binary
}

const styles = StyleSheet.create({
    app_icons: {
        backgroundColor: ACTION_COLOR,
        borderRadius: 4,
        padding: 8,
        borderColor: ACTION_COLOR,
        borderWidth: 4,
        display: "flex",
        marginLeft: 2,
        ...PLATFORM_SHADOWS
    },
    a: {
        position: "relative",
        top: -5,
        backgroundColor: LOCAL_A_COLOR,
        borderColor: LOCAL_A_COLOR,
        borderRadius: 50,
        padding: 3,
        paddingLeft: 8,
        color: "white",
        width: 25,
        marginRight: 8,
        marginLeft: 1,
    },
    b: {
        position: "relative",
        top: -5,
        backgroundColor: LOCAL_B_COLOR,
        borderColor: LOCAL_B_COLOR,
        borderRadius: 50,
        padding: 3,
        paddingLeft: 8,
        color: "white",
        width: 25,
        marginRight: 8,
        marginLeft: 1,
    }
});

export const APP_ICONS = {
    heart: <Text style={styles.app_icons}><AntDesign name="heart" size={24} color="white" /></Text>,
    star: <Text style={styles.app_icons}><AntDesign name="star" size={24} color="white" /></Text>,
    check: <Text style={styles.app_icons}><AntDesign name="check" size={24} color="white" /></Text>,
    info: <Text style={styles.app_icons}><AntDesign name="info" size={24} color="white" /></Text>,
    subscriptions: <Text style={{ ...styles.app_icons, ...styles.a }}><AntDesign name="slack" size={24} color="white" /></Text>,
    wallet: <Text style={{ ...styles.app_icons, ...styles.a }}><AntDesign name="bank" size={24} color="white" /></Text>,
    home: <Text style={{ ...styles.app_icons, ...{ backgroundColor: "white" } }}><AntDesign name="menufold" size={24} color="black" /></Text>,
    statistics: <Text style={{ ...styles.app_icons, ...{ backgroundColor: "white" } }}><AntDesign name="piechart" size={24} color="black" /></Text>,
    location_a: <Text style={{ ...styles.app_icons, ...styles.a }}>A</Text>,
    location_b: <Text style={{ ...styles.app_icons, ...styles.b }}>B</Text>,
    logo: <Image style={{ width: 100, height: 50, margin: 10 }} source={icon_dictionary.logo} />,
};

export const PLATFORM_SHADOWS = Platform.select({
    ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    android: {
        elevation: 5,
    },
});

export const NAVIGATION_KEYS = {
    booking: "booking",
    order_confirmation: "order_confirmation",
    yield_ride: "yield_ride",
    complete_payment: "complete_payment",
}

export const PLATFORM_SHADOWS_DARK = Platform.select({
    ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 15,
    },
    android: {
        elevation: 15,
    },
});

export const PLATFORM_SETTINGS = {
    user_location_template: "Your Location",
    destination_template: "Select a Destination",
    shuttles: [
        {
            icon: 'economic',
            title: "Economic",
            subtitle: `~ ${this.retainer_rate || 0.00} NAD`,
            float: false,
            action: null,
            estimated_expense: 2,
            fair_rate: 7,
            retainer_rate: 30,
        }, {
            icon: 'motorbike',
            title: "Mini-Delivery",
            subtitle: `~ ${this.retainer_rate || 0.00} NAD`,
            float: false,
            action: null,
            estimated_expense: 2,
            fair_rate: 12,
            retainer_rate: 50,
        }, {
            icon: 'truck',
            title: "Delivery",
            subtitle: `~ ${this.retainer_rate || 0.00} NAD`,
            float: false,
            estimated_expense: 2,
            fair_rate: 60,
            retainer_rate: 350,
        }
    ],
    general_location: ", Windhoek, Khomas, Namibia",
    get_price_at_rate: (distance, shuttle) => ((distance * shuttle.fair_rate) > shuttle.retainer_rate ? distance * shuttle.fair_rate : shuttle.retainer_rate).toFixed(2),
}
