import test from 'node:test';
import assert from 'node:assert/strict';
import {FACTS,DAY_MS,EPOCH,getDailyFact,millisecondsUntilNextDay} from '../facts.mjs';

test('All eight entries include topic evidence and a separate historical citation',()=>{
  assert.equal(FACTS.length,8);
  assert.equal(new Set(FACTS.map(f=>f.id)).size,8);
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
test('Rotation covers every entry and repeats only after eight days',()=>{
  const cycle=Array.from({length:8},(_,i)=>getDailyFact(new Date(EPOCH+i*DAY_MS)).fact.id);
  assert.equal(new Set(cycle).size,8);
  assert.equal(getDailyFact(new Date(EPOCH+8*DAY_MS)).index,0);
  assert.equal(getDailyFact(new Date(EPOCH-1)).index,7);
});
test('UTC day boundaries work across leap day and year change',()=>{
  for(const instant of ['2028-02-28T23:59:59.999Z','2028-02-29T23:59:59.999Z','2026-12-31T23:59:59.999Z']){
    const time=new Date(instant);
    assert.equal(millisecondsUntilNextDay(time),1);
    assert.equal(getDailyFact(new Date(time.getTime()+1)).index,(getDailyFact(time).index+1)%8);
  }
  assert.equal(millisecondsUntilNextDay(new Date('2026-10-21T00:00:00Z')),DAY_MS);
});
test('Invalid dates are rejected',()=>assert.throws(()=>getDailyFact(new Date('invalid')),TypeError));
