import {cp,mkdir,rm} from 'node:fs/promises';
const root=new URL('./',import.meta.url);
const output=new URL('./dist/',root);
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
for(const file of ['index.html','sources.html','styles.css','app.mjs','facts.mjs','assets','.nojekyll']){
  await cp(new URL(file,root),new URL(file,output),{recursive:true});
}
console.log('Static site built in dist/');
