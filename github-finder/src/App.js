import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/user/Users';
import Search from './components/user/Search';
import About from './components/pages/About';
import User from './components/user/User';

import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(
      `${process.env.REACT_APP_GITHUB_API_URL}/search/users?q=${text}
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &secret=${process.env.REACT_APP_GITHUB_SECRET}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  getUser = async userName => {
    this.setState({ loading: true });

    const res = await axios.get(
      `${process.env.REACT_APP_GITHUB_API_URL}/users/${userName}
      ?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &secret=${process.env.REACT_APP_GITHUB_SECRET}`
    );

    this.setState({ user: res.data, loading: false });
  };

  getRepos = async userName => {
    this.setState({ loading: true });

    const res = await axios.get(
      `${process.env.REACT_APP_GITHUB_API_URL}/users/${userName}/repos?per_page=5&sort=created:asc
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &secret=${process.env.REACT_APP_GITHUB_SECRET}`
    );

    this.setState({ repos: res.data, loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg: msg,
        type: type
      }
    });

    setTimeout(() => {
      this.setState({
        alert: null
      });
    }, 2000);
  };

  render() {
    const { users, user, loading, alert, repos } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={() => {
                  return (
                    <>
                      <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        setAlert={this.setAlert}
                        isShowClearOption={users.length > 0}
                      />
                      <Users users={users} loading={loading} />
                    </>
                  );
                }}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                    getRepos={this.getRepos}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
