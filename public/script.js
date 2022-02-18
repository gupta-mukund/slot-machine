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
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
function slotChange(slot, times, duration) {
    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
        for (let i = 1; i < times; i++) {
            slot.innerText = icons[Math.floor(Math.random() * 6)];
            yield delay(duration);
            let molt = times - 2 * slot.id;
            molt = molt < 0 ? molt * -1 : molt;
            duration += 2 * molt;
        }
        res(Math.floor(Math.random() * 3));
    }));
}
const icons = ["💎", "🍋", "🍉", "❤", "🔔", "🍒"];
// window.onload = () => {
//   for (let i = 0; i < 10; i++) {
//     setTimeout(() => {
//       (<HTMLDivElement>SLOTS[0]).innerText = i as unknown as string;
//     }, 500 * i);
//   }
// };
// const secondAnimation = async () => {
//   let i = 0;
//   let duration = 500;
//   for (let j = 0; j < 100; j++) {
//     i = (await slotChange(
//       SLOTS[i] as HTMLDivElement,
//       Math.floor(Math.random() * 5),
//       duration
//     )) as number;
//     duration += 50;
//   }
// };
const declareWinners = () => {
    let same = 0;
    for (let i = 0; i < SLOTS.length - 1; i++) {
        if (SLOTS[i].innerHTML == SLOTS[i + 1].innerHTML) {
            same++;
        }
    }
    console.log(same);
};
const initialAnimation = () => {
    let times = 10;
    let arrayPromise = [];
    return new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
        for (let item of SLOTS) {
            let promise = slotChange(item, (times += 2), 400);
            arrayPromise.push(promise);
        }
        Promise.all(arrayPromise).then(() => res("done"));
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
window.onload = () => {
    initialAnimation().then(() => declareWinners());
    // .then((res) => {
    //   console.log(res);
    //   secondAnimation();
    // })
    // .then(() => declareWinners());
};
