// ====== Partículas (pétalas) ======
(function createPetals(){
  const root = document.getElementById("petals");
  if(!root) return;

  const count = 22; // aumenta/diminui
  for(let i=0;i<count;i++){
    const p = document.createElement("span");
    p.className = "petal";

    const left = Math.random() * 100;
    const delay = (Math.random() * 10).toFixed(2);
    const dur = (14 + Math.random()*12).toFixed(2); // 14-26s
    const sway = (2.4 + Math.random()*2.2).toFixed(2);

    p.style.left = `${left}%`;
    p.style.animationDuration = `${dur}s, ${sway}s`;
    p.style.animationDelay = `${delay}s, ${delay}s`;

    // tamanhos diferentes
    const size = 6 + Math.random()*6;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.opacity = `${0.25 + Math.random()*0.45}`;

    root.appendChild(p);
  }
})();

// ====== Reveal on scroll ======
(function revealOnScroll(){
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.12 });

  els.forEach(el=>io.observe(el));
})();

// ====== Galeria (bolinhas) ======
(function galleryDots(){
  const slides = document.getElementById("slides");
  const dots = document.querySelectorAll(".dot");
  if(!slides || dots.length === 0) return;

  function goTo(index){
    // Em desktop: 3 colunas (não precisa mover). Em mobile: vira 1 coluna, então vamos rolar até o item.
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    dots.forEach(d=>d.classList.remove("active"));
    dots[index]?.classList.add("active");

    if(isMobile){
      const items = slides.querySelectorAll(".photo");
      items[index]?.scrollIntoView({ behavior:"smooth", block:"nearest" });
    } else {
      // Só dá um destaque (opcional)
      const items = slides.querySelectorAll(".photo");
      items.forEach((it, i)=> it.style.transform = (i===index ? "rotate(0deg) scale(1.05)" : "rotate(0deg) scale(1)"));
      setTimeout(()=> items.forEach(it=> it.style.transform = ""), 650);
    }
  }

  dots.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
      const idx = Number(btn.dataset.go || 0);
      goTo(idx);
    });
  });
})();

// ====== Música (play/pause) ======
(function music(){
  const btn = document.getElementById("btnPlay");
  const audio = document.getElementById("audio");
  if(!btn || !audio) return;

  let playing = false;

  function setState(on){
    playing = on;
    btn.setAttribute("aria-label", on ? "Pausar música" : "Tocar música");
    btn.style.filter = on ? "brightness(1.12)" : "none";
    btn.querySelector(".triangle").style.borderLeftColor = on ? "rgba(255,255,255,.92)" : "rgba(242,229,184,.95)";
  }

  btn.addEventListener("click", async ()=>{
    try{
      if(!playing){
        await audio.play();
        setState(true);
      } else {
        audio.pause();
        setState(false);
      }
    } catch (e){
      // Alguns navegadores bloqueiam play sem interação válida — mas aqui é clique, então normalmente vai.
      alert("Não consegui tocar o áudio. Coloque um arquivo mp3 em /assets/musica.mp3");
      setState(false);
    }
  });
})();
