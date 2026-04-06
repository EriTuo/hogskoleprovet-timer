const currentTaskEl = document.getElementById('current-task');
const currentSectionEl = document.getElementById('current-section');
const taskTimeEl = document.getElementById('task-time');
const countdownTimeEl = document.getElementById('countdown-time');
const fixedTotalTimeEl = document.getElementById('fixed-total-time');
const nextButton = document.getElementById('next-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const scheduleToggle = document.getElementById('schedule-toggle');
const scheduleCard = document.getElementById('schedule-card');
const saveButton = document.getElementById('save-button');
const sectionTypeInputs = document.querySelectorAll('input[name="section-type"]');

const sectionTypes = {
  verbal: [
    { name: 'ORD', start: 1, end: 10, recommended: '3 min' },
    { name: 'LÄS', start: 11, end: 20, recommended: '22 min' },
    { name: 'MEK', start: 21, end: 30, recommended: '8 min' },
    { name: 'ELF', start: 31, end: 40, recommended: '22 min' }
  ],
  kvantitativ: [
    { name: 'XYZ', start: 1, end: 12, recommended: '12 min' },
    { name: 'KVA', start: 13, end: 22, recommended: '10 min' },
    { name: 'NOG', start: 23, end: 28, recommended: '10 min' },
    { name: 'DTK', start: 29, end: 40, recommended: '23 min' }
  ]
};

let currentTestType = 'verbal';
let sections = sectionTypes[currentTestType];
const totalTasks = 40;
const totalTimeLimit = 50 * 60 * 1000;
let currentTask = 1;
let currentSection = sections[0];
let startTime = null;
let taskElapsed = 0;
let totalElapsed = 0;
let timerId = null;
let taskTimes = [];
let finished = false;
let paused = false;
let started = false;
let sectionExpandedState = {}; 

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function getSectionForTask(task) {
  return sections.find((s) => task >= s.start && task <= s.end) || sections[sections.length - 1];
}

function updateDisplay() {
  currentTaskEl.textContent = currentTask;
  currentSectionEl.textContent = currentSection.name;
  taskTimeEl.textContent = formatTime(taskElapsed);
  fixedTotalTimeEl.textContent = formatTime(totalElapsed + taskElapsed);
  const remaining = Math.max(0, totalTimeLimit - (totalElapsed + taskElapsed));
  countdownTimeEl.textContent = formatTime(remaining);
}

function renderLog() {
  const sectionsContainer = document.getElementById('sections-container');
  if (!sectionsContainer) return;

  sectionsContainer.innerHTML = '';
  sectionsContainer.classList.toggle('all-finished', finished);

  // Beräkna totaler för varje sektion från loggade uppgifter
  const sectionTotals = {};
  taskTimes.forEach(entry => {
    if (!sectionTotals[entry.section]) sectionTotals[entry.section] = 0;
    sectionTotals[entry.section] += entry.time;
  });

  const currentSectionName = currentSection.name;
  let currentSectionTotal = (sectionTotals[currentSectionName] || 0) + taskElapsed;

  // Skapa sektioner på nytt varje gång
  sections.forEach((section) => {
    const sectionEl = document.createElement('div');
    sectionEl.id = `section-${section.name}`;
    sectionEl.className = 'section';

    const sectionTasks = taskTimes.filter(t => t.section === section.name).sort((a, b) => a.task - b.task);
    const isActive = section.name === currentSectionName && !finished;
    const isCompleted = sectionTasks.length > 0;
    const manuallyExpanded = sectionExpandedState[section.name] === true;

    if (isActive) sectionEl.classList.add('active');
    const shouldExpand = isActive || finished || manuallyExpanded;
    sectionEl.classList.toggle('expanded', shouldExpand);

    const headerEl = document.createElement('div');
    headerEl.className = 'section-header';
    sectionEl.appendChild(headerEl);

    const buttonEl = document.createElement('button');
    buttonEl.type = 'button';
    const sectionName = section.name;
    const sectionCount = section.end - section.start + 1;
    buttonEl.innerHTML = `<span class="section-toggle">▶</span>${section.name} (${sectionCount} uppg.) tid: ${formatTime(isActive ? currentSectionTotal : (sectionTotals[section.name] || 0))} (rek. ${section.recommended})`;
    buttonEl.addEventListener('click', () => {
      if (!finished && sectionName === currentSection.name) return;
      sectionExpandedState[sectionName] = !sectionExpandedState[sectionName];
      renderLog();
    });
    headerEl.appendChild(buttonEl);

    const contentEl = document.createElement('div');
    contentEl.className = 'section-content';
    sectionEl.appendChild(contentEl);

    const tasksWrapper = document.createElement('div');
    tasksWrapper.className = 'section-tasks-wrapper';
    contentEl.appendChild(tasksWrapper);

    const tableEl = document.createElement('table');
    tableEl.className = 'log-table';
    tableEl.innerHTML = `
      <thead>
        <tr>
          <th>Uppgift</th>
          <th>Del</th>
          <th>Tid</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    tasksWrapper.appendChild(tableEl);

    const tbody = tableEl.querySelector('tbody');
    sectionTasks.forEach(entry => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.task}</td>
        <td>${entry.section}</td>
        <td>${formatTime(entry.time)}</td>
      `;
      tbody.appendChild(row);
    });

    if (isActive && !finished) {
      const currentRow = document.createElement('tr');
      currentRow.className = 'current-task-row';
      currentRow.innerHTML = `
        <td>${currentTask}</td>
        <td>${currentSectionName}</td>
        <td>${formatTime(taskElapsed)}</td>
      `;
      tbody.appendChild(currentRow);
    }

    sectionsContainer.appendChild(sectionEl);
  });
}


