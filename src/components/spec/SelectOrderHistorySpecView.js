import React from "react";
import { OrderHistorySpecView } from "./OrderHistorySpecView";
import { APP_ICONS } from "../../data/settings";
import journeySlice from "../../redux/features/journey/journeySlice";
import { useDispatch } from "react-redux";


export const SelectOrderHistorySpecView = ({ }) => {
    const { setSearchHighlight: setHighlight } = journeySlice.actions;
    const dispatch = useDispatch();

    const handleSelection = () => {
        dispatch(setHighlight(-1));
    }

    return (
        <>
            <OrderHistorySpecView
                onPress={handleSelection}
                style={{ position: "relative", top: -120 }}
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
        </>
    )
}