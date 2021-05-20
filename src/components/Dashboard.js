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
  // INITIAL STATE
  state = { loading: false, focused: null };

  // SELECTPANEL INSTANCE METHOD
  selectPanel(id) {
    // this.setState is an instance method provided by the React.Component superclass.
    this.setState({
      focused: id,
    });
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
          id={panel.id}
          label={panel.label}
          value={panel.value}
          onSelect={this.selectPanel}
        />
      ));

    return <main className={dashboardClasses}>{panels}</main>;
  }
}

export default Dashboard;
