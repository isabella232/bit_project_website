
function toggleCal() 
{
    var elem = document.getElementById("toggle-cal");
    if (elem.innerHTML=="Calendar View")
    {
        elem.innerHTML = "List View";


    }
    else elem.innerHTML = "Calendar View";
    hideCalendar()
    showList()
    

}

function hideCalendar() {
  console.log("I  am running");
    var x = document.getElementById("calendar-component");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

function showList() {
  var x = document.getElementById("event-list");
  if (x.style.display === "none") {
    x.style.display = "inline";
  } else {
    x.style.display = "none";
  }
}