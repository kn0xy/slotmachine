import Reel from "./class.Reel.js";
import Symbol from "./class.Symbol.js";

export default class SlotMachine {
  constructor(domElement) {
    Symbol.preload();

    this.currentSymbols = [
      ["turbo-mtl", "turbo-mtl", "turbo-mtl"],
      ["turbo-mtl", "turbo-mtl", "turbo-mtl"],
      ["turbo-mtl", "turbo-mtl", "turbo-mtl"],
      ["turbo-mtl", "turbo-mtl", "turbo-mtl"],
      ["turbo-mtl", "turbo-mtl", "turbo-mtl"],
    ];

    this.nextSymbols = [
      ["turbo-mtl", "turbo-mtl", "turbo-mtl"],
      ["turbo-mtl", "turbo-mtl", "turbo-mtl"],
      ["turbo-mtl", "turbo-mtl", "turbo-mtl"],
      ["turbo-mtl", "turbo-mtl", "turbo-mtl"],
      ["turbo-mtl", "turbo-mtl", "turbo-mtl"],
    ];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer, idx, this.currentSymbols[idx])
    );

    this.spinButton = document.getElementById("spin");
    this.spinButton.addEventListener("click", () => {
      if(deductCredit()) this.spinReels();
    });
  }

  spinReels() {
    this.currentSymbols = this.nextSymbols;
    this.nextSymbols = [
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
    ];

    this.onSpinStart();

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      })
    ).then(() => this.onSpinEnd());
  }

  onSpinStart() {
    this.spinButton.disabled = true;
    checkFirstReel(this.nextSymbols, this);
  }

  onSpinEnd() {
    this.spinButton.disabled = false;
    processResults(this.nextSymbols);
  }


}


