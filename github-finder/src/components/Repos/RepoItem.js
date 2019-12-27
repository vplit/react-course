import React from 'react';

function RepoItem({ repo }) {
  return (
    <div className='card'>
      <a href={repo.html_url}> {repo.name}</a>
    </div>
  );
}

export default RepoItem;
