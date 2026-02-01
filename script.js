console.log("Script loading...");

const questions = {
  math: [
    {q:"7×8=?",a:["48","54","56","64"],c:2},
    {q:"36÷4=?",a:["6","8","9","10"],c:2},
    {q:"400+230=?",a:["530","630","640","700"],c:0}
  ],
  reading: [
    {q:"Afternoon after school?",a:["Morning","Afternoon","Evening","Night"],c:1},
    {q:"Desert=?",a:["Trees","Dry","Buildings","Ice"],c:1}
  ]
};

const startBtn = document.getElementById("startButton");
const subjectSel = document.getElementById("subjectSelect");
const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const qCont = document.getElementById("questionContainer");
let currQ = 0, score = 0;

startBtn.onclick = function() {
  console.log("Start clicked");
  const sub = subjectSel.value;
  const qs = questions[sub];
  currQ = 0;
  score = 0;
  
  intro.style.display = "none";
  quiz.style.display = "block";
  
  showQ(qs);
};

function showQ(qs) {
  qCont.innerHTML = "";
  if (currQ >= qs.length) {
    qCont.innerHTML = `<h3>${score}/${qs.length} - Great job!</h3>`;
    return;
  }
  
  const q = qs[currQ];
  qCont.innerHTML += `<p><b>Q${currQ+1}: ${q.q}</b></p>`;
  
  q.a.forEach((ans,i) => {
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.className = "choice-button";
    btn.onclick = () => checkAns(btn, i, q.c);
    qCont.appendChild(btn);
  });
}

function checkAns(btn, picked, correct) {
  btn.disabled = true;
  if (picked === correct) {
    btn.style.background = "#c8f7c5";
    score++;
  } else {
    btn.style.background = "#f7c5c5";
  }
  currQ++;
  setTimeout(() => showQ(questions[subjectSel.value]), 1000);
}
