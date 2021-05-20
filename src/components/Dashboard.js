import React, { Component } from 'react';
import Loading from 'components/Loading';
import Panel from 'components/Panel';

import classnames from 'classnames';

import axios from 'axios';

import {
  getTotalInterviews,
  getLeastPopularTimeSlot,
  getMostPopularDay,
  getInterviewsPerDay,
} from 'helpers/selectors';

import { setInterview } from 'helpers/reducers';

// Data
const data = [
  {
    id: 1,
    label: 'Total Interviews',
    getValue: getTotalInterviews,
  },
  {
    id: 2,
    label: 'Least Popular Time Slot',
    getValue: getLeastPopularTimeSlot,
  },
  {
    id: 3,
    label: 'Most Popular Day',
    getValue: getMostPopularDay,
  },
  {
    id: 4,
    label: 'Interviews Per Day',
    getValue: getInterviewsPerDay,
  },
];

class Dashboard extends Component {
  // INITIAL STATE
  state = {
    loading: true,
    focused: null,
    days: [],
    appointments: {},
    interviewers: {},
  };

  // LIFECYCLE METHODS
  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem('focused'));

    if (focused) {
      this.setState({ focused });
    }

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then(([days, appointments, interviewers]) => {
      this.setState({
        loading: false,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      });
    });

    // Connect to WebSocket
    this.socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (typeof data === 'object' && data.type === 'SET_INTERVIEW') {
        this.setState((previousState) =>
          setInterview(previousState, data.id, data.interview)
        );
      }
    };
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem('focused', JSON.stringify(this.state.focused));
    }
  }

  componentWillUnmount() {
    // Clean up WebSocket connection
    this.socket.close();
  }

  // SELECTPANEL INSTANCE METHOD
  selectPanel(id) {
    // this.setState is an instance method provided by the React.Component superclass.
    this.setState((previousState) => ({
      focused: previousState.focused !== null ? null : id, // set the value of focused back to null if the value of focused is currently set to a panel.
    }));
  }

  // RENDER
  /*
   * The only function that a component needs to declare is the render function.
   * This render function is equivalent to the body of the components that we declare as functions.
   */
  render() {
    const dashboardClasses = classnames('dashboard', {
      'dashboard--focused': this.state.focused,
    });

    if (this.state.loading) {
      return <Loading />;
    }
    // console.log(this.state); // Why here it only console.logs once?

    // When focused is null it means we are in the unfocused four-panel view.
    // When we are in focused mode, we don't want to render four panels; we want to render one.
    const panels = data
      .filter(
        (panel) =>
          this.state.focused === null || this.state.focused === panel.id
      )
      .map((panel) => (
        <Panel
          key={panel.id}
          label={panel.label}
          value={panel.getValue(this.state)}
          onSelect={(event) => this.selectPanel(panel.id)}
        />
      ));

    return <main className={dashboardClasses}>{panels}</main>;
  }
}

export default Dashboard;
