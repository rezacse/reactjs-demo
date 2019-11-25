import * as React from 'react';
import { Link } from 'react-router-dom';

export interface IHomeProps {
  auth: any;
}

class HomePage extends React.Component<IHomeProps> {
  render() {
    return (
      <div className="jumbotron">
        <h1>Pluralsight Administration</h1>
        <p>React, Redux and React Router for ultra-responsive web apps.</p>

        <button className="btn btn-primary" onClick={this.props.auth.login}>
          Login
        </button>
        {/* <Link to="about" className="btn btn-primary btn-lg">
        Learn more
      </Link> */}
      </div>
    );
  }
}

export default HomePage;
