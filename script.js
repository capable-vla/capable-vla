const stages={
  history:{index:'01 / OBSERVE',title:'What was commanded? What actually moved?',description:'A shared temporal encoder processes a 16-step command–response history for each of seven joints. Sharing the encoder avoids a fixed learned joint identity while preserving each joint’s measured behavior.',symbol:'q̇ → Δq'},
  grounding:{index:'02 / GROUND',title:'What can each joint do right now?',description:'The live Jacobian grounds every history embedding in the current configuration. Cross-joint attention combines the seven representations into a 64-dimensional capability latent, with no learned joint-ID embedding.',symbol:'J(q) → z'},
  control:{index:'03 / ADAPT',title:'Correct the arm action. Keep the task prior.',description:'Self-supervised joint and end-effector motion prediction shapes the latent. A FiLM-conditioned SAC actor uses it to add a bounded residual to the six arm action dimensions while the frozen VLA retains control of the gripper.',symbol:'a + Δa'}
};
const tabs=[...document.querySelectorAll('[data-stage]')],panel=document.querySelector('#stage-detail');
tabs.forEach(tab=>tab.addEventListener('click',()=>{
  tabs.forEach(other=>other.setAttribute('aria-selected',String(other===tab)));
  const stage=stages[tab.dataset.stage];
  panel.querySelector('.stage-index').textContent=stage.index;
  panel.querySelector('h3').textContent=stage.title;
  panel.querySelector('p').textContent=stage.description;
  panel.querySelector('.stage-symbol').textContent=stage.symbol;
}));

const results={
  unseen:{title:'Globally unseen j₂ lock',values:[24.8,41.9,59.3],note:'28 LIBERO tasks. CAPABLE gains 17.4 points over the matched global-history SAC baseline.'},
  seen:{title:'Seen joint locks',values:[41.6,73.8,86.7],note:'28 LIBERO tasks. Training faults affect j₀, j₄, j₅, and j₆.'},
  healthy:{title:'Healthy execution',values:[91.4,88.1,90.8],note:'28 LIBERO tasks. CAPABLE largely preserves the nominal frozen VLA success rate.'},
  damping:{title:'Damping on unseen j₂',values:[45.8,55.6,67.8],note:'Zero-shot cross-fault test; mean over three severity settings.'},
  friction:{title:'Friction on unseen j₂',values:[40.6,51.8,64.2],note:'Zero-shot cross-fault test; mean over three severity settings.'},
  partial:{title:'Partial effectiveness on unseen j₂',values:[44.2,64.1,62.3],note:'Zero-shot cross-fault test; the matched baseline is 1.8 points higher.'},
  range:{title:'Range restriction on unseen j₂',values:[32.7,54.7,48.2],note:'Zero-shot cross-fault test; the matched baseline is 6.5 points higher.'},
  late:{title:'Late-onset lock on unseen j₂',values:[50.4,61.5,72.4],note:'Zero-shot cross-fault test; mean over three onset settings.'}
};
const names=['Base VLA','Global-history SAC','CAPABLE'];
function showCondition(key){
  const result=results[key];
  document.querySelectorAll('[data-condition]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.condition===key)));
  document.querySelector('#condition-title').textContent=result.title;
  document.querySelector('#condition-detail').textContent=result.note;
  const chart=document.querySelector('#result-bars');chart.replaceChildren();
  result.values.forEach((value,i)=>{
    const row=document.createElement('div');row.className='result-row';
    const label=document.createElement('span');label.textContent=names[i];
    const track=document.createElement('div');track.className='result-track';
    const fill=document.createElement('span');fill.className='result-fill';fill.style.width=value+'%';track.append(fill);
    const number=document.createElement('strong');number.textContent=value.toFixed(1)+'%';
    row.append(label,track,number);chart.append(row);
  });
}
document.querySelectorAll('[data-condition]').forEach(button=>button.addEventListener('click',()=>showCondition(button.dataset.condition)));
showCondition('unseen');
const dialog=document.querySelector('#figure-dialog');
document.querySelector('[data-zoom]').addEventListener('click',()=>dialog.showModal());
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
