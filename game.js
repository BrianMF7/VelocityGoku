let velocity = 1.0, grativy = 0.5;
let goku = document.querySelector('.goku');
let img = document.getElementById('goku-1');

let sound_point = new Audio('correct.mp3');
let sound_die = new Audio('gokuscream.mp3');
let sound_start = new Audio('CHA-LA HEAD CHA-LA.mp3');


let gokuProperty = goku.getBoundingClientRect();


let background = document.querySelector('.background').getBoundingClientRect();

let scoreValue = document.querySelector('.scoreValue');
let message = document.querySelector('.message');
let scoreDisplay = document.querySelector('.scoreDisplay');

let gameCurrent = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {

  if (e.key == 'Enter' && gameCurrent != 'Play') {
    document.querySelectorAll('.pole').forEach((e) => {
      e.remove();
    });
    img.style.display = 'block';
    goku.style.top = '40vh';
    gameCurrent = 'Play';
    message.innerHTML = '';
    scoreDisplay.innerHTML = 'Score : ';
    scoreValue.innerHTML = '0';
    message.classList.remove('messageStyle');
    play();
  }
});

function play() {
  function move() {
    if (gameCurrent != 'Play') return;
    sound_start.play();

    let pole = document.querySelectorAll('.pole');
    pole.forEach((element) => {
      let poleProperty = element.getBoundingClientRect();
      gokuProperty = goku.getBoundingClientRect();

      if (poleProperty.right <= 0) {
        element.remove();
      } else {
        if (gokuProperty.left < poleProperty.left + poleProperty.width && gokuProperty.left + gokuProperty.width > poleProperty.left && gokuProperty.top < poleProperty.top + poleProperty.height && gokuProperty.top + gokuProperty.height > poleProperty.top) {
          gameCurrent = 'End';
          message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Click Enter To Restart';
          message.classList.add('messageStyle');
          img.style.display = 'none';
          sound_die.play();
          return;
        } else {
          if (poleProperty.right < gokuProperty.left && poleProperty.right + velocity >= gokuProperty.left && element.increase_score == '1') {
            scoreValue.innerHTML = + scoreValue.innerHTML + 1;
            sound_point.play();
          }
          element.style.left = poleProperty.left - velocity + 'px';
        }
      }
    });
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  let goku_dy = 0;
  function addGravity() {
    if (gameCurrent != 'Play') return;
    goku_dy = goku_dy + grativy;
    document.addEventListener('keydown', (e) => {
      if (e.key == 'ArrowUp' || e.key == 'spacebar') {
        img.src = 'goku 3.png';
        goku_dy = -3.6;
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.key == 'ArrowUp' || e.key == ' ') {
        img.src = "goku 3.png";
      }
    });

    if (gokuProperty.top <= 0 || gokuProperty.bottom >= background.bottom) {
      gameCurrent = 'End';
      message.style.left = '28vw';
      window.location.reload();
      message.classList.remove('messageStyle');
      return;
    }
    goku.style.top = gokuProperty.top + goku_dy + 'px';
    gokuProperty = goku.getBoundingClientRect();
    requestAnimationFrame(addGravity);
  }
  requestAnimationFrame(addGravity);

  let poleSeparate = -15;

  let poleGap = 30;

  function newPole() {
    if (gameCurrent != 'Play') return;

    if (poleSeparate > 65) {
      poleSeparate = 0;

      let polePosition = Math.floor(Math.random() * 43) + 8;
      let poleLast = document.createElement('div');
      poleLast.className = 'pole';
      poleLast.style.top = polePosition - 70 + 'vh';
      poleLast.style.left = '100vw';

      document.body.appendChild(poleLast);
      let pole = document.createElement('div');
      pole.className = 'pole';
      pole.style.top = polePosition + poleGap + 'vh';
      pole.style.left = '100vw';
      pole.increase_score = '1';

      document.body.appendChild(pole);
    }
    poleSeparate++;
    requestAnimationFrame(newPole);
  }
  requestAnimationFrame(newPole);
}








