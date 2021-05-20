import React, { Component } from 'react';
import Loading from 'components/Loading';

import classnames from 'classnames';

class Dashboard extends Component {
  state = { loading: true };
  /*
   * The only function that a component needs to declare is the render function.
   * This render function is equivalent to the body of the components that we declare as functions.
   */
  render() {
    const dashboardClasses = classnames('dashboard');

    if (this.state.loading) {
      return <Loading />;
    }

    return <main className={dashboardClasses} />;
  }
}

export default Dashboard;
