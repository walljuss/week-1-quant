
// screen clock and date

function date_now() {
  clock = document.getElementById('screen-clock');
  document.getElementById('screen-date')
  var currentDate = new Date();
  var minutes = currentDate.getMinutes();
  var hours = currentDate.getHours();
  var dayOfWeek = currentDate.getDay()
  var dayOfMonth = currentDate.getDate()
  var month = currentDate.getMonth()
  clock.textContent = ( hours + ":"  + minute_convert(minutes))
  dateText.textContent = (day_to_text(dayOfWeek) + ", " + dayOfMonth + " "+ month_to_text(month))
}

setInterval(date_now, 1000);

date_now();



function day_to_text(a) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return days[a];
}

function month_to_text(m) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[m];
}

function minute_convert(min) {
  if (min<10) {
    return "0" + min;
  } else {
    return min;
  }
}