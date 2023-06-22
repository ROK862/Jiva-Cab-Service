import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SmartSearchButton } from "../search/SmartSearchButton";
import journeySlice from "../../redux/features/journey/journeySlice";
import { useDispatch, useSelector } from "react-redux";

export default function JourneySpecView({ children }) {
    const { setSearchHighlight: setHighlight } = journeySlice.actions;
    const { search_assists_highlight: highlight } = useSelector((state) => state.journey);
    const dispatch = useDispatch();

    const onSelect = (index, value) => {
        if (value) {
            dispatch(setHighlight(index));
        } else {
            dispatch(setHighlight(-1))
        }
    }

    React.useEffect(() => {

    }, [highlight])

    return (
        <>
            <View style={styles.container}>
                <SmartSearchButton style={{ ...(highlight !== 0 && highlight !== -1) ? { opacity: 0.05 } : {} }} onSelect={onSelect} initial={0} type="A" />
                <SmartSearchButton style={{ ...(highlight !== 1 && highlight !== -1) ? { opacity: 0.05 } : {} }} onSelect={onSelect} initial={1} type="B" />
            </View>
            {children}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        display: "flex",
        minHeight: 180,
        width: "100%",
    },
});
