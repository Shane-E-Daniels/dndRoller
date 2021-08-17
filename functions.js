//grab elements from the page and store as a variable for modification later
const input = document.getElementById("in_Number");
const total = document.getElementById("total");
const avg = document.getElementById("average");
const rolls = document.getElementById("rolls");
const adv = document.getElementById("adv");
const dis = document.getElementById("dis");
const modNum = document.getElementById("modNum");

modNum.value = 0

//begin the rolling requested
function roll(max) {
  //check for advantage or disadvantage
  const advdis = (adv.checked || dis.checked ? true : false);

  //clear the output fields
  total.innerHTML = "";
  rolls.innerHTML = "";
  avg.innerHTML = "";
  
  if (advdis === false) {
    var times = input.value;

    //reset counter variable
    var i = 0;

    //run a loop while i is less than requested number of rolls
    while (i < times) {
      //trigger the roller function
      var result = roller(max);
      var textreturn =
        //if the dice rolled was a 20, display crits and crit fails.
        max == 20 && adv.checked == false && dis.checked == false
          ? result == 20
            ? " <span style='color:green'><b>Crit! (20)</b></span>"
            : result == 1
                ? " <span style='color:red'><b>Fail! (1)</b></span>"
                : "<b>" + parseInt(result) + "</b>"
          : "<b>" + parseInt(result) + "</b>";

      //add result to running result display
      rolls.innerHTML = rolls.innerHTML + textreturn;
      //add result to total display, checking if there is no value already first.
      if (total.innerHTML) {
        total.innerHTML = parseInt(total.innerHTML) + (result) + (result != 20 && result != 1 ? parseInt(modNum.value) : 0);
      } else {
        total.innerHTML = (result) + (result != 20 && result != 1 ? parseInt(modNum.value) : 0);
      }
      //add result to average display
      avg.innerHTML = " (avg: " + parseInt(total.innerHTML) / input.value + ")";

      //add 1 to the counter variable
      i = i + 1;
      //update the individual roll text with progress through requested rolls
      rolls.innerHTML =
        rolls.innerHTML +
        "<small><code> (" +
        i +
        " of " +
        times +
        " times d" +
        max +
        ") with a modifier of "+modNum.value+"</code></small><br />";
    }
  } else {
    total.innerHTML = "";
    rolls.innerHTML = "";
    avg.innerHTML = "";

    var x = roller(max);
    var y = roller(max);
    var high = (x >= y ? x : y);
    var low = (x <= y ? x : y);

    var textreturn =
      adv.checked == true
        ? (high == 20
            ? " <span style='color:green'><b>Crit! (20)</b></span> (Lower was " +
              low +
              ") + "+modNum.value+" modifier"
            : (high == 1
                ? " <span style='color:red'><b>Fail! (1)</b></span> (Lower was " +
                  low +
                  ") + "+modNum.value+" modifier"
                : "<b>" + high + "</b> (Lower was " + low + ") + "+modNum.value+" modifier"))
        : (low == 1
            ? " <span style='color:red'><b>Fail! (1)</b></span> (Higher was " +
              high +
              ") + "+modNum.value+" modifier"
            : (low == 20
                ? " <span style='color:green'><b>Crit! (20)</b></span> (Higher was " +
                  high +
                  ") + "+modNum.value+" modifier"
                : "<b>" + low + "</b> (Higher was " + high + ") + "+modNum.value+" modifier"));
    rolls.innerHTML = rolls.innerHTML + textreturn;
    total.innerHTML = adv.checked ? high + parseInt(modNum.value) : low + parseInt(modNum.value);
  }
}

//roll the dice once
function roller(max) {
    //generate the rolled dice based on the selected dice type (max)
    return 1 + Math.floor(Math.random() * max);
  }
  
  function checkAdvDis() {
    if (adv.checked || dis.checked) {
      return true;
    } else {
      return false;
    }
  }

// clears the output fields
function rollClear() {
  rolls.innerHTML = "";
  input.value = 1;
  total.innerHTML = "";
  avg.innerHTML = "";
  adv.checked = false;
  dis.checked = false;
  strait.checked = true;
  modNum.value = 0
}
