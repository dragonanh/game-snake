class Food {
  constructor(game){
    this.game = game;
    this.food = {};
    this.makeFood();
  }

  makeFood(){
    if(Object.keys(this.food).length <= 0){
      //lay thong tin vi tri ran hien tai
      let snakePos = [...this.game.snake.body];
      this.food = this.generateRandomPos(MAX_WIDTH, MAX_HEIGHT, snakePos);
      this.game.context.fillRect(this.food.x,this.food.y, 2, 2);
    }
  }

  generateRandomPos(maxX, maxY, exclude) {
    let x = Math.floor(Math.random() * (maxX));
    if(x!==0 && x%2 !== 0) x++;

    let y = Math.floor(Math.random() * (maxY));
    if(y!==0 && y%2 !== 0) y++;

    let isDuplicate = false;
    for (let [index, val] of exclude.entries()) {
      if(val.x === x && val.y === y){
        isDuplicate = true; break;
      }
    }

    return isDuplicate ? this.generateRandomPos(maxX, maxY) : {x: x, y: y};
  }
}