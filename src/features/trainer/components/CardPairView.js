import {StyleSheet, View} from "react-native";
import CardView from "./CardView";

export default function CardPairView(props) {
    return <View style={styles.cardPar}>
        <CardView card={props.firstCard}/>
        <CardView card={props.secondCard}/>
    </View>
}

const styles = StyleSheet.create({
    cardPar: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 100,
        height: 72
    }
});