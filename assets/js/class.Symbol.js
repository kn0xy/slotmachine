const symbolCache = {};

export default class Symbol {
  constructor(name = Symbol.random()) {
    this.name = name;

    if (symbolCache[name]) {
      this.img = symbolCache[name].cloneNode(true);
    } else {
      // create webp compatibility wrapper
      const wrap = document.createElement('picture');
      const path = 'assets/symbols/'+name;

      // source: webp
      const srcWebp = document.createElement('source');
      srcWebp.type = "image/webp";
      srcWebp.srcset = path+'.webp';
      wrap.appendChild(srcWebp);

      // source: png
      const srcPng = document.createElement('source');
      srcPng.type = "image/png";
      srcPng.srcset = path+'.png';
      wrap.appendChild(srcPng);

      // img fallback
      const imgFb = document.createElement('img');
      imgFb.src = path+'.png';
      wrap.appendChild(imgFb);

      // cache the image
      this.img = wrap;
      symbolCache[name] = this.img;
    }
  }

  static preload() {
    Symbol.symbols.forEach((symbol) => {
      let preload = new Symbol(symbol);
      console.log('preload', symbol);
    });
    console.log('preloaded');
  }

  static get symbols() {
    return [
      "wp-mtl", "wp-grn", "wp-ylw", "wp-red", "wp-blu",
      "disc-mtl", "disc-grn", "disc-ylw", "disc-red", "disc-blu",
      "turbo-mtl", "turbo-grn", "turbo-ylw", "turbo-red", "turbo-blu",
      "batt-mtl", "batt-grn", "batt-ylw", "batt-red", "batt-blu"
    ];
  }

  static random() {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }
}
