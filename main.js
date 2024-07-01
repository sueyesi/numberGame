//정답번호 생성 = 랜덤으로 번호 생성해주기
// 정답 초기값 지정, 랜덤 번호 함수에 담아주기
//input에 값을 입력하고 버튼 클릭할수 있게해준다.
//버튼 클릭시 실행할 동작들을 넣어준다.
 //1.유저가 입력한 값을 가져온다 (userInput.value)
 //2.입력값이 정답보다 큰거나 작은지 체크 (유효성 검사)
//3.입력한 값이 정답일 경우 "정답입니다" 메세지 출력
//4.입력함 값이 정답보다 작을 더 큽니다 메세지
// 입력한 값이 정답보다 클경우 작습니다 메세지
// 정답보다 큰값을 입력하면 메세지를 출력한다 (기회 차감하지않는다)
// 중복 숫자 체크 : 한번 입력한 값을 체크하기 위해서 히스토리 관리를 해준다
// 횟수제한주기
// 정답을 맞추거나 횟수 제한일 경우 버튼 비활성화
// 게임이 끝났을경우 rest버튼 누르면 게임 리셋



let answerNum = 0;  //기본 0값으로 지정
let palyButton = document.getElementById("palyButton"); //버튼의 id값을 가져온다
let userInput = document.getElementById("userInput"); // 유저가 입력한 input의 id값
let resultArea = document.getElementById("resultArea");
let answerArea = document.getElementById("answerArea");
let history = [];// 이전에 입력한 숫자들을 저장하는 배열
let chances = 3;
let gameOver = false;
let chancesArea = document.getElementById("chancesArea");
let resetButton = document.getElementById("resetButton");


palyButton.addEventListener("click", play)// 버튼을 클릭했을때 실행될 동작
resetButton.addEventListener("click", resetGame);
userInput.addEventListener("focus", inputReset);


//랜덤번호 추출 함수
function randomNum(){
    answerNum = Math.floor(Math.random() * 30)+1
    console.log("정답",answerNum)
    answerArea.textContent =`${answerNum}`;
    resultArea.classList.remove("block");
}
// input 초기화
function inputReset(){
    userInput.value="";
}

// playButton 클릭시 호출할 함수
function play(){
    let userValue = userInput.value; //유저가 입력한 값을 userValue함수에 넣어준다.
    console.log(userValue)
    resultArea.className = "";
    //숫자가 아닌 값을 입력했는지??
    if (isNaN(userValue)){
        resultArea.textContent = "숫자가 아닙니다. 1~30사이 숫자를 입력해주세요."
        return;
    } 
    //지정한 값의 범위를 넘었는지???
    if (userValue<1 || userValue>30){
        resultArea.textContent = "1~30사이 숫자를 입력해주세요."
        resultArea.classList.add("etcText");
        return;
    }
    //입력한 적이 있는 값인지??   
    if(history.includes(userValue)){
        
        resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요"
        resultArea.classList.add("etcText");
        return;
    }

    if(userValue == ''){
        resultArea.textContent = "값이 입력되지 않았습니다. 숫자를 입력해주세요"
        resultArea.classList.add("etcText");
        return;
    }
    chances--; 
    //console.log("chance", chances)
    chancesArea.textContent = `남은기회 : ${chances}`;//백틱을 쓰면 동적인 값과 정적인 값을 같이 줄수있다    
    if(chances < 1){
        chancesArea.textContent = "남은 기회가 없습니다.";
        resultArea.textContent = "아쉽지만 다시 도전하세요"
        resultArea.classList.add("failure");
        document.getElementById("resetButton").style.display = "block";
        palyButton.disabled = true;
        return;
    }    

    if(userValue > answerNum){
        resultArea.textContent = "내리세요"
        resultArea.classList.add("down");
    }else if(userValue < answerNum){
        resultArea.textContent = "올리세요"
        resultArea.classList.add("up");
    }else{
        resultArea.textContent = "축하합니다!! 정답입니다"
        resultArea.classList.add("congrats");
        document.getElementById("resetButton").style.display = "block";
        console.log("유저번호와 랜덤번호 일치"); 
        gameOver = true;   
    }
    history.push(userValue) // 
    console.log(history)   
    if(chances < 1){
        gameOver = true;
    }

    if (gameOver == true){
        palyButton.disabled = true;
        
    } 
}


function resetGame(){    
    userInput.value = ""; //입력창 리셋
    resultArea.textContent ="게임을 새로 시작합니다." 
    palyButton.disabled = false;
    gameOver = false; 
    history = [];
    chances = 3; 
    chancesArea.textContent = `남은기회 : ${chances}`;
    document.getElementById("resetButton").style.display = "none";
    resultArea.className = "";
    randomNum(); //새로운 정답    
}
randomNum()
inputReset()