"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const SLOTS = document.getElementsByClassName("singleSlot");
const GAME = document.getElementById("slot_container");
const RESULT = document.getElementById("result");
const BUTTON = document.getElementById("playButton");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
function slotChange(slot, times, duration) {
    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
        for (let i = 1; i < times; i++) {
            slot.innerText = icons[Math.floor(Math.random() * icons.length)];
            yield delay(duration);
            let molt = times - 2 * slot.id;
            molt = molt < 0 ? molt * -1 : molt;
            duration += 2 * molt;
        }
        res(Math.floor(Math.random() * 3));
    }));
}
const icons = ["💎", "🍋", "🍉", "❤", "🔔", "🍒", "💰", "🤑", "👧"];
const declareWinners = (icons) => {
    var map = icons.reduce(function (prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});
    let prevValue = 0;
    for (let value in map) {
        if (map[value] > prevValue) {
            prevValue = map[value];
        }
    }
    console.log(prevValue);
    return createWinResult(prevValue);
};
const createWinResult = (points) => {
    let result;
    switch (points) {
        case 3:
            result = "You win!";
            break;
        case 4:
            result = "Big din!";
            break;
        case 5:
            result = "Jackpot!";
            break;
        default:
            result = "You loose!";
            break;
    }
    return result;
};
const initialAnimation = () => {
    let times = 10;
    let arrayPromise = [];
    return new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
        for (let item of SLOTS) {
            let promise = slotChange(item, (times += 2), 400);
            arrayPromise.push(promise);
        }
        Promise.all(arrayPromise).then(() => {
            let result = [];
            for (let item of SLOTS) {
                result.push(item.innerHTML);
            }
            res(result);
        });
    }));
};
const secondAnimation = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
        for (let i = 0; i < SLOTS.length; i++) {
            console.log("arrived");
            yield slotChange(SLOTS[i], 5, 500);
        }
        res("");
    }));
});
BUTTON.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    BUTTON.disabled = true;
    RESULT.style.display = "none";
    GAME.style.display = "flex";
    let slotsResult = yield initialAnimation();
    let gameResult = declareWinners(slotsResult);
    yield delay(1500).then(() => {
        RESULT.style.display = "flex";
        GAME.style.display = "none";
        RESULT.innerHTML = gameResult;
        BUTTON.disabled = false;
    });
}));
