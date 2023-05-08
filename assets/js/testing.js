function deductCredit() {
  // Ensure user has sufficient credits to spin reels
  var credits = parseInt($('#credits').html());
  if(credits > 0) {
    // Deduct 1 credit
    credits--;
    $('#credits').html(credits);
  } else {
    // Insufficient funds
    alert('Insufficient credits!');
    console.log(document.getAnimations());
    return false;
  }
  return true;
}

function checkFirstReel(par, slot) {
  var types = [];
  var colors = [];

  for(var i=0; i<3; i++) {
    var fs = par[0][i].split('-');
    var ft = fs[0];
    var fc = fs[1];
    if(types.indexOf(ft) === -1) types.push(ft);
    if(colors.indexOf(fc) === -1) colors.push(fc);
  }

  if(types.length === 3 && colors.length === 3) {
    $('#coolStuff').html('COLOR LOCK!');
    for(var p=0; p<5; p++) {
      for(var r=0; r<3; r++) {
        var tpg = par[p][r].split('-');
        var next = tpg[0]+'-'+colors[r];
        slot.nextSymbols[p][r] = next;
      }
    }
    console.log('*** COLOR LOCK!!! ***');
  } else {
    /*
    setTimeout(function() {
      $(document.getAnimations()).each(function() {
        this.finish();
      });
    }, 100);
    */
  }
}

function processResults(results) {
  console.log(results);
  var wins = [];
  var pairs = [];
  var royals = [];
  var parsed = parseReels(results);
  if(parsed.royals.length) {
    for(var p=0; p<parsed.royals.length; p++) {
      royals.push(parsed.royals[p]);
    }
  }
  if(parsed.dubs.length) {
    for(var d=0; d<parsed.dubs.length; d++) {
      pairs.push(parsed.dubs[d]);
    }
  }
  if(parsed.trips.length) {
    for(var t=0; t<parsed.trips.length; t++) {
      wins.push(parsed.trips[t]);
    }
  }

  console.log('wins', wins);
  console.log('pairs', pairs);
  console.log('royals', royals);


}

function parseReels(reels) {
  var result = {
    trips: [],
    dubs: [],
    royals: []
  }
  for(var r=0; r<3; r++) {
    var c1 = reels[0][r];
    var c2 = reels[1][r];
    var c3 = reels[2][r];
    var c4 = reels[3][r];
    var c5 = reels[4][r];
    var trips = [];
    var dubs = [];

    if(c1===c2 && c1===c3 && c1===c4 && c1===c5) {
      result.royals.push(r);
    } else {
      // check for winning matches (3 of the same symbol)
      if(c1===c2 && c1===c3) {
        // winning match (First 3)
        var wo = {
          match: '123',
          row: r+1,
          item: c1
        };
        trips.push(wo);
      } else if(c2===c3 && c2===c4) {
        // winning match (Middle 3)
        var wo = {
          match: '234',
          row: r+1,
          item: c2
        };
        trips.push(wo);
      } else if(c3===c4 && c3===c5) {
        // winning match (Last 3)
        var wo = {
          match: '345',
          row: r+1,
          item: c3
        };
        trips.push(wo);
      }
      if(trips.length) result.trips.push(trips[0]);

      // Check for doubles
      var tt = (trips.length ? trips[0].item : false);
      if(c1 === c2) {
        if(c1 !== tt) {
          result.dubs.push({
            match: '12',
            row: r+1,
            item: c1
          });
        }
      }
      if(c2 === c3) {
        if(c2 !== tt) {
          result.dubs.push({
            match: '23',
            row: r+1,
            item: c2
          });
        }
      }
      if(c3 === c4) {
        if(c3 !== tt) {
          result.dubs.push({
            match: '34',
            row: r+1,
            item: c3
          });
        }
      }
      if(c4 === c5) {
        if(c4 !== tt) {
          result.dubs.push({
            match: '45',
            row: r+1,
            item: c4
          });
        }
      }
    }
  }
  return result;
}
