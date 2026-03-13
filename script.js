const chatToggle = document.getElementById("chatToggle");
const chatContainer = document.getElementById("chatContainer");
const chatBody = document.getElementById("chatBody");

let currentMode = ""; // To track if user is in brochure or admission mode

chatToggle.addEventListener("click", () => {
  chatContainer.style.display = chatContainer.style.display === "flex" ? "none" : "flex";
});

function appendMessage(message, type) {
  const msgDiv = document.createElement("div");
  msgDiv.className = type === "bot" ? "bot-msg" : "user-msg";
  msgDiv.innerHTML = message;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function typingAnimation(callback) {
  const typingDiv = document.createElement("div");
  typingDiv.className = "typing";
  typingDiv.textContent = "Zeeby is typing...";
  chatBody.appendChild(typingDiv);
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    typingDiv.remove();
    callback();
  }, 1500);
}

function startChat() {
  document.getElementById("introImage").style.display = "none";
  chatBody.innerHTML = "<div class='bot-msg'>Hi there! I'm <b>Zeeby</b> 🦓<br>I can assist you with:</div>";
  showMainButtons();
}

function userSelect(option) {
  appendMessage(option, "user");
  handleUserInput(option);
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;
  appendMessage(text, "user");
  input.value = "";
  handleUserInput(text);
}

function handleUserInput(text) {
  text = text.toLowerCase();

  if (text.includes("apply")) {
    currentMode = "admission";
    showAdmissionOptions();

  } else if (text.includes("undergraduate")) {
    showCourses("Undergraduate");

  } else if (text.includes("postgraduate")) {
    showCourses("Postgraduate");

  } else if (text.includes("programs")) {
    currentMode = "brochure";
    showAllPrograms();

  } else {
    typingAnimation(() =>
      appendMessage("I'm not sure I understand. Please select an option.", "bot")
    );
  }
}

function showMainButtons() {
  const grid = document.createElement("div");
  grid.className = "button-grid";
  grid.innerHTML = `
    <button class='chat-btn' onclick="userSelect('Programs & Brochures')">Programs & Brochures</button>
    <button class='chat-btn' onclick="userSelect('Apply for Admission')">Apply for Admission</button>
    <button class='chat-btn' onclick="showPlacements()">Placements</button>
    <button class='chat-btn' onclick="openStudentLife()">Student Life</button>

  `;
  chatBody.appendChild(grid);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function showAdmissionOptions() {
  typingAnimation(() => {
    const grid = document.createElement("div");
    grid.className = "button-grid";
    grid.innerHTML = `
      <button class='chat-btn' onclick="userSelect('Undergraduate')">Undergraduate</button>
      <button class='chat-btn' onclick="userSelect('Postgraduate')">Postgraduate</button>
    `;
    appendMessage("Please choose your admission level:", "bot");
    chatBody.appendChild(grid);
  });
}

function showPlacements() {
  typingAnimation(() => {
    appendMessage(`
      <b>📌 Placement Highlights:</b><br><br>
      1️⃣ <b>Top-Ranked University:</b> Ranked 3rd in Dental, 15th in Medical, and 46th in the University category by NIRF 2022 (Ministry of Education, Government of India).<br><br>
      2️⃣ <b>Internationally Recognized:</b> ISO 9001:2015, ISO 14001:2015 Certified, and a Green Education Campus.<br><br>
      3️⃣ <b>100% Placement Assistance:</b> We support students until they land their dream job.
    `, "bot");

    const grid = document.createElement("div");
    grid.className = "button-grid";
    grid.innerHTML = `
      <button class='chat-btn' onclick="openAchievements()">🏆 Achievements</button>
    `;

    chatBody.appendChild(grid);
  });
}

function openAchievements() {
  window.location.href = "https://dypsst.dpu.edu.in/achievements.aspx";
}



function showCourses(level) {
  typingAnimation(() => {
    const grid = document.createElement("div");
    grid.className = "button-grid";

    if (level === "Undergraduate") {
      grid.innerHTML = `
        <button class='chat-btn' onclick="showCourseOptions('B.Tech CSE')">B.Tech CSE</button>
        <button class='chat-btn' onclick="showCourseOptions('B.Tech AIDS')">B.Tech AIDS</button>
        <button class='chat-btn' onclick="showCourseOptions('BCA')">BCA</button>
      `;
    } else {
      grid.innerHTML = `<button class='chat-btn' onclick="showCourseOptions('MCA')">MCA</button>`;
    }

    appendMessage(`Select a course for ${level} admission:`, "bot");
    chatBody.appendChild(grid);
  });
}

function showAllPrograms() {
  typingAnimation(() => {
    appendMessage("Here are all our available programs:", "bot");

    const grid = document.createElement("div");
    grid.className = "button-grid";
    grid.innerHTML = `
      <button class='chat-btn' onclick="showCourseOptions('B.Tech CSE')">B.Tech CSE</button>
      <button class='chat-btn' onclick="showCourseOptions('B.Tech AIDS')">B.Tech AIDS</button>
      <button class='chat-btn' onclick="showCourseOptions('BCA')">BCA</button>
      <button class='chat-btn' onclick="showCourseOptions('MCA')">MCA</button>
    `;

    chatBody.appendChild(grid);
  });
}

function openStudentLife() {
  window.open("https://dypsst.dpu.edu.in/life@dpu.aspx", "_blank");
}


function showCourseOptions(course) {
  const brochureLinks = {
    "B.Tech CSE": "https://dpu.edu.in/Documents/2025/information-brochure/SST-CSE-BTech-Brochure-2025.pdf?v=12345",
    "B.Tech AIDS": "https://dpu.edu.in/Documents/2025/information-brochure/SST-CSE-BTech-Brochure-2025.pdf?v=12345",
    "BCA": "https://dpu.edu.in/Documents/2025/information-brochure/SST-BSc-BCA-Brochure-2025.pdf?v=12345",
    "MCA": "https://dpu.edu.in/Documents/2025/information-brochure/SST-MCA-Brochure-2025.pdf?v=12345"
  };

  typingAnimation(() => {
    appendMessage(`Here are options for <b>${course}</b>:`, "bot");

    const grid = document.createElement("div");
    grid.className = "button-grid";

    if (currentMode === "brochure") {
      grid.innerHTML = `
        <button class='chat-btn' onclick="window.open('${brochureLinks[course]}', '_blank')">📘 View Brochure</button>
      `;
    } else {
      grid.innerHTML = `
        <button class='chat-btn' onclick="window.open('${brochureLinks[course]}', '_blank')">📘 View Brochure</button>
        <button class='chat-btn' onclick="showEligibility('${course}')">🎓 Eligibility</button>
        <button class='chat-btn' onclick="applyNow('${course}')">🚀 Apply Now</button>
      `;
    }

    chatBody.appendChild(grid);
  });
}

function showEligibility(course) {
  typingAnimation(() => {
    appendMessage(`🎓 Eligibility for <b>${course}</b>: Minimum 60% in qualifying exams.`, "bot");
  });
}

function applyNow(course) {
  typingAnimation(() => {
    appendMessage(`📝 You can apply for <b>${course}</b> using the link below:`, "bot");
    appendMessage(
      `<a href="https://admissions.dpuerp.in/LandingPages/Default2.aspx?I=15" target="_blank">
        <button class='chat-btn'>🚀 Apply Now</button>
      </a>`,
      "bot"
    );
  });
}
