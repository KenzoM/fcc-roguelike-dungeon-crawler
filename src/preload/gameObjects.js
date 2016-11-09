
const weapons = [
	[ // dungeon 1 weapons
		{ name: "Knife", damage: 2, coords: null},
		{ name: "Sword", damage: 3, coords: null}
	],
	[ // dungeon 2 weapons
		{ name: "Crossbow", damage: 4, coords: null },
		{ name: "Pistol", damage: 5, coords: null }
	],
	[ // dungeon 3 weapons
		{name: "Shotgun", damage: 6, coords: null},
    {name: "Bazooka", damage: 7, coords: null}
	]
]

const items = [
  [
    { name: "banana", health: 20, coords: null },
    { name: "banana", health: 20, coords: null },
    { name: "avocado", health: 40, coords: null }
  ],
  [
    { name: "bacon", health: 50, coords: null },
    { name: "sandwich", health: 60, coords: null },
    { name: "pizza", health: 80, coords: null }
  ],
  [
    { name: "bacon", health: 50, coords: null },
    { name: "pizza", health: 80, coords: null },
    { name: "steak", health: 100, coords: null }
  ]
]

const enemies = [
  [
    {health: 100, level: 1, exp: 50, strength: 10},
    {health: 100, level: 1, exp: 50, strength: 10},
    {health: 100, level: 1, exp: 50, strength: 10},
    {health: 100, level: 1, exp: 50, strength: 10}
  ],
  [
    {health: 300, level: 2, exp: 50, strength: 10},
    {health: 400, level: 2, exp: 50, strength: 10},
    {health: 400, level: 2, exp: 50, strength: 10},
    {health: 500, level: 2, exp: 50, strength: 10}
  ],
  [
    {health: 500, level: 3, exp: 50, strength: 10},
    {health: 600, level: 3, exp: 50, strength: 10},
    {health: 700, level: 3, exp: 50, strength: 10},
    {health: 700, level: 3, exp: 50, strength: 10}
  ]
]

export { weapons, items, enemies }
