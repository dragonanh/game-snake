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

  eat(food){
    this.body.push(food);
    this.draw();
  }

  listenerDirection(){
    document.addEventListener('keyup', (event) => {
      let temp = {...this.curPosition};
      switch (event.keyCode) {
        case UP:
          if(temp.direction !== UP) {
            temp.direction = UP;
            this.directions.push(temp);
          }
          break;
        case DOWN:
          if(temp.direction !== DOWN) {
            temp.direction = DOWN;
            this.directions.push(temp);
          }
          break;
        case LEFT:
          if(temp.direction !== LEFT) {
            temp.direction = LEFT;
            this.directions.push(temp);
          }
          break;
        case RIGTH:
          if(temp.direction !== RIGTH) {
            temp.direction = RIGTH;
            this.directions.push(temp);
          }
          break;
      }
    });
  }

  move(){
    let bodyNew = [];
    console.log(this.directions);
    for (let [index, val] of this.body.entries()) {

      //lay thong tin vi tri tiep theo se di chuyen
      let newPos = this.getNewPositionByDirection(val);
      bodyNew.push(newPos);

      //cap nhat vi tri hien tai cua dau ran
      if(newPos.isHead === true) this.curPosition = newPos;

      //ve vi tri moi sau khi di chuyen
      this.draw(newPos.x, newPos.y);


      //xoa cac diem chuyen vi tri khi duoi di qua
      if(val.isTail === true) this.updateDirections(val);

      //xoa thong tin vi tri cu
      this.remove(val.x, val.y);
    }

    this.body = bodyNew;
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
      case RIGTH:
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