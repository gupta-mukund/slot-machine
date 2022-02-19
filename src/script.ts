const SLOTS = document.getElementsByClassName("singleSlot");
const GAME: HTMLDivElement = document.getElementById(
  "slot_container"
) as HTMLDivElement;
const RESULT: HTMLDivElement = document.getElementById(
  "result"
) as HTMLDivElement;
const BUTTON: HTMLButtonElement = document.getElementById(
  "playButton"
) as HTMLButtonElement;
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function slotChange(slot: HTMLDivElement, times: number, duration: number) {
  return new Promise(async (res, rej) => {
    for (let i = 1; i < times; i++) {
      slot.innerText = icons[Math.floor(Math.random() * icons.length)];
      await delay(duration);
      let molt = times - 2 * (slot.id as unknown as number);
      molt = molt < 0 ? molt * -1 : molt;
      duration += 2 * molt;
    }
    res(Math.floor(Math.random() * 3));
  });
}

const icons = ["💎", "🍋", "🍉", "❤", "🔔", "🍒", "💰", "🤑", "👧"];

const declareWinners = (icons: any): string => {
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

const createWinResult = (points: number): string => {
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
  let arrayPromise: Promise<unknown>[] = [];
  return new Promise(async (res, rej) => {
    for (let item of SLOTS) {
      let promise = slotChange(item as HTMLDivElement, (times += 2), 400);
      arrayPromise.push(promise);
    }
    Promise.all(arrayPromise).then(() => {
      let result: string[] = [];
      for (let item of SLOTS) {
        result.push(item.innerHTML);
      }
      res(result);
    });
  });
};
const secondAnimation = async () => {
  return new Promise(async (res, rej) => {
    for (let i = 0; i < SLOTS.length; i++) {
      console.log("arrived");
      await slotChange(<HTMLDivElement>SLOTS[i], 5, 500);
    }

    res("");
  });
};
BUTTON.addEventListener("click", async () => {
  BUTTON.disabled = true;
  RESULT.style.display = "none";
  GAME.style.display = "flex";
  let slotsResult: unknown = await initialAnimation();
  let gameResult = declareWinners(slotsResult);
  await delay(1500).then(() => {
    RESULT.style.display = "flex";
    GAME.style.display = "none";
    RESULT.innerHTML = gameResult;
    BUTTON.disabled = false;
  });
});
