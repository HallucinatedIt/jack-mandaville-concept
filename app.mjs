import {getDailyFact, millisecondsUntilNextDay} from './facts.mjs?v=20261021-5';

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if (menu && nav) {
  document.documentElement.classList.add('js');
  menu.hidden = false;
  const closeMenu = () => {menu.setAttribute('aria-expanded', 'false');nav.classList.remove('is-open');};
  menu.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open', !expanded);
  });
  nav.addEventListener('click', event => {if(event.target.closest('a')) closeMenu();});
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {closeMenu();menu.focus();}
  });
  matchMedia('(min-width:721px)').addEventListener('change', closeMenu);
}

let midnightTimer;
let renderedDate;
function renderDailyFact() {
  if(!document.querySelector('#fact-title')) return;
  const now = new Date();
  const {fact,date} = getDailyFact(now);
  if(date !== renderedDate) {
    document.querySelector('#fact-label').textContent = 'TODAY’S FIELD NOTE';
    const time = document.querySelector('#fact-date');
    time.dateTime = date;
    time.textContent = new Intl.DateTimeFormat('en-US',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'}).format(now).toUpperCase();
    document.querySelector('#fact-category').textContent = fact.category;
    document.querySelector('#fact-title').textContent = fact.title;
    document.querySelector('#fact-text').textContent = fact.text;
    const episode = document.querySelector('#fact-episode');
    episode.href = fact.episodeUrl;
    episode.querySelector('strong').textContent = fact.episode;
    const source = document.querySelector('#fact-source');
    source.href = fact.sourceUrl;
    source.textContent = fact.source;
    document.querySelector('#fact-index').textContent = 'VERIFIED TOPIC · SOURCES LINKED';
    renderedDate = date;
  }
  clearTimeout(midnightTimer);
  midnightTimer = setTimeout(renderDailyFact, millisecondsUntilNextDay(now)+50);
}
renderDailyFact();
document.addEventListener('visibilitychange', () => {if(!document.hidden) renderDailyFact();});
window.addEventListener('pageshow', renderDailyFact);

const ticker = document.querySelector('.ticker');
const tickerToggle = document.querySelector('.ticker-toggle');
if (ticker && tickerToggle) {
  tickerToggle.hidden = false;
  tickerToggle.addEventListener('click', () => {
    const paused = tickerToggle.getAttribute('aria-pressed') !== 'true';
    tickerToggle.setAttribute('aria-pressed', String(paused));
    tickerToggle.setAttribute('aria-label', paused ? 'Resume scrolling text' : 'Pause scrolling text');
    tickerToggle.textContent = paused ? 'RESUME' : 'PAUSE';
    ticker.classList.toggle('is-paused', paused);
  });
}