function startTimer() {
  startTime = performance.now() - taskElapsed;
  if (timerId !== null) {
    cancelAnimationFrame(timerId);
  }
  function tick() {
    taskElapsed = performance.now() - startTime;
    updateDisplay();
    renderLog();
    timerId = requestAnimationFrame(tick);
  }
  timerId = requestAnimationFrame(tick);
}

function stopTimer() {
  if (timerId !== null) {
    cancelAnimationFrame(timerId);
    timerId = null;
  }
  totalElapsed += taskElapsed;
}

function scrollToCurrentTask() {
  const currentRow = document.querySelector('.current-task-row');
  if (currentRow) {
    currentRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function nextTask() {
  if (finished) return;
  taskTimes.push({
    task: currentTask,
    section: currentSection.name,
    time: taskElapsed
  });
  stopTimer();
  if (currentTask >= totalTasks) {
    finished = true;
    nextButton.textContent = 'Färdig';
    nextButton.disabled = true;
    pauseButton.disabled = true;
    renderLog();
    scrollToCurrentTask();
    return;
  }
  currentTask += 1;
  currentSection = getSectionForTask(currentTask);
  taskElapsed = 0;
  updateDisplay();
  renderLog();
  scrollToCurrentTask();
  if (!paused) {
    startTimer();
  }
}

function togglePause() {
  if (finished) return;
  if (paused) {
    paused = false;
    pauseButton.textContent = 'Pausa';
    startTimer();
  } else {
    pauseButton.textContent = 'Fortsätt';
    stopTimer();
    paused = true;
  }
}

function resetApp() {
  if (timerId !== null) {
    cancelAnimationFrame(timerId);
    timerId = null;
  }
  currentTask = 1;
  currentSection = sections[0];
  startTime = null;
  taskElapsed = 0;
  totalElapsed = 0;
  taskTimes = [];
  finished = false;
  paused = false;
  started = false;
  sectionExpandedState = {};
  nextButton.textContent = 'Nästa uppgift';
  nextButton.disabled = false;
  pauseButton.textContent = 'Pausa';
  pauseButton.disabled = false;
  sectionTypeInputs.forEach(input => {
    input.disabled = false;
  });
  updateDisplay();
  renderLog();
}

function saveResultsAsJpg() {
  const allEntries = taskTimes.slice();
  if (!finished) {
    allEntries.push({
      task: currentTask,
      section: currentSection.name,
      time: taskElapsed,
      current: true
    });
  }

  const sectionTotals = {};
  allEntries.forEach(entry => {
    sectionTotals[entry.section] = (sectionTotals[entry.section] || 0) + entry.time;
  });

  const lines = [];
  lines.push('Högskoleprovet resultat');
  lines.push(`Testtyp: ${currentTestType}`);
  lines.push(`Aktuell uppgift: ${currentTask}/${totalTasks}`);
  lines.push(`Total tid: ${formatTime(totalElapsed + taskElapsed)}`);
  lines.push('');

  sections.forEach(section => {
    const sectionTasks = allEntries.filter(e => e.section === section.name).sort((a, b) => a.task - b.task);
    const sectionCount = section.end - section.start + 1;
    const totalTime = formatTime(sectionTotals[section.name] || 0);
    lines.push(`${section.name} (${sectionCount} uppg.) ${totalTime} (rek. ${section.recommended})`);
    sectionTasks.forEach(entry => {
      const marker = entry.current ? '*' : ' ';
      lines.push(`  ${marker} ${entry.task}: ${formatTime(entry.time)}`);
    });
    lines.push('');
  });

  const width = 1000;
  const lineHeight = 32;
  const padding = 40;
  const height = padding * 2 + lines.length * lineHeight;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 28px Inter, system-ui, sans-serif';
  ctx.fillText('Högskoleprovet resultat', padding, padding - 10);
  ctx.font = '16px Inter, system-ui, sans-serif';
  let y = padding + 30;
  lines.slice(1).forEach((line, index) => {
    if (line === '') {
      y += lineHeight / 2;
      return;
    }
    if (line.startsWith('ORD') || line.startsWith('LÄS') || line.startsWith('MEK') || line.startsWith('ELF') || line.startsWith('XYZ') || line.startsWith('KVA') || line.startsWith('NOG') || line.startsWith('DTK')) {
      ctx.font = 'bold 18px Inter, system-ui, sans-serif';
    } else {
      ctx.font = '16px Inter, system-ui, sans-serif';
    }
    ctx.fillText(line, padding, y);
    y += lineHeight;
  });

  const image = canvas.toDataURL('image/jpeg', 0.92);
  const link = document.createElement('a');
  link.href = image;
  link.download = `högskoleprovet-resultat-${Date.now()}.jpg`;
  link.click();
}

function renderSchedule() {
  const tbody = document.querySelector('#schedule-card tbody');
  tbody.innerHTML = '';
  sections.forEach((section) => {
    const row = document.createElement('tr');
    const count = section.end - section.start + 1;
    const cells = [section.name, count.toString(), `${section.start}–${section.end}`, section.recommended];
    cells.forEach((text) => {
      const td = document.createElement('td');
      td.textContent = text;
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });
}

function handleSpace(event) {
  if (event.code !== 'Space') return;
  const active = document.activeElement;
  if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return;
  event.preventDefault();
  if (!started) {
    started = true;
    startTimer();
    sectionTypeInputs.forEach(input => {
      input.disabled = true;
    });
    return;
  }
  nextTask();
}

scheduleToggle.addEventListener('change', () => {
  scheduleCard.style.display = scheduleToggle.checked ? 'block' : 'none';
});

nextButton.addEventListener('click', nextTask);
pauseButton.addEventListener('click', togglePause);
resetButton.addEventListener('click', resetApp);
if (saveButton) {
  saveButton.addEventListener('click', saveResultsAsJpg);
}
document.addEventListener('keydown', handleSpace);

sectionTypeInputs.forEach((input) => {
  input.addEventListener('change', () => {
    currentTestType = input.value;
    sections = sectionTypes[currentTestType];
    renderSchedule();
    resetApp();
  });
});

updateDisplay();
renderLog();
renderSchedule();
