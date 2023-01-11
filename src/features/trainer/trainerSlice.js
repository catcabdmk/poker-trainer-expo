import {createSlice} from '@reduxjs/toolkit'
import {convertFlopzillaRanges} from "./pokerLibs";
import {useCardGenerator} from "./TrainerLibs";

let initialRange = new Map();
initialRange.set('UTG1', convertFlopzillaRanges("77+,AQo+,A9s+,KTs+,QJs,JTs,T9s"))
initialRange.set('UTG2', convertFlopzillaRanges("66+,AQo+,A9s+,KTs+,QTs+,JTs,T9s"))
initialRange.set('UTG3', convertFlopzillaRanges("66+,AJo+,KQo,A8s+,A5s,A4s,KTs+,QTs+,JTs,T9s"))
initialRange.set('MP1', convertFlopzillaRanges("55+,AJo+,KQo,A2s+,K9s+,Q9s+,J9s+,T9s,98s"))
initialRange.set('HJ', convertFlopzillaRanges("44+,ATo+,KJo+,QJo,A2s+,K9s+,Q9s+,J9s+,T9s,98s,87s"))
initialRange.set('CO', convertFlopzillaRanges("22+,A9o+,KTo+,QTo+,JTo,A2s+,K7s+,Q8s+,J8s+,T8s+,97s+,87s,76s"))
initialRange.set('BU', convertFlopzillaRanges("22+,A4o+,K8o+,Q9o+,J9o+,T9o,98o,87o,A2s+,K2s+,Q4s+,J5s+,T6s+,96s+,86s+,75s+,65s,54s"))
initialRange.set('SB', convertFlopzillaRanges("22+,A5o+,K8o+,Q9o+,J9o+,T9o,98o,A2s+,K2s+,Q2s+,J4s+,T6s+,95s+,85s+,75s+,64s+,54s"))
const generator = useCardGenerator(initialRange)

const allPositions = ['UTG1', 'UTG2', 'UTG3', 'MP1', 'HJ', 'CO', 'BU', 'SB', 'BB']
console.log(`allPositions: ${allPositions}`)
const playerPositions = [...allPositions];
playerPositions.splice(8, 1);

const randomPosition = () => playerPositions[Math.floor(Math.random() * playerPositions.length)];
const buildRivals = playerPosition => {
    let playerIndex = allPositions.indexOf(playerPosition);
    return allPositions.slice(playerIndex + 1).concat(allPositions.slice(0, playerIndex));
};
const buildRandomState = () => {
    const playerPosition = randomPosition()
    let [cardOne, cardTwo] = generator.generateCardPair(playerPosition)
    return {
        firstCard: cardOne,
        secondCard: cardTwo,
        positionTag: playerPosition,
        rivalPositions: buildRivals(playerPosition)
    }
};

export const trainerSlice = createSlice({
    name: 'player',
    initialState: buildRandomState(),
    reducers: {
        onRaise: (state) => {
            const rndState = buildRandomState()

            state.firstCard = rndState.firstCard
            state.secondCard = rndState.secondCard
            state.positionTag = rndState.positionTag
            state.rivalPositions = rndState.rivalPositions
        },
        onFold: (state) => {
            const rndState = buildRandomState()

            state.firstCard = rndState.firstCard
            state.secondCard = rndState.secondCard
            state.positionTag = rndState.positionTag
            state.rivalPositions = rndState.rivalPositions
        }
    },
})

export const {onRaise, onFold} = trainerSlice.actions

export default trainerSlice.reducer