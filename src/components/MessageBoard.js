import React from 'react';

const MessageBoard = (props) => {
  let message = props.message
  return (
    <div>{message}</div>
  )
}

export default MessageBoard;
