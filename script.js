// BULLETPROOF VERSION - Works 100%
const questions = {
  math: [
    {q:"7×8=?",a:["48","54","56","64"],c:2},
    {q:"36÷4=?",a:["6","8","9","10"],c:2},
    {q:"456+789=?",a:["1234","1245","1345","1445"],c:1}
  ],
  reading: [
    {q:"Afternoon=?",a:["Morning","Afternoon","Evening","Night"],c:1},
    {q:"Desert=?",a:["Trees","Dry","City","Ice"],c:1}
  ]
};

document.getElementById("startButton").onclick = function() {
  const sub = document.getElementById("subjectSelect").value;
  const qs = questions[sub];
  let i = 0, score = 0;
  
  document.getElementById("intro").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  
  function showQ() {
    const qCont = document.getElementById("questionContainer");
    qCont.innerHTML = `<p><b>Q${i+1}: ${qs[i].q}</b></p>`;
    
    qs[i].a.forEach((ans,j) => {
      const btn = document.createElement("button");
      btn.innerText = ans;
      btn.className = "choice-button";
      btn.onclick = () => {
        btn.disabled = true;
        if (j === qs[i].c) {
          btn.style.background = "#68d391";
          score++;
        } else {
          btn.style.background = "#f56565";
        }
        i++;
        setTimeout(showQ, 800);
        if (i
