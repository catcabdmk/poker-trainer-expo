import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {useDispatch, useSelector} from 'react-redux'
import {onFold, onRaise} from '../trainerSlice'
import RivalView from "./RivalView";
import CardsWithPositionView from "./CardsWithPositionView";


export default function Trainer(props) {

    const firstCard = useSelector((state) => state.player.firstCard)
    const secondCard = useSelector((state) => state.player.secondCard)
    const positionTag = useSelector((state) => state.player.positionTag)
    const rivalPositions = useSelector((state) => state.player.rivalPositions)
    const dispatch = useDispatch()

    return <View style={styles.container}>
        {
            rivalPositions.map((name, index) => <RivalView key={index}
                                                           rivalNumber={index}
                                                           coordinates={rivalCoordinates(index)}
                                                           positionName={name}/>)
        }
        <CardsWithPositionView top={styles.playerCoordinates.top} left={styles.playerCoordinates.left}
                               firstCard={firstCard} secondCard={secondCard}
                               positionName={positionTag}/>

        <View style={styles.containerButtons}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => dispatch(onRaise())}>
                <Text style={styles.buttonText}>RAISE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => dispatch(onFold())}>
                <Text style={styles.buttonText}>FOLD</Text>
            </TouchableOpacity>
        </View>
    </View>
}

function rivalCoordinates(index) {
    switch (index + 1) {
        case 1:
            return {top: 331, left: 189}
        case 2:
            return {top: 215, left: 97}
        case 3:
            return {top: 101, left: 140}
        case 4:
            return {top: 45, left: 296}
        case 5:
            return {top: 45, left: 429}
        case 6:
            return {top: 101, left: 585}
        case 7:
            return {top: 215, left: 627}
        case 8:
            return {top: 331, left: 536}
        default:
            console.log(`unknown rival index ${index}`);
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative'
    },
    containerButtons: {
        position: 'absolute',
        flexDirection: "row",
        justifyContent: "space-between",
        width: 264,
        top: 480,
        left: 388
    },
    buttonStyle: {
        borderRadius: 6,
        borderColor: '#696969',
        borderWidth: 3,
        backgroundColor: '#6C1008',
        width: 128,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white"
    },
    playerCoordinates: {
        top: 327,
        left: 346
    }
});