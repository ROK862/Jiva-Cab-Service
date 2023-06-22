import React, { useEffect } from 'react';
import { View } from 'react-native';
import { InfoButton } from '../button/InfoButton';
import { useDispatch, useSelector } from 'react-redux';
import { APP_ICONS, PLATFORM_SETTINGS } from '../../data/settings';
import menuSlice from '../../redux/features/menu/menuSlice';

const StatisticsSpecView = () => {
    const { distance, shuttle } = useSelector((state) => state.journey);
    const { toggleSideBar } = menuSlice.actions;
    const dispatch = useDispatch();

    const [statistics, setStatistics] = React.useState(false);

    const price = PLATFORM_SETTINGS.get_price_at_rate(distance, shuttle);
    const profit_ratio = (shuttle.fair_rate - shuttle.estimated_expense) / shuttle.fair_rate;

    useEffect(() => { }, [shuttle, distance])

    return (
        <>
            {statistics &&
                <View style={{ position: "absolute", zIndex: 95, width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                    <InfoButton onPress={() => setStatistics(false)} style={{ width: 130, fontWeight: "bold", padding: 8 }} title={`P: ${price} NAD`} />
                    <InfoButton onPress={() => setStatistics(false)} style={{ width: 130, fontWeight: "bold", padding: 8 }} title={`DP: ${((price * profit_ratio) * 0.85).toFixed(2)} NAD`} />
                    <InfoButton onPress={() => setStatistics(false)} style={{ width: 130, fontWeight: "bold", padding: 8 }} title={`PP: ${((price * profit_ratio) * 0.15).toFixed(2)} NAD`} />
                </View>}
            {!statistics &&
                <>
                    <View style={{ position: "absolute", left: "5%", flex: 1, zIndex: 95, width: "90%", flexDirection: 'row' }}>
                        <InfoButton onPress={() => { dispatch(toggleSideBar(true)) }} style={{ width: 60, fontWeight: "bold", padding: 15 }} title={APP_ICONS.home} />
                        {/* <InfoButton onPress={() => setStatistics(true)} style={{ width: 40, fontWeight: "bold", padding: 8 }} title={APP_ICONS.statistics} /> */}
                        <InfoButton style={{ width: 130, fontWeight: "bold", position: 'absolute', right: 0, padding: 15 }} title={`${price} NAD`} />
                    </View>
                </>}
        </>
    );
};

export default StatisticsSpecView;