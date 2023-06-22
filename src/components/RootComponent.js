import React, { useRef } from 'react';
import { StyleSheet, Animated, PanResponder, Dimensions, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import menuSlice from '../redux/features/menu/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SelectShuttlesSpecView } from './spec/SelectShuttlesSpecView';
import ContentSpecView from './spec/ContentSpecView';
import JourneySpecView from './spec/JourneySpecView';
import { APP_ICONS, NAVIGATION_KEYS, PLATFORM_SETTINGS, PLATFORM_SHADOWS_DARK } from '../data/settings';
import StatisticsSpecView from './spec/StatisticsSpecView';
import { OrderHistorySpecView } from './spec/OrderHistorySpecView';
import { ServicesSpecView } from './spec/ServicesSpecView';
import LoadingView from './views/LoadingView';
import { insertOrder, fetchShuttlesData } from '../redux/features/api/apiActions';
import { CustomButton } from './button/CustomButton';
import { SelectOrderHistorySpecView } from './spec/SelectOrderHistorySpecView';
import { ProfileSpecView } from './spec/ProfileSpecView';
import { sendPushNotification } from '../utilities/helper';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import GooglePayButton from './button/GooglePayButton';

let containerWidth = 0;

export const RootComponent = () => {
    const screenWidth = Dimensions.get('window').width;
    containerWidth = screenWidth * 1; // 70% of screen width
    const { toggleSideBar } = menuSlice.actions;
    const { search_assists, current_point, destination_point, shuttle, distance, locations } = useSelector((state) => state.journey);
    const { activate_side_bar: active } = useSelector((state) => state.menu);
    const { page } = useSelector((state) => state.navigator);

    const dispatch = useDispatch();
    const position = useRef(new Animated.ValueXY({ x: -containerWidth, y: 0 })).current;

    let gpose = useRef(new Animated.ValueXY({ x: -containerWidth, y: 0 })).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gesture) => {
                gpose.setValue({ x: gesture.dx, y: 0 });
            },
            onPanResponderRelease: (_, gesture) => {
                if (gesture.dx < -75) {
                    deactivateMenu();
                } else if (gesture.dx > 100) {
                    activateMenu();
                }
            },
        })
    ).current;

    const activateMenu = () => dispatch(toggleSideBar(true));

    const deactivateMenu = () => dispatch(toggleSideBar(false));

    const onPlaceOrder = () => {
        const orderData = {
            user_id: 1,
            shuttle: shuttle,
            agreed_rate: PLATFORM_SETTINGS.get_price_at_rate(distance, shuttle),
            agreed_waiting_time: 5,
            fulfillment_status: false,
            message: 'This is a new order.',
            pickup_point: { ...current_point, ...{ name: locations[0] } },
            destination_point: { ...destination_point, ...{ name: locations[1] } },
            driver: null,
        };

        dispatch(insertOrder(orderData));

        (async () => {
            try {
                const { status: existingStatus } = await Notifications.getPermissionsAsync();

                let finalStatus = existingStatus;

                // Ask for permission only if not already granted
                if (existingStatus !== 'granted') {
                    const { status } = await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }

                if (finalStatus !== 'granted') {
                    console.log('Permission to receive push notifications denied');
                    return;
                }

                const deviceToken = (await Notifications.getExpoPushTokenAsync()).data;

                const temp = setTimeout(() => {
                    sendPushNotification("Your Jiva will pick you up shortly.",
                        `Your order has been confirmed, and a driver is on his way to pick you up at ${locations[0]}`, deviceToken);
                }, 5000);
                // Use the deviceToken value in your push notification sending logic

            } catch (error) {
                console.log('Error registering for push notifications:', error);
            }
        })();
    }

    React.useEffect(() => {
        if (!active) {
            Animated.timing(position, {
                toValue: { x: -containerWidth, y: 0 },
                duration: 200,
                useNativeDriver: false,
            }).start();
            // gpose = useRef(new Animated.ValueXY({ x: -containerWidth, y: 0 })).current;
        } else {
            Animated.timing(position, {
                toValue: { x: 0, y: 0 },
                duration: 200,
                useNativeDriver: false,
            }).start();
            // gpose = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
        }
    }, [active]);

    React.useEffect(() => {
        dispatch(fetchShuttlesData());
    }, [dispatch]);

    let visible_style = active
        ? {
            position: 'absolute',
            top: 0,
            left: 0,
            width: containerWidth,
            height: '100%',
            zIndex: 110,
            display: "flex",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }
        : {
            ...styles.container,
        };

    return (
        <>
            <Animated.View {...panResponder.panHandlers} style={{ width: "100%", height: "100%" }}>
                <LoadingView />
                <StatisticsSpecView />
                <ContentSpecView />
                {page === NAVIGATION_KEYS.booking &&
                    <JourneySpecView>
                        {!search_assists && <SelectShuttlesSpecView>
                            <View style={styles.submit_button_wrapper}>
                                <CustomButton title={"Order Now"} onPress={onPlaceOrder} />
                                <TouchableOpacity>{APP_ICONS.info}</TouchableOpacity>
                            </View>
                        </SelectShuttlesSpecView>}

                        {search_assists && <SelectOrderHistorySpecView />}
                    </JourneySpecView>
                }
                <Animated.View style={[visible_style, position.getLayout()]}>
                    <View style={{ width: "80%", height: "100%", backgroundColor: "white", padding: 10, paddingTop: 50, ...PLATFORM_SHADOWS_DARK }}>
                        <View>
                            {APP_ICONS.logo}
                        </View>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            <ProfileSpecView
                                actions={[{
                                    icon: APP_ICONS.wallet,
                                    title: "Wallet",
                                    subtitle: "483.90 NAD",
                                }, {
                                    icon: APP_ICONS.subscriptions,
                                    title: "Subscriptions",
                                    subtitle: "You have 3 subscriptions",
                                }]}
                            >
                            </ProfileSpecView>
                            <SafeAreaView style={{ flex: 1 }}>
                                <GooglePayButton />
                            </SafeAreaView>
                            <Text style={{ marginBottom: 40, fontWeight: "bold", fontSize: 15 }}>Repeat previous Order.</Text>
                            <OrderHistorySpecView
                                actions={[{
                                    icon: APP_ICONS.location_b,
                                    title: "Hilltop, Kleine Kuppe",
                                    subtitle: "~ 83.90 NAD",
                                }, {
                                    icon: APP_ICONS.location_b,
                                    title: "WB Supermarkets Ombili, Etetewe",
                                    subtitle: "~ 46.90 NAD",
                                }, {
                                    icon: APP_ICONS.location_b,
                                    title: "Jan Mohr Secondary School, Aries",
                                    subtitle: "~ 48.90 NAD",
                                }, {
                                    icon: APP_ICONS.location_b,
                                    title: "KFC Katutura",
                                    subtitle: "~ 43.50.90 NAD",
                                }, {
                                    icon: APP_ICONS.location_b,
                                    title: "Safari Villa Botique",
                                    subtitle: "~ 43.50.90 NAD",
                                }]}
                            >
                            </OrderHistorySpecView>
                            <Text style={{ marginBottom: 40, fontWeight: "bold", fontSize: 15 }}>Our Services.</Text>
                            <ServicesSpecView
                                actions={[{
                                    icon: APP_ICONS.star,
                                    title: "Workday Transportation Service",
                                    subtitle: "~ 980.90 NAD / PM",
                                }, {
                                    icon: APP_ICONS.info,
                                    title: "Turn your Ride into a Jiva",
                                    subtitle: "~ 1,900.00 Registration Fee.",
                                }, {
                                    icon: APP_ICONS.heart,
                                    title: "Low cost fuel partnership.",
                                    subtitle: "~ Safe upto 20% on fuel.",
                                }]}
                            >
                            </ServicesSpecView>
                        </ScrollView>
                    </View>
                    <TouchableOpacity pointerEvents="auto" style={{ width: "20%", height: "100%", backgroundColor: "transparent" }} onPress={() => { dispatch(toggleSideBar(false)) }} />
                </Animated.View>
            </Animated.View >
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: containerWidth,
        height: '100%',
        backgroundColor: 'white',
    },
    text_title: {
        fontSize: 30,
        fontWeight: 400,
        textAlign: "center",
        color: "blue",
    },
    submit_button_wrapper: {
        width: "100%",
        margin: "auto",
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})