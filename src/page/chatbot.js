(function(){
  var fab   = document.getElementById('tee-chat-fab');
  var panel = document.getElementById('tee-chat-panel');
  var body  = document.getElementById('tee-chat-body');
  var faq   = document.getElementById('tee-faq');
  var input = document.getElementById('tee-chat-input');
  var side  = document.getElementById('tee-sidemenu');
  var sideShown = false;

  function openChat()  { panel.style.display='flex'; setTimeout(function(){ panel.classList.add('tee-open'); }, 10); }
  function closeChat() { panel.classList.remove('tee-open'); setTimeout(function(){ panel.style.display='none'; }, 200); }

  fab.addEventListener('click', function(){ panel.classList.contains('tee-open') ? closeChat() : openChat(); });
  document.getElementById('tee-chat-close').addEventListener('click', closeChat);

  var A = {
    programs: '📚 <strong>TEE-ийн хөтөлбөрүүд:</strong><br><br>🎯 Scratch Pixels — 3-5-р анги<br>🐍 Zero 2 Hero (Python) — 12-16 нас<br>⚡ Electrikid (Arduino) — 9-13 нас<br>🌐 Web Design 101 — дунд анги<br>💻 Python Programmer — ахлах анги',
    price:    '💰 <strong>Төлбөрийн мэдээлэл:</strong><br><br>Дэлгэрэнгүй мэдээлэл авахын тулд бидэнтэй холбогдоорой:<br>📞 +976 90806161<br>✉️ info@tee.education<br><br>Мөн үнэгүй сургалтууд байдаг!',
    location: '📍 <strong>Салбарууд:</strong><br><br>1. Gem Castle (СУИС-ийн урд) — 15 давхар, 1501 тоот<br>2. Натур плаза<br>3. Яармаг<br>4. Gem Mall (25-р эмийн сан)<br>5. Тусгал (Тэнгис кино театрын хойно)',
    contact:  '📞 <strong>Холбоо барих:</strong><br><br>📱 +976 90806161<br>✉️ info@tee.education<br>🕐 10:00 – 17:30 (Да–Ба)<br><br>Фейсбүүк, Instagram хуудаснаас ч холбогдож болно!',
    age:      '👶 <strong>Насны ангилал:</strong><br><br>📗 Бага анги: 8-12 нас (3-5-р анги)<br>📘 Дунд анги: 12-15 нас (6-9-р анги)<br>📕 Ахлах анги: 15-18 нас<br><br>Яг тохирох хөтөлбөр олохын тулд бүртгүүлэх хэлтэс рүү хандаарай!',
    schedule: '🕐 <strong>Хичээлийн хуваарь:</strong><br><br>📅 7 хоногт 2 удаа<br>⏱ 1.5-2 цаг тус бүр<br>🗓 Ажлын болон амралтын өдрүүдэд<br><br>Дэлгэрэнгүй хуваарийг бүртгүүлэхдээ тохиролцоно уу.'
  };

  function addBubble(html, type) {
    var b = document.createElement('div');
    b.className = 'tee-bubble tee-' + type;
    b.innerHTML = html;
    body.appendChild(b);
    body.scrollTop = body.scrollHeight;
  }

  function addTyping() {
    var t = document.createElement('div');
    t.className = 'tee-bubble tee-bot';
    t.id = 'tee-typing';
    t.innerHTML = '<span style="opacity:.5">●●●</span>';
    body.appendChild(t);
    body.scrollTop = body.scrollHeight;
    return t;
  }

  function showSide() {
    if (sideShown) return;
    sideShown = true;
    side.style.display = 'flex';
    faq.style.display = 'none';
  }

  function handleQ(q, label) {
    showSide();
    document.querySelectorAll('.tee-side-chip').forEach(function(c){
      c.classList.toggle('tee-active', c.dataset.q === q);
    });
    addBubble(label, 'user');
    var t = addTyping();
    setTimeout(function(){
      t.remove();
      addBubble(A[q] || 'Мэдээллийг удахгүй нэмнэ. Утсаар холбогдоорой: 📞 +976 90806161', 'bot');
    }, 900);
  }

  document.querySelectorAll('.tee-faq-chip').forEach(function(chip){
    chip.addEventListener('click', function(){ handleQ(chip.dataset.q, chip.textContent); });
  });

  document.querySelectorAll('.tee-side-chip').forEach(function(chip){
    chip.addEventListener('click', function(){
      var icon  = chip.querySelector('.tee-side-chip-icon').textContent;
      var label = chip.querySelector('.tee-side-chip-label').textContent;
      handleQ(chip.dataset.q, icon + ' ' + label);
    });
  });

  function sendMsg() {
    var v = input.value.trim();
    if (!v) return;
    showSide();
    addBubble(v, 'user');
    input.value = '';
    document.querySelectorAll('.tee-side-chip').forEach(function(c){ c.classList.remove('tee-active'); });
    var t = addTyping();
    setTimeout(function(){
      t.remove();
      var lo = v.toLowerCase();
      var ans = 'Асуулт хүлээж авлаа! Дэлгэрэнгүй мэдээлэл авахын тулд:<br>📞 +976 90806161<br>✉️ info@tee.education';
      if      (lo.includes('үнэ')||lo.includes('төлбөр')||lo.includes('мөнгө'))                              ans = A.price;
      else if (lo.includes('хаана')||lo.includes('байршил')||lo.includes('салбар'))                          ans = A.location;
      else if (lo.includes('хөтөлбөр')||lo.includes('сургалт')||lo.includes('python')||lo.includes('scratch')) ans = A.programs;
      else if (lo.includes('нас')||lo.includes('хэдэн'))                                                     ans = A.age;
      else if (lo.includes('хуваарь')||lo.includes('цаг'))                                                   ans = A.schedule;
      else if (lo.includes('холбоо')||lo.includes('утас')||lo.includes('имэйл'))                             ans = A.contact;
      addBubble(ans, 'bot');
    }, 1000);
  }

  document.getElementById('tee-chat-send').addEventListener('click', sendMsg);
  input.addEventListener('keydown', function(e){ if (e.key === 'Enter') sendMsg(); });
})();
