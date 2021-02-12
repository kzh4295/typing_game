const GAME_TIME = 9;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let words = [];
let checkInterval;

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button')

init();
function init(){
  buttonchange('게임 로딩중...');
  getWords()
  wordInput.addEventListener('input', checkMatch)
//api로 단어 불러오는 로직을 마련한다는데 어떻게 하는 걸까..?
}

//게임실행
function run () {
  if(isPlaying){
    return;
  }
  isPlaying = true;
  time = GAME_TIME;
  wordInput.focus();
  scoreDisplay.innerText = 0;
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50)
  buttonchange("게임중")
}

function checkStatus(){
    if(!isPlaying && time === 0){
          buttonchange("게임시작")
          clearInterval(checkInterval)
    }
}

//단어불러오기
function getWords() {
  axios.get('https://random-word-api.herokuapp.com/word?number=100')
      .then(function (response) {
        
          response.data.forEach((word) => {
            if(word.length < 10){
              words.push(word);
            }
          })
          buttonchange('게임 시작');
          console.log(words);
        })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
}

//단어 일치 체크
function checkMatch () {
  if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInput.value = "";   
    if(!isPlaying){
      return;
    }                                                                                                                                                                                                                                                                                                                                                                                                                                
    score++;
    scoreDisplay.innerText = score;
    time = GAME_TIME;
    const randomIndex = Math.floor(Math.random() * words .length);
    wordDisplay.innerText = words[randomIndex]
  }
}

buttonchange('게임시작')


function countDown(){
   //삼항연산자 : 조건? 참일경우 : 거짓일경우
  time > 0 ? time-- : isPlaying = false;
  if(!isPlaying){
    clearInterval(timeInterval)
  }
  timeDisplay.innerText = time;
}

function buttonchange(text){
  button.innerText = text;
  text ==='게임시작' ? button.classList.remove('loading') : button.classList.add('loading')
}
