export class MovesRule { // Объект с правилами для каждого хода

    constructor(moves) {
        for (let move of moves) {
            this[move] = {
                move: move,
                more: getElementsBefore(moves, moves.indexOf(move), moves.length / 2), // Ходы сильнее данного
                less: getElementsBehind(moves, moves.indexOf(move), moves.length / 2), // Ходы слабее данного
            }
        }
    }

}

function getElementsBefore(array, index, radius) {
    let a = [];
    for (let i = 1; i <= radius; i++) {
        a.push(array[(index + i) % array.length]);
    }
    return a
}

function getElementsBehind(array, index, radius) {
    let a = [];
    for (let i = 1; i <= radius; i++) {
        a.push(array[(array.length + (index - i)) % array.length]);
    }
    return a
}
