import * as Notifications from 'expo-notifications';

export const sendPushNotification = async (title, body, token) => {
    let message = {
        to: token,
        sound: 'default',
        title: title,
        body: body,
        data: { /* Optional additional data */ },
        android: {
            channelId: 'default', // Required for Android devices
        },
    };

    try {
        await Notifications.scheduleNotificationAsync({
            content: message,
            trigger: null, // Send immediately
        });

        console.log('Push notification sent successfully');
    } catch (error) {
        console.log('Failed to send push notification:', error);
    }
};
