var NowPage = 0;
var FirstPage = 0;
var EndPage = 13;
var BtnCheckList = {};

window.onload = function() {
	load(NowPage);
	document.getElementById("PrevBtn").style.display = "none";
	document.getElementById("ResultBtn").style.display = "none";
};

function load(NumList) {
	var QNum = document.getElementById("QNum");
	var QTitle = document.getElementById("QTitle");
	var Questions1 = document.getElementById("Questions1");
	var Questions2 = document.getElementById("Questions2");
	var Questions3 = document.getElementById("Questions3");

	QNum.innerHTML = QuestenList[NumList].QuesionNumber;
	QTitle.innerHTML = QuestenList[NumList].Quesion;
	Questions1.innerHTML = QuestenList[NumList].Q1;
	Questions2.innerHTML = QuestenList[NumList].Q2;
	Questions3.innerHTML = QuestenList[NumList].Q3;
}

//key는 중복이 불가능하여 Question만 하면 value가 덮어씌어지므로  Question에 key를 더해 Question1, Question2, ...로 만들어줌
function insertJsonKey(key, value) {
	BtnCheckList['Quesion' + key] = value;
}

function deleteJsonKey(key) {
	delete BtnCheckList['Quesion' + key]
}

//라디오 버튼 value값 넣기
function put_radio(questionsNumber) {
	var radioCheck = document.getElementsByName("radioCheck");

	if (radioCheck[0].checked) {
		insertJsonKey(questionsNumber, 1)
	} else if (radioCheck[1].checked) {
		insertJsonKey(questionsNumber, 2)
	} else {
		insertJsonKey(questionsNumber, 3)
	}

}


//라디오버튼 초기화
function radioReset() {
	//체크 해제할 라디오버튼 불러오기
	var radioCheck = document.getElementsByName("radioCheck");
	for (var i = 0; i < radioCheck.length; i++) {
		if (radioCheck[i].checked) {
			radioCheck[i].checked = false;
		}
	}
}


//라디오버튼 체크 유무 확인
function checkRadio() {

	var radioObj = document.getElementsByName("radioCheck");
	var isChecked = false;

	for (var i = 0; i < radioObj.length; i++) {
		if (radioObj[i].checked == true)
			isChecked = true;
	}

	if (!isChecked) {
		alert("답변을 체크해주세요.");
	}

	return isChecked;
}

//라디오버튼 유지
function saveRadio(NowPage) {
	var radioCheck = document.getElementsByName("radioCheck");
	var chk = document.querySelectorAll("input[name=radioCheck]:checked");

	if (BtnCheckList['Quesion' + NowPage] == radioCheck[0].value) {
		radioCheck[0].checked = true;
	} else if (BtnCheckList['Quesion' + NowPage] == radioCheck[1].value) {
		radioCheck[1].checked = true;
	} else if (BtnCheckList['Quesion' + NowPage] == radioCheck[2].value) {
		radioCheck[2].checked = true;
	}
}

//페이지 체크
function checkPage(NowPage) {

	var prevBtn = document.getElementById("PrevBtn");
	var nextBtn = document.getElementById("NextBtn");

	if (NowPage == EndPage) {
		nextBtn.innerHTML = "결과보기"
		return;
	}

	if (NowPage == FirstPage) {
		prevBtn.style.display = "none";
		return;
	}

	if (NowPage > EndPage) {
		Result();
		return;
	}

	prevBtn.style.display = "";
	nextBtn.style.display = "";

}

//다음 페이지 이동
function Next() {

	if (!checkRadio()) {
		return
	}

	NowPage += 1;

	checkPage(NowPage)
	put_radio(NowPage);
	radioReset();
	load(NowPage);
}

//이전 페이지 이동
function Previous() {
	saveRadio(NowPage);
	deleteJsonKey(NowPage);

	NowPage -= 1;

	checkPage(NowPage)
	load(NowPage);

}


//결과 페이지 이동
function Result() {


	var result = {};

	for (var value in BtnCheckList) {
		var index = BtnCheckList[value];
		result[index] = result[index] == undefined ? 1 : result[index] += 1;
	}

	var top = Math.max(result[1], result[2], result[3]);

	if (result[1] == top) {
		location.href = "result1.html";
	}
	else if (result[2] == top) {
		location.href = "result2.html";
	} else {
		location.href = "result3.html";
	}
}
