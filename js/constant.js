
const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;

const LENGTH_VICTORY = 10;

const DEFAULT_SNAKE = [
  {x: 150, y: 70, direction: UP, isHead: true, isTail: false},
  {x: 150, y: 72, direction: UP, isHead: false, isTail: false},
  {x: 150, y: 74, direction: UP, isHead: false, isTail: true}
];

const PAUSE = 'pause';
const FINISH = 'finish';
const RUNNING = 'running';

const MAX_WIDTH = 298;
const MAX_HEIGHT = 148;