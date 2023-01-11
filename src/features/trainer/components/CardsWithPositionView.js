import {StyleSheet, View} from "react-native";
import CardPairView from "./CardPairView";
import PositionView from "./PositionView";


export default function CardsWithPositionView(props) {
    return <View style={[styles.viewSize, {top: props.top, left: props.left}]}>
        <CardPairView firstCard={props.firstCard} secondCard={props.secondCard}/>
        <PositionView coordinates={styles.coordinates} positionName={props.positionName}/>
    </View>
}

const styles = StyleSheet.create({
    viewSize: {
        width: 130,
        height: 112,
    },
    coordinates: {
        top: -25,
        left: 72,
    }
});