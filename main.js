document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  menu?.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', open); });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false'); }));

  const explainers = {
    'what is democracy?': 'Democracy is a system where citizens have a say in how they are governed, including through free and fair elections. It means the power comes from the people.',
    'what does an mp do?': 'An MP (Member of Parliament) represents the people in their constituency in the National Assembly. They make laws, listen to citizens\' concerns, and vote on important national decisions.',
    'what does a councillor do?': 'A councillor represents a ward and helps make decisions about local services like roads, schools, and water. They are your voice in local government.',
    'what is the constitution?': 'The Constitution is Zambia\'s highest law — the rulebook that guides how the country is governed. It outlines everyone\'s rights, duties, and how government should work.',
    'what is a constituency?': 'A constituency is an area that elects one Member of Parliament (MP) to represent its people in the National Assembly.',
    'what is civic participation?': 'Civic participation means taking part in public life and decisions — you can vote, join community groups, attend meetings, or speak up about issues that matter.',
    'what is civic education?': 'Civic education teaches you about government, citizenship, rights, duties, and how to participate actively in society. It prepares you to be an informed citizen.',
    'what is citizenship?': 'Citizenship is your legal relationship with Zambia. It gives you rights like education and healthcare, and duties to respect laws and others.',
    'what is good governance?': 'Good governance means leaders make fair decisions openly, listen to citizens, follow the law, and use public resources responsibly. It\'s about transparency and accountability.',
    'what are your civic rights?': 'Your rights include life, health care, education, freedom of movement, freedom of opinion, equal protection under the law, and the right to participate in government.',
    'what does patriotism mean?': 'Patriotism means showing love and loyalty to your country. It\'s about supporting Zambia\'s values, caring for your community, and working for the nation\'s progress.',
    'when did zambia gain independence?': 'Zambia gained independence from Britain on October 24, 1964, ending colonial rule. This day is now celebrated annually as Heroes Day.',
    'how are laws made?': 'A proposed law, called a Bill, is debated and voted on in Parliament. If it completes the required constitutional steps and gets presidential approval, it becomes law.',
    'who is my councillor?': 'A councillor is an elected representative for your ward. They help make decisions about local services and represent your interests in local government.',
    'what are zambias national symbols?': 'Zambia\'s symbols include the green and orange flag with an eagle, the coat of arms, the national anthem, and the African Fish Eagle.'
  };
  const input = document.querySelector('#explainer-search');
  const result = document.querySelector('.search-result');
  const lookup = () => { const query = input.value.trim().toLowerCase(); result.textContent = explainers[query] || (query ? 'Try one of the suggested questions below — more explainers are coming soon.' : ''); };
  document.querySelector('.search-box button')?.addEventListener('click', lookup);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') lookup(); });
  document.querySelectorAll('.quick-searches button').forEach(button => button.addEventListener('click', () => { input.value = button.textContent; lookup(); }));

  const questions = [
    { topic: 'GOVERNMENT 101', question: 'Who makes laws in Zambia?', answers: ['The Police', 'Parliament', 'The Courts', 'Local Councils'], correct: 1, detail: 'Correct! Parliament is responsible for making laws, following the constitutional process.' },
    { topic: 'CIVIC BASICS', question: 'What is a constituency?', answers: ['A political party', 'An area represented by an MP', 'A court building', 'A type of election'], correct: 1, detail: 'Correct! Each constituency elects one MP to represent its people in the National Assembly.' },
    { topic: 'YOUR RIGHTS', question: 'The Constitution is best described as…', answers: ['A list of politicians', 'A national rulebook', 'A school textbook', 'A voting card'], correct: 1, detail: 'Correct! The Constitution is the country's highest law and sets out how Zambia is governed.' },
    { topic: 'CITIZENSHIP', question: 'What is citizenship?', answers: ['Being a member of a political party', 'Your legal relationship with your country', 'Having a job', 'Living in a city'], correct: 1, detail: 'Correct! Citizenship gives you rights and responsibilities as a member of Zambia.' },
    { topic: 'HISTORY', question: 'When did Zambia gain independence?', answers: ['1950', 'October 24, 1964', 'January 1, 1965', '1975'], correct: 1, detail: 'Correct! Zambia gained independence on October 24, 1964, and this day is celebrated as Heroes Day.' },
    { topic: 'RIGHTS & DUTIES', question: 'Which is a civic duty?', answers: ['Refusing to follow laws', 'Respecting others rights', 'Ignoring national events', 'Avoiding community service'], correct: 1, detail: 'Correct! Respecting others' rights is a core civic duty. Other duties include obeying laws and caring for public property.' },
    { topic: 'GOVERNANCE', question: 'What is good governance?', answers: ['Leaders making all decisions alone', 'Transparent, accountable leadership', 'Ignoring citizens' input', 'Using power without rules'], correct: 1, detail: 'Correct! Good governance means leaders are transparent, accountable, and respect the rule of law.' },
    { topic: 'CIVIC BASICS', question: 'Who represents a ward?', answers: ['An MP', 'A councillor', 'A police officer', 'A teacher'], correct: 1, detail: 'Correct! A councillor is elected to represent a ward and help make decisions about local services.' }
  ];
  let current = 0; let score = 0; let answered = false;
  const count = document.querySelector('.question-count'); const progress = document.querySelector('.progress i'); const topic = document.querySelector('.quiz-topic'); const question = document.querySelector('.quiz-question'); const answers = document.querySelector('.answers'); const feedback = document.querySelector('.feedback'); const next = document.querySelector('.next-question');
  function renderQuestion() {
    const item = questions[current]; answered = false; count.textContent = `${current + 1} / ${questions.length}`; progress.style.width = `${((current + 1) / questions.length) * 100}%`; topic.textContent = item.topic; question.textContent = item.question; feedback.textContent = ''; feedback.className = 'feedback'; next.hidden = true;
    answers.innerHTML = item.answers.map((answer, i) => `<button class="answer" data-index="${i}"><b>${String.fromCharCode(65+i)}</b>${answer}</button>`).join('');
    answers.querySelectorAll('.answer').forEach(button => button.addEventListener('click', () => selectAnswer(Number(button.dataset.index), button)));
  }
  function selectAnswer(index, button) { if (answered) return; answered = true; const item = questions[current]; const buttons = answers.querySelectorAll('.answer'); buttons[item.correct].classList.add('correct'); if (index === item.correct) { score++; feedback.textContent = item.detail; feedback.className = 'feedback correct'; } else { button.classList.add('wrong'); feedback.textContent = `Not quite. ${item.detail}`; feedback.className = 'feedback wrong'; } next.hidden = false; next.innerHTML = current === questions.length - 1 ? `See my score <span>→</span>` : `Next question <span>→</span>`; }
  next?.addEventListener('click', () => { if (current < questions.length - 1) { current++; renderQuestion(); } else { topic.textContent = 'QUIZ COMPLETE'; question.innerHTML = `You scored <em>${score} / ${questions.length}</em>. Keep growing!`; answers.innerHTML = ''; feedback.textContent = score === questions.length ? 'Excellent work — you know your civic basics.' : 'Every question is a chance to learn something useful.'; feedback.className = 'feedback correct'; next.hidden = true; progress.style.width = '100%'; } });
  document.querySelector('.quiz-close')?.addEventListener('click', () => { current = 0; score = 0; renderQuestion(); });
  if (count && progress && topic && question && answers && feedback && next) renderQuestion();
});
