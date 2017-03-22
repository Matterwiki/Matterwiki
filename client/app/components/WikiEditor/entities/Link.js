import React from 'react';

const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url}>
      {props.children || url}
    </a>
  );
}

export default Link;