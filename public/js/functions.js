function secondsTimeSpanToHMS(s) {
  var h = Math.floor(s/3600); //Get whole hours
  s -= h*3600;
  var m = Math.floor(s/60); //Get remaining minutes
  s -= m*60;
  var timestring = h + "h " + (m < 10 ? '0' + m : m) + "m " + (s < 10 ? '0' + s : s) + "s"; 
  return timestring;
}

function bytesToMega(val){
  var gb = Math.floor(val / 1000 / 1000 / 1000);
  val -= gb * 1000 * 1000 * 1000;
  var mb = Math.floor(val / 1000 / 1000);
  val -= mb * 1000 * 1000;
  var kb = Math.floor(val / 1000);
  val -= kb * 1000;
  val = Math.floor(val);

  var anyGb = gb > 0;
  var anyMb = mb > 0;
  var anyKb = kb > 0;
  var anyB = val > 0;
  
  return (anyGb ? gb + " GB " : "") + (anyMb ? mb + " MB " : "") + (anyKb ? kb + " KB " : "") + (anyB ? val + " B" : "");
}