export default class Highlight {
  constructor(xPos, yPos, hWidth, hHeight, hIndex, reelsElemId) {
    this.x = xPos;
    this.y = yPos;
    this.w = hWidth;
    this.h = hHeight;
    this.i = hIndex;
    this.r = reelsElemId;
    this.s = 0;
    this.t = null;
    this.createHighlight();
  }

  createHighlight() {
    // Add the styles
    this.createStyles();

    // Create the inner highlight
    const inner = document.createElement('div');
    inner.classList.add('highlightInner');
    inner.id = 'highlightInner-'+this.i;

    // Create the outer highlight
    const outer = document.createElement('div');
    outer.classList.add('highlightOuter');
    outer.id = 'highlightOuter-'+this.i;
    outer.style.top = this.y;
    outer.style.left = this.x;
    outer.style.width = 'calc('+this.w+' + 12px)';
    outer.style.height = 'calc('+this.h+' + 12px)';
    outer.append(inner);

    // Create the animated border placeholder
    const anim = document.createElement('div');
    anim.classList.add('highlightAnim');
    anim.id = 'highlightAnim-'+this.i;
    anim.style.top = this.y;
    anim.style.left = this.x;
    anim.style.width = 'calc('+this.w+' + 12px)';
    anim.style.height = 'calc('+this.h+' + 12px)';

    // Insert the highlight elements to the reels container
    const reelsContainer = document.getElementById(this.r);
    reelsContainer.prepend(outer);
    reelsContainer.prepend(anim);
  }

  createKeyframes() {
    const kfName = 'highlight_'+this.i+'_';
    let hkf = [];
    for(var hi=0; hi<4; hi++) {
      let hid = hi + 1;
      let kfn = kfName + hid;
      let kfs = '@keyframes '+kfn+'{0%{';
      if(hid === 1) {
        kfs += 'height:calc('+this.h+' + 10px);';
        kfs += 'width:5px;left:'+this.x+';border-top:10px dotted gold;';
        kfs += 'border-right:none;border-bottom:none;border-left:10px dotted gold;}';
        kfs += '100%{height:5px;width:calc('+this.w+' + 10px);left:'+this.x+';';
        kfs += 'border-top:10px dotted gold;border-right:none;border-bottom:none;';
        kfs += 'border-left:10px dotted gold;}}';
      } else if(hid === 2) {
        kfs += 'height:5px;width:calc('+this.w+' + 10px);left:'+this.x+';';
        kfs += 'border-top:10px dotted gold;border-right:10px dotted gold;';
        kfs += 'border-bottom:none;border-left: none;}100%{';
        kfs += 'height:calc('+this.h+' + 10px);width:5px;';
        kfs += 'left:calc('+this.x+' + '+this.w+' + 5px);border-top:10px dotted gold;';
        kfs += 'border-right:10px dotted gold;border-bottom:none;border-left:none;}}';
      } else if(hid === 3) {
        kfs += 'height:calc('+this.h+' + 10px);width:5px;';
        kfs += 'left:calc('+this.x+' + '+this.w+' + 5px);border-top:none;';
        kfs += 'border-right:10px dotted gold;border-bottom:10px dotted gold;';
        kfs += 'border-left:none;}100%{height:5px;width:calc('+this.w+' + 10px);';
        kfs += 'left:'+this.x+';top:calc('+this.y+' + '+this.h+' + 5px);';
        kfs += 'border-top:none;border-right:10px dotted gold;';
        kfs += 'border-bottom:10px dotted gold;border-left:none;}}';
      } else if(hid === 4) {
        kfs += 'height:5px;width:calc('+this.w+' + 10px);left:'+this.x+';';
        kfs += 'top:calc('+this.y+' + '+this.h+' + 5px);border-top:none;border-right:none;';
        kfs += 'border-bottom:10px dotted gold;border-left:10px dotted gold;}';
        kfs += '100%{height:calc('+this.h+' + 10px);width:5px;top:'+this.y+';';
        kfs += 'left:'+this.x+';border-top:none;border-right:none;';
        kfs += 'border-bottom:10px dotted gold;border-left:10px dotted gold;}}';
      }

      hkf.push({
        n: kfn,
        c: kfs
      });
    }
    return hkf;
  }

  createStyles() {
    const styleClass = '.anim_'+this.i+'_';
    const keyFrames = this.createKeyframes();
    const css = document.createElement('style');
    css.type = 'text/css';
    css.id = 'highlightStyles-'+this.i;
    let strStyles = '';

    for(var si=0; si<4; si++) {
      let sid = si + 1;
      let sn = styleClass + sid;
      strStyles += keyFrames[si].c;
      strStyles += sn+'{animation-name:'+keyFrames[si].n+'}';
    }

    if(css.styleSheet) {
      css.styleSheet.cssText = strStyles;
    } else {
      css.appendChild(document.createTextNode(strStyles));
    }

    document.getElementsByTagName('head')[0].appendChild(css);
  }

  startAnimation() {
    const ae = document.getElementById('highlightAnim-'+this.i);
    let tref = this;
    this.t = setInterval(function() {
      const cn = 'anim_'+tref.i+'_'+tref.s;
      ae.classList.remove(cn);
      if(tref.s === 4) {
        tref.s = 1;
      } else {
        tref.s++;
      }
      const nc = 'anim_'+tref.i+'_'+tref.s;
      ae.classList.add(nc);
    }, 250);
  }

  stopAnimation() {
    clearInterval(this.t);
    this.t = null;
    const ae = document.getElementById('highlightAnim-'+this.i);
    const cn = 'anim_'+this.i+'_'+this.s;
    ae.classList.remove(cn);
    this.s = 0;
  }

  removeHighlight() {
    const se = document.getElementById('highlightStyles-'+this.i);
    const ae = document.getElementById('highlightAnim-'+this.i);
    const oe = document.getElementById('highlightOuter-'+this.i);
    if(this.t) clearInterval(this.t);
    se.parentElement.removeChild(se);
    ae.parentElement.removeChild(ae);
    oe.parentElement.removeChild(oe);
  }
}
