import {Image, StyleSheet} from "react-native";

export default function CardView(props) {
    return <Image
        source={require(`../../../../assets/cards/${props.card}.png`)}
        style={styles.cardSize}
    />
}

const styles = StyleSheet.create({
    cardSize: {
        width: 50,
        height: 72
    }
});