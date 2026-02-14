const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const messageDiv = document.querySelector('.message');
const container = document.querySelector('.container');
const photo = document.getElementById('image')
const messages = [
  "Are you sure? 😟",
  "Please say yes 🙏🏻",
  "Ohh, I really love you 🥺",
  "okie you can say noo...",
  "you broke my heart 😭"
];

let noClicks = 0;

// Store original parent and index in buttons row
let originalParent = noBtn.parentNode;
let originalIndex = Array.from(originalParent.children).indexOf(noBtn);

// Motion blur effect
function addMotionBlur() {
  noBtn.classList.add("motion-blur");
  setTimeout(() => noBtn.classList.remove("motion-blur"), 300);
}

// Move No button randomly without affecting Yes
function moveNoButton() {
  // ამოღებული `fixed`, დივის flow არ ირღვევა
  const containerRect = container.getBoundingClientRect();
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const maxX = container.offsetWidth - btnWidth - 10;
  const maxY = container.offsetHeight - btnHeight - 10;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  // translate–ით გადაადგილება, Flow–ს არ შევარცხვინებთ
  noBtn.style.transform = `translate(${randomX - noBtn.offsetLeft}px, ${randomY - noBtn.offsetTop}px)`;

  addMotionBlur();
}

// No button click handler
noBtn.addEventListener('click', () => {
  noClicks++;

  if (noClicks <= 4) {
    if (noClicks <= messages.length) messageDiv.textContent = messages[noClicks - 1];
    moveNoButton();
  } else if (noClicks === 5) {
    const yesRect = yesBtn.getBoundingClientRect();
    noBtn.style.left = `${yesRect.right + 10}px`;
    noBtn.style.top = `${yesRect.top}px`;
    noBtn.classList.add("no-to-yes");

    // Hover text change
    noBtn.addEventListener('mouseenter', () => { noBtn.textContent = 'Yes'; });
    noBtn.addEventListener('mouseleave', () => { noBtn.textContent = 'No'; });

    // Dance around Yes
    let danceCount = 0;
    const danceInterval = setInterval(() => {
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 40;
      noBtn.style.left = `${yesRect.right + 10 + offsetX}px`;
      noBtn.style.top = `${yesRect.top + offsetY}px`;
      danceCount++;
      if (danceCount > 30) clearInterval(danceInterval);
    }, 100);

    noBtn.addEventListener('click', yesActionAfterNo, { once: true });
  }
});

// After acting as Yes, reset No and show final action
function yesActionAfterNo() {
  yesAction();

  noBtn.style.transition = "";
  noBtn.style.position = "relative";
  noBtn.style.left = "";
  noBtn.style.top = "";
  noBtn.style.transform = "scale(1)";
  noBtn.classList.remove("no-to-yes");
  noBtn.textContent = "No";

  // Insert back into original flex row
  originalParent.insertBefore(noBtn, originalParent.children[originalIndex]);
  noClicks = 0;
}

// Yes button click
function yesAction() {
  container.innerHTML = `
    <img src="https://cdn.cdnstep.com/l3XP16i4jNpGBntzrSqF/27-1.thumb128.png" alt="cute bears kissing" class="bear-sticker">
    <div class="final">I knew it, love you so much 💖</div>
  `;

  // 🌸 დიდი ♥ გული
  const bigHeart = document.createElement('div');
  bigHeart.classList.add('big-heart');
  document.body.appendChild(bigHeart);

  requestAnimationFrame(() => {
    bigHeart.style.transform = 'translate(-50%, -50%) scale(20)'; // ეკრანს თითქმის ფარავს
    bigHeart.style.opacity = '0'; // ნელა ქრება
  });

  // 2.5 წამში წაშლა DOM–დან
  setTimeout(() => {
    bigHeart.remove();
  }, 2500);

  // Floating rain image
  const imgSrc = photo.src;
  drops.forEach(drop => {
    drop.img = new Image();
    drop.img.src = imgSrc;
    drop.width = 40 + Math.random() * 60;
    drop.height = drop.width;
  });

  function drawImages() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drops.forEach(drop => {
      ctx.drawImage(drop.img, drop.x, drop.y, drop.width, drop.height);
      drop.y += drop.speed;
      if (drop.y > canvas.height) {
        drop.y = -drop.height;
        drop.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(drawImages);
  }

  drawImages();
}

yesBtn.addEventListener('click', yesAction);

// Hover scaling for No
noBtn.addEventListener('mouseenter', () => {
  noBtn.style.transform = "scale(1.15)";
});
noBtn.addEventListener('mouseleave', () => {
  noBtn.style.transform = "scale(1)";
});

// -----------------------------
// Rain effect
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

let phrases = [
  "I love you", "Te quiero", "Je t'aime", "Ich liebe dich", "Ti amo", "Eu te amo", "Я тебя люблю", "愛してる",
  "사랑해", "Saya cinta padamu", "Jeg elsker dig", "Σ' αγαπώ", "Te iubesc", "Ik hou van jou", "Aš tave myliu",
  "Minä rakastan sinua", "Wo ai ni", "Aku cinta kamu", "Ek het jou lief", "Tha gaol agam ort", "Tá grá agam duit",
  "Ani ohev otach", "Szeretlek", "Miluji tě", "Seni seviyorum", "Nakupenda", "Mahal kita", "Main tumhe pyaar karti hoon"
];

let drops = [];

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drops = [];
  for (let i = 0; i < 120; i++) {
    drops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      text: phrases[Math.floor(Math.random() * phrases.length)],
      speed: 1 + Math.random() * 3
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "16px Comic Sans MS";
  ctx.fillStyle = "rgba(255,105,180,0.8)";
  drops.forEach(drop => {
    ctx.fillText(drop.text, drop.x, drop.y);
    drop.y += drop.speed;
    if (drop.y > canvas.height) {
      drop.y = -20;
      drop.x = Math.random() * canvas.width;
      drop.text = phrases[Math.floor(Math.random() * phrases.length)];
    }
  });
  requestAnimationFrame(draw);
}

window.addEventListener('resize', init);
init();
draw();

// -----------------------------
// Floating hearts
function createHeart() {
  const heartsContainer = document.querySelector('.hearts');
  const count = 5; // ერთი გაშვების დროს 5 გული
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${3 + Math.random() * 3}s`;
    heartsContainer.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 6000);
  }
}

// 0.2 წამში ერთხელ ქმნის გულებს
setInterval(createHeart, 200);
