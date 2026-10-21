import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {FACTS,DAY_MS,EPOCH,getDailyFact,millisecondsUntilNextDay} from '../facts.mjs';

test('All curated entries include topic evidence and a separate historical citation',()=>{
  assert.equal(FACTS.length,45);
  assert.equal(new Set(FACTS.map(f=>f.id)).size,FACTS.length);
  for(const fact of FACTS){
    for(const key of ['title','text','episode','show','source','verified']) assert.ok(fact[key]);
    assert.match(fact.episodeUrl,/^https:\/\/www\.(youtube\.com\/watch\?v=|pepperbox\.tv\/video\/)/);
    assert.equal(new URL(fact.sourceUrl).protocol,'https:');
    assert.notEqual(new URL(fact.sourceUrl).hostname,new URL(fact.episodeUrl).hostname);
    assert.ok(Object.isFrozen(fact));
  }
});
test('The same UTC day always yields the same entry',()=>{
  assert.equal(getDailyFact(new Date('2026-10-21T00:00:00Z')).index,0);
  assert.equal(getDailyFact(new Date('2026-10-21T23:59:59.999Z')).index,0);
  assert.equal(getDailyFact(new Date('2026-10-21T18:00:00-06:00')).index,1);
});
test('Rotation covers the full collection before repeating',()=>{
  const cycle=Array.from({length:FACTS.length},(_,i)=>getDailyFact(new Date(EPOCH+i*DAY_MS)).fact.id);
  assert.equal(new Set(cycle).size,FACTS.length);
  assert.equal(getDailyFact(new Date(EPOCH+FACTS.length*DAY_MS)).index,0);
  assert.equal(getDailyFact(new Date(EPOCH-1)).index,FACTS.length-1);
});
test('UTC day boundaries work across leap day and year change',()=>{
  for(const instant of ['2028-02-28T23:59:59.999Z','2028-02-29T23:59:59.999Z','2026-12-31T23:59:59.999Z']){
    const time=new Date(instant);
    assert.equal(millisecondsUntilNextDay(time),1);
    assert.equal(getDailyFact(new Date(time.getTime()+1)).index,(getDailyFact(time).index+1)%FACTS.length);
  }
  assert.equal(millisecondsUntilNextDay(new Date('2026-10-21T00:00:00Z')),DAY_MS);
});
test('Invalid dates are rejected',()=>assert.throws(()=>getDailyFact(new Date('invalid')),TypeError));


test('Consecutive dates change topics, including at the cycle boundary',()=>{
  assert.equal(new Set(FACTS.map(f=>f.text)).size,FACTS.length);
  assert.equal(new Set(FACTS.map(f=>f.title)).size,FACTS.length);
  for(let i=0;i<FACTS.length;i++) assert.notEqual(FACTS[i].topic,FACTS[(i+1)%FACTS.length].topic);
});

test('The source notebook includes every fact, topic link, and citation',()=>{
  const html=readFileSync(new URL('../sources.html',import.meta.url),'utf8');
  const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  assert.equal((html.match(/class="source-entry"/g)||[]).length,FACTS.length);
  for(const f of FACTS){
    assert.ok(html.includes(`id="${f.id}"`));
    for(const value of [f.title,f.text,f.episodeUrl,f.sourceUrl])assert.ok(html.includes(escape(value)),f.id);
  }
});

test('Public copy does not announce collection totals or repeat intervals',()=>{
  for(const name of ['index.html','sources.html','app.mjs']){
    const contents=readFileSync(new URL('../'+name,import.meta.url),'utf8');
    assert.doesNotMatch(contents,/eight (?:researched )?entries|all eight|after eight days|45 (?:facts|entries)|forty-five|NOTE \$\{|FACTS\.length/i);
  }
});
