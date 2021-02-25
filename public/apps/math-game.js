"use strick";

const score = document.getElementById("score");
const checkBtn = document.getElementById("check-btn");
const question_box = document.querySelector(".question-box");
const game_level = document.getElementById("level");
const user_in = document.getElementById("user-answer");

const handler = {
	operators: ["+", "-", "*", "/"],
	operatorToDisplay: "",
	theQuestion: [],
	operatorSetter: function () {
		const operator = this.operators[
			Math.floor(Math.random() * this.operators.length)
		];
		this.theQuestion.push(operator);
		if (operator === "*") {
			this.operatorToDisplay = "x";
		} else if (operator === "/") {
			this.operatorToDisplay = "÷";
		} else {
			this.operatorToDisplay = operator;
		}
	},
	correctAnswer: 0,
	realtime_score: 0,
	correctAnswer_Calculator: function () {
		if (this.theQuestion[1] === "+") {
			this.correctAnswer = Math.round(
				this.theQuestion[0] + this.theQuestion[2]
			);
			return;
		}
		if (this.theQuestion[1] === "-") {
			this.correctAnswer = Math.round(
				this.theQuestion[0] - this.theQuestion[2]
			);
			return;
		}
		if (this.theQuestion[1] === "/") {
			this.correctAnswer = Math.round(
				this.theQuestion[0] / this.theQuestion[2]
			);
			return;
		}
		if (this.theQuestion[1] === "*") {
			this.correctAnswer = Math.round(
				this.theQuestion[0] * this.theQuestion[2]
			);
			return;
		}
	},
	check_user_answer: function (userAnswer, inputEl) {
		if (Number(userAnswer) == this.correctAnswer) {
			this.realtime_score++;
			inputEl.style = "border:2px green solid;";
			score.textContent = `${this.realtime_score}`;
		} else {
			inputEl.style = "border:2px red solid;";
			score.textContent = `${this.realtime_score}`;
		}
	},
	operandGenerator: function () {
		const theOperand = Math.round(Math.random() * Number(game_level.value));
		this.theQuestion.push(theOperand);
		return theOperand;
	},
	questionGenerator: function () {
		const question = document.createElement("section");
		for (let i = 0; i < 1; i++) {
			// if (i > 0) {
			// 	const spanOp2 = document.createElement("span");
			// 	this.operatorSetter();
			// 	spanOp2.textContent = ` ${this.operatorToDisplay} `;
			// 	question.appendChild(spanOp2);
			// }
			const spanNum = document.createElement("span");
			const spanNum2 = document.createElement("span");
			const spanOp = document.createElement("span");
			spanNum.textContent = ` ${this.operandGenerator()} `;
			this.operatorSetter();
			spanNum2.textContent = ` ${this.operandGenerator()} `;
			spanOp.textContent = ` ${this.operatorToDisplay} `;

			question.appendChild(spanNum);
			question.appendChild(spanOp);
			question.appendChild(spanNum2);
		}
		question_box.appendChild(question);
	},
	clickHandler: function () {
		// debugger;
		this.correctAnswer_Calculator();
		this.check_user_answer(user_in.value, user_in);
		question_box.textContent = "";
		user_in.value = "";
		this.theQuestion = [];
		this.questionGenerator();
	},
};
handler.questionGenerator();
checkBtn.onclick = function () {
	handler.clickHandler();
};
user_in.onkeyup = function (event) {
	event.preventDefault();
	if (event.keycode === 13) {
		handler.clickHandler();
	} else {
		return;
	}
};
export default handler;
