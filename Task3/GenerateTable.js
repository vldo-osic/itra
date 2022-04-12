import {moves} from "./rps.js"

export class GenerateTable {
    movesRule = {};
    ruleTable = {};

    constructor(rules) {
        this.movesRule = Object.assign({}, rules)
    }

    configRuleTable() {
        for (let move of moves) {
            let ruleForThisMove = {}
            for (let rule in this.movesRule) {
                if (this.movesRule[rule].more.includes(move)) {
                    ruleForThisMove[rule] = 'Lose';
                } else if (this.movesRule[rule].less.includes(move)) {
                    ruleForThisMove[rule] = 'Win';
                } else {
                    ruleForThisMove[rule] = 'Draw';
                }
            }
            this.ruleTable[move] = ruleForThisMove;
        }
    }

    viewTable() {
        console.table(this.ruleTable)
    }
}