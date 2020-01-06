// 'use strict';
// import React from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
// import { render } from "react-dom";
// import "./styles.css";


// // must manually import the stylesheets for each plugin
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

// export default class DemoApp extends React.Component {
//   calendarComponentRef = React.createRef();

//   state = {
//     calendarWeekends: true,
//     calendarEvents: [
//       // initial event data
//       { title: "Event Now", start: new Date() }
//     ]
//   };

//   render() {
//     return (
//       <div className="demo-app">
//         <div className="demo-app-top">
//           <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
//           <button onClick={this.gotoPast}>go to a date in the past</button>
//           &nbsp; (also, click a date/time to add an event)
//         </div>
//         <div className="demo-app-calendar">
//           <FullCalendar
//             defaultView="dayGridMonth"
//             header={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
//             }}
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             ref={this.calendarComponentRef}
//             weekends={this.state.calendarWeekends}
//             events={this.state.calendarEvents}
//             dateClick={this.handleDateClick}
//           />
//         </div>
//       </div>
//     );
//   }

//   toggleWeekends = () => {
//     this.setState({
//       // update a property
//       calendarWeekends: !this.state.calendarWeekends
//     });
//   };

//   gotoPast = () => {
//     let calendarApi = this.calendarComponentRef.current.getApi();
//     calendarApi.gotoDate("2020-01-01"); // call a method on the Calendar object
//   };

//   handleDateClick = arg => {
//     if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
//       this.setState({
//         // add new event data
//         calendarEvents: this.state.calendarEvents.concat({
//           // creates a new array
//           title: "New Event",
//           start: arg.date,
//           allDay: arg.allDay
//         })
//       });
//     }
//   };
// }
// render(<DemoApp />, document.getElementById("calendar-component"));
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.state = { liked: false };
    return _this;
  }

  _createClass(Calendar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'button',
        { onClick: function onClick() {
            return _this2.setState({ liked: true });
          } },
        'Calendar'
      );
    }
  }]);

  return Calendar;
}(React.Component);

var domContainer = document.querySelector('#calendar-component');
ReactDOM.render(React.createElement(Calendar, null), domContainer);