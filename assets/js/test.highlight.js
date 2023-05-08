import Highlight from "./class.Highlight.js";

window.newHighlight = function(px, py, pw, ph, pi, pe) {
  let nh = new Highlight(px, py, pw, ph, pi, pe);
  return nh;
}
