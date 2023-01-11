import {useState} from "react"
import {
    fillDeckWithRange,
    getComboFromPair,
    getRandomCombo,
    getTwoRandomUniqCards,
    makeFullDeck
} from './pokerLibs'


export const gamePositions = ['UTG1', 'UTG2', 'UTG3', 'MP1', 'HJ', 'CO', 'BU', 'SB']
export const usePosition = () => {
    const positionsColors = {
        'UTG1': '#d72c2f',
        'UTG2': '#ba4e4e',
        'UTG3': '#b6724e',
        'MP1': '#d28101',
        'HJ': '#d08128',
        'CO': '#fff200',
        'BU': '#01c101',
        'SB': '#00b4b4'
    }
    const [enabledPositions, setenabledPositions] = useState(gamePositions)

    function disablePosition(posName) {
        setenabledPositions(enabledPositions.filter(function (e) {
            return e !== posName
        }))
    }

    function getEnabledRngPosition() {
        return enabledPositions[Math.floor(Math.random() * enabledPositions.length)]
    }

    function togglePosition(posName) {

        if (!isPosEnabled(posName)) {
            setenabledPositions([...enabledPositions, posName])
        } else {
            disablePosition(posName)
        }
        console.log(enabledPositions);

    }

    function isPosEnabled(posTag) {
        if (enabledPositions.indexOf(posTag) === -1) return false
        return true
    }

    function getPosIndex(posTag) {
        return gamePositions.indexOf(posTag)
    }


    return {
        enabledPositions,
        positions: gamePositions,
        positionsColors,
        disablePosition,
        getEnabledRngPosition,
        togglePosition,
        isPosEnabled,
        getPosIndex
    }
}


export const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);
    const [rowId, setRowId] = useState(0);

    function toggle(id) {
        setRowId(id)
        setIsShowing(!isShowing);
    }

    return {
        isShowing,
        toggle,
        rowId,
    }
};

const TEXT_SUIT_TO_CHAR = ['s', 'h', 'c', 'd'];
const RANK_TO_CHAR = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];


export const useCardGenerator = (genMap) => {
    let fullDeck = makeFullDeck()

    function generateCardPair(position) {
        if (position === undefined) {
            return getTwoRandomUniqCards(fullDeck)
        } else {
            let range = genMap.get(position)
            let deck = fillDeckWithRange(range)
            let combo = getRandomCombo(deck)
            return [combo.substring(0, 2), combo.substring(2, 4)]
        }
    }

    function getCombo(cardOne, cardTwo) {
        return getComboFromPair(cardOne[0], cardOne[1], cardTwo[0], cardTwo[1])
    }


    return {generateCardPair, getCombo}
}