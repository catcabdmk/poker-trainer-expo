import {StyleSheet, Text, View} from "react-native";


const positionColorMap = {
    'UTG1': '#ce292a',
    'UTG2': '#b34d4c',
    'UTG3': '#b1714b',
    'MP1': '#cc8000',
    'HJ': '#ca8019',
    'CO': '#fdf100',
    'BU': '#22f401',
    'SB': '#3bb4b5',
    'BB': '#9501f4'
}

export default function PositionView(props) {
    return <View style={[styles.gamePosLabel, {top: props.coordinates.top, left: props.coordinates.left}]}>
        <Text style={[styles.gamePosText, {color: positionColorMap[props.positionName]}]}>{props.positionName}</Text>
    </View>
}

const styles = StyleSheet.create({
    gamePosText: {
        fontWeight: "bold",
        fontSize: 18
    },
    gamePosLabel: {
        borderRadius: 60,
        borderColor: '#828282',
        borderWidth: 2,
        backgroundColor: '#000',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    }
});