import React from 'react';

const MessageBoard = (props) => {
  let message = props.message
  return (
    <p>{message}</p>
  )
}

export default MessageBoard;
