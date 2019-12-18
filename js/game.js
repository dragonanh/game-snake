class Game {
  constructor(){
    this.canvas = null;
    this.context = null;
    this.snake = null;
    this.food = null;
    this.init();
  }

  init(){
    this.canvas = document.getElementById('mainContent');
    this.context = this.canvas.getContext('2d');
    this.context.fillRect(298,148, 2, 2);
    //khoi tao snake
    this.snake = new Snake(this);

    //khoi tao food
    this.food = new Food(this);

    this.loop();
  }

  loop(){
    // setInterval(  () => {
    //   this.update();
    // }, 500);
  }

  update(){
    this.snake.move();
  }
}

let game = new Game();