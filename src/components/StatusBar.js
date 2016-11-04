import React, { Component } from 'react';

const StatusBar = (props) => {
  console.log(props)
  let { health, exp, level, weapon, attack } = props.player
  return (
    <div className="status-bar">
      <ul>
        <li>Health: {health} </li>
        <li>Level: {level} </li>
        <li>Exp: {exp} </li>
        <li>Weapon: {weapon} </li>
        <li>Attack: {attack} </li>
      </ul>
    </div>
  )
}

export default StatusBar;
