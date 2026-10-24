const menu=document.getElementById('menu');
const nav=document.getElementById('nav');
function closeMenu(returnFocus=false){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Buka menu');if(returnFocus)menu?.focus();}
menu?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');menu.setAttribute('aria-expanded',String(Boolean(open)));menu.setAttribute('aria-label',open?'Tutup menu':'Buka menu');});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open'))closeMenu(true);});
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
window.matchMedia('(min-width:1101px)').addEventListener('change',()=>closeMenu());
let english=false;
try{english=localStorage.getItem('gojogja_language')==='en';}catch{}
const language=document.getElementById('language');
function applyLanguage(){if(!language)return;document.documentElement.lang=english?'en':'id';language.textContent=english?'ID':'EN';language.setAttribute('aria-label',english?'Ganti ke bahasa Indonesia':'Switch to English');document.querySelectorAll('[data-id][data-en]').forEach(el=>{el.innerHTML=english?el.dataset.en:el.dataset.id;});}
language?.addEventListener('click',()=>{english=!english;try{localStorage.setItem('gojogja_language',english?'en':'id');}catch{}applyLanguage();});
applyLanguage();
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const date=document.getElementById('date');
function todayLocal(){const now=new Date();return new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10);}
if(date){date.min=todayLocal();date.value=date.min;date.addEventListener('input',()=>date.setCustomValidity(''));}
document.getElementById('tripForm')?.addEventListener('submit',e=>{e.preventDefault();if(date.value<todayLocal()){date.setCustomValidity(english?'Choose today or a future date.':'Pilih hari ini atau tanggal mendatang.');date.reportValidity();return;}const service=document.getElementById('service').value;const travelDate=date.value;const people=document.getElementById('people').value;const text=encodeURIComponent(`Halo GoJogja Travel! Saya ingin merencanakan perjalanan.\nJenis: ${service}\nTanggal: ${travelDate}\nWisatawan: ${people} orang\nMohon info paket dan harga.\nHello, I'd like to plan a trip. Please share available packages and prices.`);window.open('https://wa.me/6285659837378?text='+text,'_blank','noopener');});
