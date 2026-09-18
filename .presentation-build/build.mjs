import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {Presentation, PresentationFile} from '@oai/artifact-tool';
import {slides} from './content.mjs';

const root=path.resolve('..');
const skill='C:/Users/anils/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.11809/skills/presentations';
const python='C:/Users/anils/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
process.env.RUNTIME_NODE_MODULES='C:/Users/anils/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
process.env.RUNTIME_NODE='C:/Users/anils/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe';
process.env.RUNTIME_PYTHON=python;
process.env.RUNTIME_BIN_DIR='C:/Users/anils/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override';
const {resolvePresentationFont,finalizePresentation}=await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')).href);
const family=resolvePresentationFont();
console.log('Font:',family,'Slides:',slides.length);
const p=Presentation.create({slideSize:{width:1280,height:720}});
const colors={ink:'#142C3E',muted:'#566574',accent:'#087D87',navy:'#102938',paper:'#F8F9FA',white:'#FFFFFF',line:'#DBE3E8'};
const tableOwners=[];
const docCache=new Map();
async function doc(name){if(!docCache.has(name))docCache.set(name,await fs.readFile(path.join(root,'implementation-plan',name),'utf8'));return docCache.get(name);}
function text(slide,value,x,y,w,h,size=28,color=colors.ink,bold=false){
  const s=slide.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  s.text=value;s.text.style={typeface:family,fontSize:size,bold,color,autoFit:'none'};return s;
}
for(let i=0;i<slides.length;i++){
 const d=slides[i],s=p.slides.add();s.background.fill=d.type==='cover'?colors.navy:colors.paper;
 if(d.type==='cover'){
  text(s,d.title,72,155,1120,115,76,colors.white,true);
  text(s,d.subtitle,76,288,1100,100,38,'#A9E0DF');
  text(s,d.detail,76,484,1100,135,25,'#D0DDE3');
 }else{
  text(s,d.title,64,43,1150,104,44,colors.ink,true);
  if(d.cols){
   const values=[d.cols,...d.rows];
   const widths=d.cols.length===2?[365,771]:[330,270,536];
   if(d.title.startsWith('Roadmap:'))widths.splice(0,3,180,796,160);
   if(d.cols[1]==='Task IDs')widths.splice(0,3,335,175,626);
   if(d.title.startsWith('Work packages'))widths.splice(0,3,395,230,511);
   if(d.title==='Open core and commercial value')widths.splice(0,2,480,656);
   if(d.title==='Support effort changes the price floor'){widths.splice(0,3,596,270,270);}
   const t=s.tables.add({rows:values.length,columns:d.cols.length,left:72,top:167,width:1136,height:450,columnWidths:widths,values});
   t.borders.assign({fill:colors.line,width:0.7,style:'solid'});
   const rowH=400/d.rows.length;
   t.rows[0].height=50;
   for(let r=0;r<values.length;r++){
    if(r)t.rows[r].height=rowH;
    for(let c=0;c<d.cols.length;c++){
     t.getCell(r,c).fill=r===0?colors.navy:(r%2?'#FFFFFF':'#EEF3F5');
     t.getCell(r,c).text.style={typeface:family,fontSize:24,bold:r===0||c===0,color:r===0?colors.white:colors.ink};
    }
   }
   tableOwners.push(i+1);
  }else{
   let start=175;
   if(d.lead){text(s,d.lead,72,151,1110,69,29,colors.accent);start=240;}
   const gap=d.lead?89:108;
   for(let j=0;j<d.items.length;j++){
    text(s,d.items[j][0],72,start+j*gap,313,80,27,colors.accent,true);
    text(s,d.items[j][1],410,start+j*gap,793,88,28,colors.ink);
   }
  }
  if(d.foot)text(s,d.foot,74,630,1090,48,19,colors.muted);
  text(s,String(i+1).padStart(2,'0'),1195,672,50,26,17,colors.muted);
 }
 const source=await doc(d.src);
 const urls=[...new Set([...source.matchAll(/https?:\/\/[^\s)]+/g)].map(m=>m[0]))];
 let notes=`${d.title}\n\n${d.lead||d.subtitle||''}\n\n`;
 if(d.items)notes+=d.items.map(x=>x.join(': ')).join('\n\n');
 if(d.rows)notes+=d.rows.map(x=>x.join(' / ')).join('\n');
 notes+='\n\nProject documentation: implementation-plan/'+d.src+'\nDocumentation baseline: 18 September 2026. Schedule values are targets measured from kickoff.\n';
 if(urls.length)notes+='\nExternal references in the underlying source:\n'+urls.join('\n');
 if(d.full)notes+='\n\nDETAILED PROJECT REFERENCE\n\n'+source;
 s.speakerNotes.textFrame.setText(notes);
}
await fs.writeFile('slide-map.json',JSON.stringify(slides.map((s,i)=>({slide:i+1,title:s.title,source:s.src,fullSourceNotes:!!s.full})),null,2));
await fs.writeFile('font-policy.json',JSON.stringify({basis:'design',families:[family]}));
await (await PresentationFile.exportPptx(p)).save('candidate.pptx');
console.log('Draft saved');
const result=await finalizePresentation({workspaceDir:root,candidatePath:path.resolve('candidate.pptx'),finalPath:path.join(root,'presentations','AegisAI-Team-Project-Briefing-v2.pptx'),pythonExecutable:python,integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit',...tableOwners.flatMap(n=>['--require-native-table-slide',String(n)])],requiredNativeTableOwnerSlides:tableOwners,fontPolicy:{basis:'design',families:[family]},verifyArtifactToolImport:true,receiptPath:path.resolve('validation-v2.json')});
console.log(JSON.stringify(result));
