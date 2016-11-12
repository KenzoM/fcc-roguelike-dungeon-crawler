
let Helpers = {
  GetRandom: function (low, high) {
    return~~ (Math.random() * (high - low)) + low;
  }
};

function Dungeon(){
    this.map= null;
    this.map_size= 30;
    this.rooms= []
}

Dungeon.prototype.Generate = function () {
  this.map = [];
  for (let x = 0; x < this.map_size; x++) {
    this.map[x] = [];
    for (let y = 0; y < this.map_size; y++) {
        this.map[x][y] = 999;
    }
  }

  let room_count = Helpers.GetRandom(5, 8);
  let min_size = 4;
  let max_size = 8;

  for (let i = 0; i < room_count; i++) {
    let room = {};

    room.x = Helpers.GetRandom(1, this.map_size - max_size - 1);
    room.y = Helpers.GetRandom(1, this.map_size - max_size - 1);
    room.w = Helpers.GetRandom(min_size, max_size);
    room.h = Helpers.GetRandom(min_size, max_size);

    if (this.DoesCollide(room)) {
      i--;
      continue;
    }
    room.w--;
    room.h--;
    this.rooms.push(room);
  }



  this.SquashRooms();

      // Now we start building corridors between rooms that are near to one
      // another. We choose a random point in each room and then move the second
      // point towards the first one (in the while loop). We set each corridor
      // tile to 1 which can later be interpreted by the dungeon drawing
      // algorithm as such.

  for (let i = 0; i < room_count; i++) {
    let roomA = this.rooms[i];
    let roomB = this.FindClosestRoom(roomA);

    let pointA = {
      x: Helpers.GetRandom(roomA.x, roomA.x + roomA.w),
      y: Helpers.GetRandom(roomA.y, roomA.y + roomA.h)
    };
    let pointB = {
      x: Helpers.GetRandom(roomB.x, roomB.x + roomB.w),
      y: Helpers.GetRandom(roomB.y, roomB.y + roomB.h)
    };

    while ((pointB.x !== pointA.x) || (pointB.y !== pointA.y)) {
      if (pointB.x !== pointA.x) {
        if (pointB.x > pointA.x) pointB.x--;
        else pointB.x++;
      } else if (pointB.y !== pointA.y) {
        if (pointB.y > pointA.y) pointB.y--;
        else pointB.y++;
      }

      this.map[pointB.x][pointB.y] = 888;
    }
  }

      // Here we iterate through all the rooms and set the tile to 1 for every
      // tile within a room.

  for (let i = 0; i < room_count; i++) {
    let room = this.rooms[i];
    for (let x = room.x; x < room.x + room.w; x++) {
      for (let y = room.y; y < room.y + room.h; y++) {
          this.map[x][y] = 888;
      }
    }
  }


      // This last part iterates through all the tiles in the map and if it
      // finds a tile that is a floor (equal to 1) we check all the surrounding
      // tiles for empty values. If we find an empty tile (that touches the floor)
      // we build a wall (equal to 0).

  for (let x = 0; x < this.map_size; x++) {
    for (let y = 0; y < this.map_size; y++) {
      if (this.map[x][y] === 888) {
        for (let xx = x - 1; xx <= x + 1; xx++) {
          for (let yy = y - 1; yy <= y + 1; yy++) {
              if (this.map[xx][yy] === 999) this.map[xx][yy] = 0;
          }
        }
      }
    }
  }

  //we'll use flood-fill algorithm to avoid any dungeons that are disconnected
  let rowFillIndex;
  let colFillIndex = -1;
  while (colFillIndex < 0){
    rowFillIndex = Helpers.GetRandom(0, this.map_size);
    colFillIndex = this.map[rowFillIndex].indexOf(888);
  }
  this.floodFill(rowFillIndex, colFillIndex);
  if (this.map.reduce( (a,b) => (a.concat(b))).indexOf(888) !== -1){
    this.map = null;
  }
};

Dungeon.prototype.DoesCollide = function (room, ignore) {
  for (let i = 0; i < this.rooms.length; i++) {
    if (i === ignore) continue;
    let check = this.rooms[i];
    if (!((room.x + room.w < check.x) || (room.x > check.x + check.w) || (room.y + room.h < check.y) || (room.y > check.y + check.h))) return true;
  }
  return false;
};

Dungeon.prototype.floodFill = function (x,y) {
  //termination case
  if (x < 0 || y < 0 || x > this.map.length - 1 || y > this.map[0].length - 1 ){
    return;
  }
  //base case
  if (this.map[x][y] !== 888){
    return;
  }
  //recursion
  this.map[x][y] = 1; //fill it value of 1, which is floor
  this.floodFill(x-1, y);
  this.floodFill(x+1, y);
  this.floodFill(x, y-1);
  this.floodFill(x, y+1);
};

Dungeon.prototype.SquashRooms = function () {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < this.rooms.length; j++) {
      let room = this.rooms[j];
      while (true) {
        let old_position = {
          x: room.x,
          y: room.y
        };
        if (room.x > 1) room.x--;
        if (room.y > 1) room.y--;
        if ((room.x === 1) && (room.y === 1)) break;
        if (this.DoesCollide(room, j)) {
          room.x = old_position.x;
          room.y = old_position.y;
          break;
        }
      }
    }
  }
};

Dungeon.prototype.FindClosestRoom = function (room) {
  let mid = {
    x: room.x + (room.w / 2),
    y: room.y + (room.h / 2)
  };
  let closest = null;
  let closest_distance = 1000;
  for (let i = 0; i < this.rooms.length; i++) {
    let check = this.rooms[i];
    if (check === room) continue;
    let check_mid = {
        x: check.x + (check.w / 2),
        y: check.y + (check.h / 2)
    };
    let distance = Math.min(Math.abs(mid.x - check_mid.x) - (room.w / 2) - (check.w / 2), Math.abs(mid.y - check_mid.y) - (room.h / 2) - (check.h / 2));
    if (distance < closest_distance) {
        closest_distance = distance;
        closest = check;
    }
  }
  return closest;
};

export default Dungeon
