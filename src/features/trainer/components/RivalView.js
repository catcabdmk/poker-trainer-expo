import {StyleSheet, View} from "react-native";
import PositionView from "./PositionView";


export default function RivalView(props) {
    return <View style={styles.rival}>
        <View style={[styles.board, {
            top: props.coordinates.top + 8,
            left: props.rivalNumber > 3 ? props.coordinates.left + 3 : props.coordinates.left - 103
        }]}/>
        <PositionView
            coordinates={props.coordinates}
            positionName={props.positionName}/>
    </View>
}

const styles = StyleSheet.create({
    rival: {
        position: 'absolute'
    },
    board: {
        position: 'absolute',
        borderRadius: 60,
        borderColor: '#828282',
        borderWidth: 2,
        backgroundColor: '#000',
        width: 160,
        height: 48
    }
});