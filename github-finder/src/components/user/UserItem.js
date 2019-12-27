import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItem = ({ user: { login, avatar_url, html_url } }) => {
  return (
    <div className='card text-center'>
      <img src={avatar_url} className='round-img' style={{ width: '100px' }} />
      <div>{login}</div>
      <div>
        <Link to={`/user/${login}`} className='btn btn-dark'>
          More
        </Link>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;
