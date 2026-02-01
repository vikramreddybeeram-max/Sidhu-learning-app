// Sidhu's Adaptive Math - 4th to 6th Grade, Daily Fresh, Skill-Based
let skillLevel = localStorage.getItem('skillLevel') || 1; // 1-6
let dailySeed = new Date().getFullYear() * 100 + new Date().getMonth() * 10 + new Date().getDate(); // Unique daily

const mathGenerators = {
  1: () => { // 4th Easy: Basic ops
    const ops = ['+', '-', '×'];
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    const op = ops[Math.floor(Math.random() * ops.length)];
    let answer;
    if (op === '+') answer = a + b;
    else if (op === '-') answer = Math.max(a, b) - Math.min(a, b);
    else answer = a * b;
    return generateChoices(answer, 4);
  },
  2: () => { // 4th Medium: Division
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 8) + 2;
    const answer = a * b;
    return generateChoices(answer / b, 4, 'int');
  },
  3: () => { // 4th Hard: Multi-digit
    const a = Math.floor(Math.random() * 90) + 10;
    const b = Math.floor(Math.random() * 9) + 1;
    return generateChoices(a + b * 10, 4);
  },
  4: () => { // 5th: Decimals
    const a = (Math.floor(Math.random() * 100) + 1) / 10;
    const b = (Math.floor(Math.random() * 100) + 1) / 10;
    return generateChoices(a + b, 4, 1);
  },
  5: () => { // 6th: Ratios
    const ratio = Math.floor(Math.random() * 5) + 2;
    const total = Math.floor(Math.random() * 20) + 10;
    const part = Math.round(total / ratio);
    return generateChoices(part, 4);
  },
  6: () => { // 6th Max: Basic equations
    const x = Math.floor(Math.random() * 15) + 1;
    const p = Math.floor(Math.random() * 10) + 2;
    return generateChoices(x + p, 4, 'equation');
  }
};

function generateChoices(answer, numChoices, type = 'int') {
  const choices = [answer];
  while (choices.length < numChoices) {
    let wrong = answer + (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 8) + 2);
    if (type === 1) wrong = Math.round(wrong * 10) / 10;
    if (!choices.includes(wrong)) choices.push(wrong);
  }
  choices.sort(() => Math.random() - 0.5);
  return {
    question: type === 'equation' ? `If x + 3 = ${choices[0]}, x = ?` : `Solve: ${answer} ?`,
    choices: choices.map(c => c.toString()),
    correctIndex: choices.indexOf(answer)
  };
}

// Generate 5 fresh math questions
function getMathQuestions() {
  const questions = [];
  for (let i = 0; i < 5; i++) {
    questions.push(mathGenerators[skillLevel]());
  }
  return questions;
}

// Update skill level based on performance
function updateSkillLevel(finalScore, total) {
  const accuracy = finalScore / total;
  if (accuracy >= 0.8 && skillLevel < 6) {
    skillLevel++;
    localStorage.setItem('skillLevel', skillLevel);
    alert(`Level up! Now level ${skillLevel}/6 (6th grade)`);
  } else if (accuracy < 0.6 && skillLevel > 1) {
    skillLevel--;
    localStorage.setItem('skillLevel', skillLevel);
    alert(`Review time. Back to level ${skillLevel}`);
  }
}

// ... [Keep all your existing code below: questionsBySubject, event listeners, etc.]
// Just replace the math array with: math: [],
// And call getMathQuestions() in startMission for math
