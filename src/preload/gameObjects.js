
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
    { name: "cheese-stick", health: 20, coords: null },
    { name: "yogurt", health: 30, coords: null },
    { name: "banana", health: 40, coords: null },
    { name: "avocado", health: 60, coords: null }
  ],
  [
    { name: "bacon", health: 60, coords: null },
    { name: "sandwich", health: 100, coords: null },
    { name: "pizza", health: 100, coords: null },
    { name: "spaggeti", health: 130, coords: null }
  ],
  [
    { name: "bacon", health: 60, coords: null },
    { name: "pizza", health: 100, coords: null },
    { name: "steak", health: 100, coords: null },
    { name: "roasted-chicken", health: 150, coords: null }
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
    {health: 300, level: 2, exp: 50, strength: 20},
    {health: 400, level: 2, exp: 50, strength: 23},
    {health: 400, level: 2, exp: 50, strength: 26},
    {health: 500, level: 2, exp: 50, strength: 30}
  ],
  [
    {health: 500, level: 3, exp: 50, strength: 30},
    {health: 600, level: 3, exp: 50, strength: 33},
    {health: 700, level: 3, exp: 50, strength: 36},
    {health: 700, level: 3, exp: 50, strength: 40}
  ]
]

const boss = {health: 500, strength: 100}


export { weapons, items, enemies, boss }
