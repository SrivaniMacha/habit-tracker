const habitForm = document.getElementById('habit-form');
const habitInput = document.getElementById('habit-input');
const habitList = document.getElementById('habit-list');
const progressCircle = document.getElementById('progress-circle');
const progressPercentage = document.getElementById('progress-percentage');
const badgesDiv = document.getElementById('badges');
const modeToggle = document.getElementById('mode-toggle');

document.addEventListener('DOMContentLoaded', () => {
  loadHabits();
  updateProgress();
  loadTheme();
});

// Add new habit
habitForm.addEventListener('submit', e => {
  e.preventDefault();
  const habitName = habitInput.value.trim();
  if (habitName !== '') {
    createHabit(habitName);
    saveHabit(habitName);
    habitInput.value = '';
  }
});

// Toggle habit completed
habitList.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('completed');
    updateStorage();
    updateProgress();
    checkBadges();
  }
  if (e.target.tagName === 'BUTTON') {
    e.target.parentElement.remove();
    updateStorage();
    updateProgress();
  }
});

// Light/Dark Mode
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  saveTheme();
});

// Functions
function createHabit(name, completed = false) {
  const li = document.createElement('li');
  li.textContent = name;
  if (completed) li.classList.add('completed');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  li.appendChild(deleteBtn);

  habitList.appendChild(li);
}

function saveHabit(name) {
  const habits = JSON.parse(localStorage.getItem('habits')) || [];
  habits.push({ name, completed: false });
  localStorage.setItem('habits', JSON.stringify(habits));
}

function loadHabits() {
  const habits = JSON.parse(localStorage.getItem('habits')) || [];
  habits.forEach(habit => createHabit(habit.name, habit.completed));
}

function updateStorage() {
  const habits = [];
  habitList.querySelectorAll('li').forEach(li => {
    habits.push({
      name: li.childNodes[0].nodeValue.trim(),
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('habits', JSON.stringify(habits));
}

function updateProgress() {
  const total = habitList.children.length;
  const completed = habitList.querySelectorAll('.completed').length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  progressPercentage.textContent = `${percent}%`;
}

function checkBadges() {
  const completed = habitList.querySelectorAll('.completed').length;
  badgesDiv.innerHTML = '';

  if (completed >= 3) badgesDiv.innerHTML += `<div class="badge">🔥 3 Habits</div>`;
  if (completed >= 5) badgesDiv.innerHTML += `<div class="badge">🏆 5 Habits</div>`;
  if (completed >= 10) badgesDiv.innerHTML += `<div class="badge">🎖️ 10 Habits</div>`;
}

function saveTheme() {
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

function loadTheme() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark');
  }
}
