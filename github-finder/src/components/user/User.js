import React, { Component } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Repos from '../Repos/Repos';

export class User extends Component {
  componentDidMount() {
    const { login } = this.props.match.params;
    this.props.getUser(login);
    this.props.getRepos(login);
  }

  render() {
    const {
      login,
      avatar_url,
      html_url,
      url,
      name,
      company,
      blog,
      email,
      hireable,
      followers,
      following,
      public_repos,
      public_gists,
      location,
      bio
    } = this.props.user;
    const { loading, repos } = this.props;
    console.log(repos);
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <Link to='/' className='btn btn-light'>
              Back to home page
            </Link>
            Hireable:{' '}
            {hireable ? (
              <i className='fa fa-check text-success'></i>
            ) : (
              <i className='fa fa-times-circle text-danger'></i>
            )}
            <div className='card grid-2'>
              <div className='all-center'>
                <img
                  src={avatar_url}
                  className='round-img'
                  style={{ width: '150px' }}
                />
                <h1>{name}</h1>
                <p>Location: {location}</p>
              </div>
              <div>
                {bio && (
                  <>
                    <h3>Bio</h3>
                    <p>{bio}</p>
                  </>
                )}
                <a href={html_url} className='btn btn-dark my-1'>
                  Visit Github Page
                </a>
                <ul>
                  <>
                    {login && (
                      <li>
                        <strong>User Name: </strong> {login}
                      </li>
                    )}
                    {company && (
                      <li>
                        <strong>Company: </strong> {company}
                      </li>
                    )}
                    {blog && (
                      <li>
                        <strong>Website: </strong> {blog}
                      </li>
                    )}
                  </>
                </ul>
              </div>
            </div>
            <div className='card text-center'>
              <div className='badge badge-primary'>Followers: {followers}</div>
              <div className='badge badge-success'>Following: {following}</div>
              <div className='badge badge-light'>
                Public Repos: {public_repos}
              </div>
              <div className='badge badge-dark'>
                Public Gists: {public_gists}
              </div>
            </div>
            <Repos repos={repos} />
          </div>
        )}
      </>
    );
  }
}

export default User;
