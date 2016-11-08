
const weapons = [
	[ // dungeon 1 weapons
		{ name: "knife", damage: 2, coords: null},
		{ name: "sword", damage: 3, coords: null}
	],
	[ // dungeon 2 weapons
		{ name: "crossbow", damage: 4, coords: null },
		{ name: "pistol", damage: 5, coords: null }
	],
	[ // dungeon 3 weapons
		{name: "shotgun", damage: 6, coords: null},
    {name: "bazooka", damage: 7, coords: null}
	]
]

const items = [
  [
    { name: "banana", health: 20, coords: null },
    { name: "banana", health: 20, coords: null },
    { name: "avocado", health: 40, coords: null }
  ],
  [
    { name: "banana", health: 50, coords: null },
    { name: "banana", health: 60, coords: null },
    { name: "banana", health: 80, coords: null }
  ],
  [
    { name: "banana", health: 50, coords: null },
    { name: "banana", health: 80, coords: null },
    { name: "banana", health: 100, coords: null }
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
    {health: 100, level: 1, exp: 50, strength: 10},
    {health: 100, level: 1, exp: 50, strength: 10},
    {health: 100, level: 1, exp: 50, strength: 10},
    {health: 100, level: 1, exp: 50, strength: 10}
  ],
  [
    {health: 100, level: 1, exp: 50, strength: 10},
    {health: 100, level: 1, exp: 50, strength: 10},
    {health: 100, level: 1, exp: 50, strength: 10},
    {health: 100, level: 1, exp: 50, strength: 10}
  ]
]

export { weapons, items, enemies }
