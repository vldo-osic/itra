import {GenerateKeyHMAC} from "./GenerateKeyHMAC.js";
import {MovesRule} from "./MovesRule.js";
import {GenerateTable} from "./GenerateTable.js";
import collect from 'collect.js';
import readlineSync from 'readline-sync';

export let moves = process.argv.slice(2);
if (moves.length % 2 === 0) {
    console.warn('Количество ходов должно быть нечетным!')
    process.exit()
}
if (moves.length !== new Set(moves).size) {
    console.warn('Все ходы должны быть разными!')
    process.exit()
}

let movesRule = new MovesRule(moves);
let table = new GenerateTable(movesRule)
table.configRuleTable()

let computerMove = collect(moves).random()
let userMove

let cryptoModule = new GenerateKeyHMAC(computerMove)
cryptoModule.generateKey()
cryptoModule.generateHMAC()
console.log(`HMAC: ${cryptoModule.HMAC}`)

dialog()

console.log('You move: ' + userMove)
console.log('Computer move: ' + computerMove)
if (movesRule[userMove].more.includes(computerMove)) console.log("You lose!")
else if (movesRule[userMove].less.includes(computerMove)) console.log('You win!')
else console.log('Draw!')
console.log('HMAC key: ' + cryptoModule.key)

function dialog() {
    console.log('Available moves:')
    let i = 1;
    for (let move of moves) {
        console.log(`${i++} - ${move}`)
    }
    console.log(`0 - exit`)
    console.log(`? - help`)

    let answer = readlineSync.question('Enter your move: ')
    if (answer <= moves.length && answer > 0) userMove = moves[answer - 1]
    else switch (answer) {
        case '0':
            process.exit();
            break
        case '?':
            table.viewTable()
            dialog()
            break
        default:
            console.warn('Повторите ввод')
            dialog()
    }
}
