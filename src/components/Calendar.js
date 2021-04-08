import React, { Component, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

//////////////////////////////////

const MyeventsList = [
  {
    start: moment().toDate(),
    end: moment().add(0, 'day').toDate(),
    title: 'turno programado',
  },
];

const calendarDnd = () => {
  const [events, setEvents] = useState([MyeventsList]);
  const [eventResize, seteventResize] = useEffect;
  const [eventDrop, seteventDrop] = useEffect;

  seteventDrop = (data) => {
    console.log(data);
  };

  return (
    <div>
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView='month'
        events={events}
        localizer={localizer}
        onEventDrop={eventDrop}
        onEventResize={eventResize}
        resizable
        style={{ height: '100vh' }}
      />
      <button>Guardar</button>
    </div>
  );
};

export default calendarDnd;

//////////////////////////////////

class App extends Component {
  state = {
    events: [MyeventsList],
  };

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };

  onEventDrop = (data) => {
    console.log(data);
  };

  render() {
    return (
      <div className='App'>
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView='month'
          events={this.state.events}
          localizer={localizer}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: '100vh' }}
        />
      </div>
    );
  }
}

export default App;
