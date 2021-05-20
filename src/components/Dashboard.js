import React, { Component } from 'react';
import Loading from 'components/Loading';
import Panel from 'components/Panel';

import classnames from 'classnames';

// Mock Data
const data = [
  {
    id: 1,
    label: 'Total Interviews',
    value: 6,
  },
  {
    id: 2,
    label: 'Least Popular Time Slot',
    value: '1pm',
  },
  {
    id: 3,
    label: 'Most Popular Day',
    value: 'Wednesday',
  },
  {
    id: 4,
    label: 'Interviews Per Day',
    value: '2.3',
  },
];

class Dashboard extends Component {
  state = { loading: false };
  /*
   * The only function that a component needs to declare is the render function.
   * This render function is equivalent to the body of the components that we declare as functions.
   */
  render() {
    const dashboardClasses = classnames('dashboard');

    if (this.state.loading) {
      return <Loading />;
    }

    const panels = data.map((panel) => (
      <Panel
        key={panel.id}
        id={panel.id}
        label={panel.label}
        value={panel.value}
      />
    ));

    return <main className={dashboardClasses}>{panels}</main>;
  }
}

export default Dashboard;
