const navbar=document.getElementById("navbar");
const menuBtn=document.getElementById("menuBtn");
const navLinks=document.getElementById("navLinks");

menuBtn.addEventListener("click",()=>{
  const open=navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded",open);
});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

window.addEventListener("scroll",()=>{
  navbar.classList.toggle("scrolled",window.scrollY>20);
  const sections=[...document.querySelectorAll("section[id]")];
  const y=window.scrollY+150;
  sections.forEach(s=>{
    if(y>=s.offsetTop && y<s.offsetTop+s.offsetHeight){
      document.querySelectorAll(".nav-links a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+s.id));
    }
  });
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{
  glow.style.left=e.clientX+"px"; glow.style.top=e.clientY+"px";
});

document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  const email=document.getElementById("email").value.trim();
  const message=document.getElementById("message").value.trim();
  if(!name||!email||!message)return;

  const text=`Hello Sayeedur Rahman (Shahid),%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
  const whatsapp=`https://wa.me/919124478453?text=${text}`;
  const mail=`mailto:creativesayeedd@gmail.com?subject=${encodeURIComponent("Portfolio Contact — "+name)}&body=${encodeURIComponent("Name: "+name+"\\nEmail: "+email+"\\n\\nMessage:\\n"+message)}`;

  window.open(whatsapp,"_blank","noopener");
  setTimeout(()=>window.location.href=mail,250);
});
