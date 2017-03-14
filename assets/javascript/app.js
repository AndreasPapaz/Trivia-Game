var counter = 15;
var correctCount = 0;
var wrongCount = 0;
var questionCount = 0;
var clock;


var questionsArray = ["Who is the One Punch Man?", "Who is his sidekick?", "Can Goku beat Saitama?", "How did Saitama become the One Punch Man?"];
var answersOptions = [["Mario", "Sonic", "Saitama", "Bill Gates"], ["Tails", "Robin", "Joey", "Genos"], ["Ofcourse he can!", "no, he can not.", "who is Goku????", "I dont know."], ["He drank purple drink", "Eating cake before bed", "100 push-ups, 100 sit-ups, 100 squats, 10 km run, and no AC everyday!", "he got hit by a comit with radio active waste" ]];
var answersArray = ["C. Saitama", "D. Genos", "A. Ofcourse he can!", "C. 100 push-ups, 100 sit-ups, 100 squats, 10 km run, and no AC everyday!"];


// game start function which sets up the question and answer options and will go to the next question when the questionCount number is adjusted.
function generateStart(){
	
	var questionsHTML = $("<div>");

	var questionDiv = $("<div class='questionDiv'>").text("1. " + questionsArray[questionCount]);
	questionsHTML.append(questionDiv);

	var answer1 = $("<div class='answer'>").text("A. " + answersOptions[questionCount][0]);
	questionsHTML.append(answer1);

	var answer2 = $("<div class='answer'>").text("B. " + answersOptions[questionCount][1]);
	questionsHTML.append(answer2);

	var answer3 = $("<div class='answer'>").text("C. " + answersOptions[questionCount][2]);

	questionsHTML.append(answer3);
	var answer4 = $("<div class='answer'>").text("D. " + answersOptions[questionCount][3]);

	questionsHTML.append(answer4);
	$('.mainArea').html(questionsHTML);
	$('.timerArea').show();
}


// final screen which will display the correct and wrong answer count with a percentage, along with a reset button
function resultScreen(){

	var percentage = correctCount/questionsArray.length;
	var percentageRound = percentage.toFixed(2)*100;

	var restultHTML = $("<div class='container result-screen'>");

	var correctDiv = $("<p class='result'>").text("CORRECT : " + correctCount);
	restultHTML.append(correctDiv);

	var wrongDiv = $("<p class='result'>").text("INCORRECT : " + wrongCount);
	restultHTML.append(wrongDiv);

	var percentDiv = $("<p class='result'>").text("GRADE : " + percentageRound + "%");
	restultHTML.append(percentDiv);

	var resetDiv = $("<p class='restart-button'>").text("RESET");
	restultHTML.append(resetDiv);

	$('.mainArea').html(restultHTML);
	$('.timerArea').hide();
}

// generates a win, the settime out will make the on.click lag and it runs the nextQuestion function/
function winGenerate(){
	correctCount++;
	setTimeout(nextQuestion, 200);
}

function lossGenerate(){
	wrongCount++;
	setTimeout(nextQuestion, 200);
}

 // the clock will always run. it resets for each question and when it hits zero it adds to the loss count and generated a questionCount number. 
function countDownClock() {
	clock = setInterval(fifteenSeconds, 1000);
	function fifteenSeconds() {
		if (counter === 0) {
			clearInterval(clock);
			lossGenerate();
		}
		else if (counter > 0){
			counter--;
		}
		$('.timerArea').html("TIME : " + counter);
	}
}

function nextQuestion() {
	if (questionCount < questionsArray.length -1) {
		questionCount++;
		counter = 15;
		generateStart();
		countDownClock();
	}
	else {
		// alert("game end");
		resultScreen();
	}
}

function restartGame() {
	startGame();
	questionCount = 0;
	correctCount = 0;
	wrongCount = 0;
	counter = 15;
}


// creat a function to add a start button. from here we will click the start button and display our first Q&A
function startGame(){
		
	// this creates the button with the style from bootstrap and the classes.
	var $startButton = $("<div class='text-center'>");
	// $startButton.addClass('btn btn-primary btn-clock start-button');
	$startButton.addClass('btn-clock start-button');
	$startButton.text('START');

	$('.mainArea').append($startButton);
	$('.timerArea').hide();
	}



$(document).ready(function() {

	startGame();


	// start button for the first time
	$(".start-button").on("click", function(event) {
		event.preventDefault();
		// alert("start was clicked");
		generateStart();
		countDownClock();
	});


	// start button for every time after the first time.
	$('body').on('click', '.start-button', function() {
		alert("start was clicked");
		generateStart();
		countDownClock();
	});

	


	$('body').on('click', '.answer', function() { // why does this line work but $('.answer').on('click', function() {}) doesnt work?

		var selected = $(this).text();

		// test counts
		// alert(questionCount);
		// alert(correctCount);
		// alert(wrongCount);


		if (selected === answersArray[questionCount]){
			// alert("yes you are right");
			clearInterval(clock);
			winGenerate();
		}
		else {
			// alert("sorry try again");
			clearInterval(clock);
			lossGenerate();
		}
	});

	$('body').on('click', '.restart-button', function() {
		$('.mainArea').empty();
		restartGame();
	});

});



























