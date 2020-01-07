import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar-component');
  fetch('/event').then(function(response) {
    response.json().then(function(text) {
        for (var i = 0; i < text.length; i++) {
          text[i]['title'] = text[i].eventName;
          var date = new Date(text[i].date);
          date.setHours(parseInt(text[i].time.slice(0,2),10),parseInt(text[i].time.slice(3,5),10));
          text[i]['start'] = date.toISOString();
          console.log(date.toISOString())
        var calendar = new Calendar(calendarEl, {
          plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin ],
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          },
          minTime: '7:00:00',
          maxTime: '20:00:00',
          defaultDate: '2020-01-01',
          navLinks: true, // can click day/week names to navigate views
          editable: true,
          eventLimit: true, // allow "more" link when too many events
          events: text
        });
        calendar.render();
      }
    });
  });
  
});