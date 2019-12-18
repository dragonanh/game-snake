class Snake {
  constructor(game){
    this.game = game;
    this.directions = [];
    this.curPosition = {};
    this.body = DEFAULT_SNAKE;
    this.init();
  }

  init(){
    //khoi tao hinh dang ban dau
    for (let [index, val] of this.body.entries()) {
      if(val.isHead === true) this.curPosition = val;
      this.draw(val.x, val.y)
    }

    this.listenerDirection();
  }

  draw(x,y){
    this.game.context.fillRect(x,y, 2, 2);
  }

  remove(x,y){
    this.game.context.clearRect(x,y, 2, 2);
  }

  eat(food, headPos){
    let newHead = {...headPos};
    newHead.x = food.x;
    newHead.y = food.y;

    switch (newHead.direction) {
      case UP:
        newHead.y -= 2; break;
      case DOWN:
        newHead.y += 2; break;
      case LEFT:
        newHead.x -= 2; break;
      case RIGHT:
        newHead.x += 2; break;
    }

    this.draw(newHead.x, newHead.y);

    return newHead;
  }

  listenerDirection(){
    document.addEventListener('keyup', (event) => {
      if(this.game.gameState !== RUNNING)
        return false;

      let temp = {...this.curPosition};

      if((event.keyCode === UP || event.keyCode === DOWN) && temp.direction !== UP && temp.direction !== DOWN){
        temp.direction = event.keyCode;
        this.directions.push(temp);
      }

      if((event.keyCode === LEFT || event.keyCode === RIGHT) && temp.direction !== LEFT && temp.direction !== RIGHT){
        temp.direction = event.keyCode;
        this.directions.push(temp);
      }
    });
  }

  move(){
    let bodyNew = [];
    let eaten = false;

    if(this.game.gameState !== RUNNING)
      return false;

    for (let [index, val] of this.body.entries()) {

      //lay thong tin vi tri tiep theo se di chuyen
      let newPos = this.getNewPositionByDirection(val);
      bodyNew.push(newPos);

      //cap nhat vi tri hien tai cua dau ran
      if(newPos.isHead === true){
        if(newPos.x === this.game.food.x && newPos.y === this.game.food.y){
          //thay the thuc an thanh head moi
          let newHead = this.eat(this.game.food, newPos);

          this.checkPrick(newHead.x, newHead.y);

          //xoa thuoc tinh head cua head cu
          newPos.isHead = false;

          //gan head moi vao vi tri dau tien
          bodyNew.unshift(newHead);
          this.curPosition = newHead;

          eaten = true;
        }else {
          this.checkPrick(newPos.x, newPos.y);
          this.curPosition = newPos;
        }
      }

      //ve vi tri moi sau khi di chuyen
      this.draw(newPos.x, newPos.y);


      //xoa cac diem chuyen vi tri khi duoi di qua
      if(val.isTail === true) this.updateDirections(val);

      //xoa thong tin vi tri cu
      this.remove(val.x, val.y);
    }

    //khoi tao food moi neu co an food
    if(eaten) this.game.initFood();

    this.body = bodyNew;
  }

  checkPrick(x,y){
    if(x === 0 || y === 0 || x === (MAX_WIDTH + 2) || y === (MAX_HEIGHT + 2)){
      this.game.gameOver();
    }
  }

  updateDirections = (pos) => {
    this.directions = this.directions.filter( elem => elem.x !== pos.x || elem.y !== pos.y);
  };

  getNewPositionByDirection = (obj) => {
    let temp = {...obj};
    let directions = [...this.directions];

    if(temp.isHead === true){
      for (let [index, val] of directions.entries()) {
        if(val.x === temp.x && val.y === temp.y){
          temp.direction = val.direction;
          break;
        }
      }
    }

    switch (temp.direction) {
      case UP:
        temp.y -= 2; break;
      case DOWN:
        temp.y += 2; break;
      case LEFT:
        temp.x -= 2; break;
      case RIGHT:
        temp.x += 2; break;
    }

    if(temp.isHead !== true) {
      for (let [index, val] of directions.entries()) {
        if (val.x === temp.x && val.y === temp.y) {
          temp.direction = val.direction;
          break;
        }
      }
    }

    return temp;
  };
}