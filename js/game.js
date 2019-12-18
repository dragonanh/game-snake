class Game {
  constructor(){
    this.canvas = null;
    this.context = null;
    this.snake = null;
    this.food = null;
    this.idGame = null;
    this.gameState = null;
    this.init();
  }

  init(){
    //xoa canvas cu neu co
    let oldCanvas = document.getElementsByTagName('canvas');
    for (let i = 0, len = oldCanvas.length; i !== len; ++i) {
      oldCanvas[0].parentNode.removeChild(oldCanvas[0]);
    }

    //khoi tao canvas
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);

    this.context = this.canvas.getContext('2d');
    this.gameState = PAUSE;

    //khoi tao snake
    this.snake = new Snake(this);

    this.initFood();

    this.keyboardListener();
  }

  keyboardListener(){
    document.addEventListener('keyup', (event) => {
      console.log(event);

      switch (event.keyCode) {
        case 32:
          if(this.idGame === null)
            this.start();
          else
            this.pause();
          break;
      }
    })
  }

  start(){
    this.gameState = RUNNING;
    this.idGame = setInterval(  () => {
      this.update();
    }, 90);
  }

  update(){
    this.snake.move();
  }

  initFood(){
    //khoi tao food
    let f = new Food(this);
    this.food = f.food;
  }

  gameOver(){
    this.gameState = FINISH;
    alert('GAME OVER');
    new Game();
  }

  victory(){
    if(Object.keys(this.snake.body).length >= LENGTH_VICTORY){


      this.pause();
    }
  }

  pause(){
    clearInterval(this.idGame);
    this.idGame = null;
    this.gameState = PAUSE;
  }
}

let game = new Game();