import { Calendar, refineProps } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import Chat from './chatroom';
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import bootstrapPlugin from '@fullcalendar/bootstrap';

import { Button,Modal } from 'react-bootstrap'

import axios from 'axios';

function Example(props) {
  return (
    <>      
      <Modal
        show = {props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.eventName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Location</h4>
          {props.location}
          <h4>Description</h4>
          <p>
            {props.description}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onChange}>Close</Button>
          <Button><a href={props.route} > Go to Event Page </a></Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar-component');
  if (calendarEl){
    fetch('/event').then(function(response) {
      response.json().then(function(text) {
          var events = [];     
          for (var i = 0; i < text.length; i++) {
            var date = new Date(text[i].date);          
            date.setHours(parseInt(text[i].time.slice(0,2),10),parseInt(text[i].time.slice(3,5),10));
            var end_date = new Date(text[i].end_date);          
            end_date.setHours(parseInt(text[i].end_time.slice(0,2),10),parseInt(text[i].end_time.slice(3,5),10));
            console.log(date.toISOString())
            console.log(end_date.toISOString())
            events.push({
              "title":  text[i].eventName,
              "start": date.toISOString(),
              "end": end_date.toISOString(),
            });
          }
          var calendar = new Calendar(calendarEl, {
            plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, bootstrapPlugin  ],
            header: {
              left: 'prev,next, today',
              center: 'title',
              right: 'timeGridWeek,timeGridDay,listWeek'
            },
            defaultView: 'dayGridMonth',
            minTime: '7:00:00',
            maxTime: '18:00:00',
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: {
              events
            },
            eventTextColor: '#ffffff',
            eventColor: '#F2A64A',
            themeSystem: 'bootstrap',
            defaultView: 'timeGridWeek',
            eventClick: async function(info){  
              console.log("event click")
              console.log(info)
              console.log(info.event.title)
              async function getDataAxios(){
                const response =
                  await axios.get("/event?eventName="+ info.event.title +"&findEvent=True")
                  console.log(response.data)
                  event = response.data[0]
                  var show = true;
                  let onChange=()=>{
                    console.log("onchange")
                    console.log(show)
                    show = false
                    console.log("/events/view?eventName="+info.event.title)
                    ReactDOM.render(<Example show={show} onChange={onChange} eventName={info.event.title} 
                      description={event.description} location={event.location} route={"/events/view?eventName="+info.event.title}/>,  document.getElementById('modal-event'));
                  }
                  ReactDOM.render(<Example show={show} onChange={onChange} eventName={info.event.title}
                     description={event.description} location={event.location} route={"/events/view?eventName="+info.event.title} />,  document.getElementById('modal-event'));
                  
              }
              getDataAxios()             
            }
          });
          calendar.render();
      });
    });
  }
});
const navBar = (
  <ul className="header">          
    <img src="//static1.squarespace.com/static/5cb55271b914494e48f5546b/t/5d22449b59005400016749ca/1575162183637/?format=1500w" alt="bit project" className="Header-branding-logo"/>
    <li className="nav-style"><a href="contact.html">Contact</a></li>
    <li className="nav-style"><a href="Login.html">Log in</a></li>
    <li className="nav-style"><a href="/events">Events</a></li>
    <li className="nav-style"><a href="index.html">Home</a></li>
  </ul>
);
//ReactDOM.render(navBar, document.getElementsByTagName("header")[0]);
console.log("index")
ReactDOM.render(<Chat />, document.getElementById('chat'));
