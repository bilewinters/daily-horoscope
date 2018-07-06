"use strict";

const Alexa = require('alexa-sdk');
const http = require('http');

const horoscopeURL = "http://sandipbgt.com/theastrologer/api/horoscope/";
const signs = [
    "aries",
    "taurus",
    "gemini",
    "cancer",
    "leo",
    "virgo",
    "libra",
    "scorpio",
    "sagittarius",
    "capricorn",
    "aquarius",
    "pisces"
];

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', "Tell me, what star sign are you?");
    },

    'GetHoroscope': function () {
        let sign = this.event.request.intent.slots.Sign.value;
        if (sign == undefined) {
            this.emit("LaunchRequest")
        } else if (sign === "help") {
            this.emit("AMAZON.HelpIntent")
        } else {
            sign = sign.toLowerCase();
            if (!recogniseSign(sign)) {
                this.emit(':ask', "I'm sorry, I don't recognise the sign " + sign + ", what star sign are you?");
            } else {
                sendPrediction(sign, this);
            }
        }
    },

    'GetLuckyNumbers': function() {
        const size = getLuckyNumber(2,6);
        let nums = "Your lucky numbers are ";
        for (let i = 0 ; i < size ; i++) {
            const num = getLuckyNumber(1,50);
            if (i+1 == size) {
                nums += "and " + num;
            } else {
                nums += num;
                if (i+2 == size) {
                    nums += " ";
                } else {
                    nums += ", ";
                }
            }
        }

        this.emit(':tell', nums);
    },

    'AMAZON.HelpIntent': function() {
        this.emit(':ask', "Don't panic! You can ask me for a horoscope for your star sign. " +
            "Or you can ask me for your 'lucky numbers'. So, what star sign are you?");
    },

    'AMAZON.StopIntent': function() {
        this.emit(':tell', "OK, goodbye!");
    }
};

function recogniseSign(sign) {
    return signs.indexOf(sign) > -1;
}

function getLuckyNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sendPrediction(sign, emitter) {
    http.get(horoscopeURL + sign + "/today/", (res) => {
        let body = "";
        res.on("data", chunk => {
            body += chunk;
        });
        res.on("end", () => {
            try {
                const parsed = JSON.parse(body);
                let horoscope = parsed.horoscope;
                const authorIndex = horoscope.indexOf("(c) Kelli Fox");
                if (authorIndex > -1) {
                    horoscope = horoscope.substr(0, authorIndex);
                }
                emitter.emit(':tell', horoscope);
            } catch (e) {
                handleError(e, emitter);
            }
        })
    }).on('error', (e) => {
        handleError(e, emitter);
    });
}

function handleError(error, emitter) {
    console.log("Got error while requesting horoscope: " + (error.message ? error.message : error));
    emitter.emit(':tell', "There was a problem getting your horoscope from our provider. Please try again later.");
}

exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};