import React from 'react';

const StatusBar = (props) => {
  let { health, exp, level, weapon, attack } = props.player
  let { dungeon } = props
  return (
    <div className="status-bar">
      <ul>
        <li>Health: {health} </li>
        <li>Level: {level} </li>
        <li>Weapon: {weapon} </li>
        <li>Attack: {attack} </li>
        <li>Next Level: {exp} XP</li>
        <li>Dungeon: {dungeon}</li>
      </ul>
    </div>
  )
}

export default StatusBar;
