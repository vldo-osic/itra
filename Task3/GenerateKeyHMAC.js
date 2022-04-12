import random from "js-crypto-random";
import crypto from "crypto";

export class GenerateKeyHMAC {
    move;
    key;
    HMAC;

    constructor(value) {
        this.move = value
    }

    generateKey() {
        this.key = random.getRandomAsciiString(32)
    }

    generateHMAC() {
        this.HMAC = crypto.createHmac('sha3-256', this.key)
            .update(this.move)
            .digest('hex')
    }

}

