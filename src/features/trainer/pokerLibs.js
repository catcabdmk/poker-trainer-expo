const POKER_CARDS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const TEXT_SUIT_TO_CHAR = ['s', 'h', 'c', 'd'];


export function getComboFromPair(firstCard, firstSuit, secondCard, secondSuit) {
    let pairType = "o"
    if (firstSuit === secondSuit) {
        pairType = "s"
    } else if (firstCard === secondCard) {
        pairType = ""
    }
    if (POKER_CARDS.indexOf(firstCard) < POKER_CARDS.indexOf(secondCard)) {
        return firstCard + secondCard + pairType
    }
    return secondCard + firstCard + pairType
}


function getComboPairRange(comboRangeStart, comboRangeEnd) {
    let comboIndexStart = POKER_CARDS.indexOf(comboRangeStart[0])
    let comboIndexEnd = POKER_CARDS.indexOf(comboRangeEnd[0])

    let comboRange = []
    // let i = comboIndexStart
    // while (POKER_CARDS[i][0] !== comboRangeEnd[0] ) {
    for (let i = comboIndexStart; i <= comboIndexEnd; i++) {
        comboRange.push(POKER_CARDS[i] + POKER_CARDS[i])
        if (i === POKER_CARDS.length) break;
    }
    return comboRange
}

function getComboRange(comboRangeStart, comboRangeEnd, comboType) {
    let comboIndexStart = POKER_CARDS.indexOf(comboRangeStart[1])
    let comboIndexEnd = POKER_CARDS.indexOf(comboRangeEnd[1])
    let comboRange = []
    for (let i = comboIndexStart; i <= comboIndexEnd; i++) {
        comboRange.push(comboRangeStart[0] + POKER_CARDS[i] + comboType)
        if (i === POKER_CARDS.length) break;

    }
    return comboRange
}

export function convertFlopzillaRanges(handRangeStr) {
    const elements = handRangeStr.split(',');
    let convertedRanges = [];
    let i = 0;
    while (elements.length !== i) {
        let element = elements[i]
        if (element.includes("-")) {
            let comboRange = element.split("-")
            if (comboRange[0].length === 3) {
                convertedRanges = convertedRanges.concat(getComboRange(comboRange[0], comboRange[1], comboRange[0][2]))
            } else {
                convertedRanges = convertedRanges.concat(getComboPairRange(comboRange[0], comboRange[1]))
            };

        } else {
            convertedRanges.push(element)
        }
        i++;
        // console.log(i)
    }
    // console.log(convertedRanges)
    return convertedRanges

}

export function makeFullDeck() {
    const ranks = POKER_CARDS
    const suits = TEXT_SUIT_TO_CHAR
    let deckCards = ranks.map(r => suits.map(s => r + s)).reduce((prev, curr) => prev.concat(curr))
    return deckCards
}

/// A9s - Ah9h, As9s, Ac9c, Ad9d
/// AA - AsAh, AsAc, AsAd, AhAc, AhAd, AcAd
/// A9o - Ah9d, Ah9c, Ah9s, Ad9h, Ad9c, Ad9s, Ac9h, Ac9d, Ac9s, As9h, As9d, As9c

const suits = ['s', 'h', 'c', 'd'];

function generateCardArrayFromCombo(comboStr) {
    const cardArray = new Array()
    const firstCard = comboStr[0]
    const secondCard = comboStr[1]

    for (let first = 0; first < suits.length; first++) {
        const suit1 = suits[first];
        for (let second = first; second < suits.length; second++) {
            const suit2 = suits[second];
            if (suit1 === suit2) {
                if (comboStr[2] === 's') {
                    cardArray.push(firstCard + suit1 + secondCard + suit2)
                }
                continue
            }
            if (comboStr[2] === undefined) {
                cardArray.push(firstCard + suit1 + secondCard + suit2)
                continue
            }
            if (comboStr[2] === 'o') {
                cardArray.push(firstCard + suit1 + secondCard + suit2)
                cardArray.push(secondCard + suit1 + firstCard + suit2)
            }
        }

    }
    return cardArray
}



export function fillDeckWithRange(ranges) {
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    let deck = []
    ranges.forEach((range) => {
        deck = deck.concat(generateCardArrayFromCombo(range))
    })
    return deck.filter(onlyUnique)
}

export function getTwoRandomUniqCards(deck) {
    let firstCardIndex = Math.floor(Math.random() * deck.length)
    let cardOne = deck[firstCardIndex];
    deck.splice(firstCardIndex, 1)
    let cardTwo = deck[Math.floor(Math.random() * deck.length)];
    return [cardOne, cardTwo]
}
export function getRandomCombo(deck) {
    return deck[Math.floor(Math.random() * deck.length)]
}
let ranges = convertFlopzillaRanges("AA-77,AKo-AQo,AKs-A9s,KQs-KTs,QJs,JTs,T9s")
ranges = convertFlopzillaRanges("AA-22,AKo-A2o,KQo-K2o,QJo-Q2o,JTo-J2o,T9o-T2o,98o-92o,87o-82o,76o-72o,65o-62o,54o-52o,43o-42o,32o,AKs-A2s,KQs-K2s,QJs-Q2s,JTs-J2s,T9s-T2s,98s-92s,87s-82s,76s-72s,65s-62s,54s-52s,43s-42s,32s")
console.log(ranges);

let deck = fillDeckWithRange(ranges)
let cards = getTwoRandomUniqCards(deck)
let card = cards[0]
console.log(cards);
console.log(getComboFromPair(card[0], card[1], card[2], card[3]));

// console.log(generateCardArrayFromCombo('A9o'));
// console.log(generateCardArrayFromCombo('AA'));
// console.log(generateCardArrayFromCombo('A9s'));

