import{d as n,r as d,j as s,a as r,c as U,R as S,G as k}from"./global.0b8f86d6.js";const R=async()=>new Promise(c=>{chrome.storage.sync.get(["optionSets"],o=>{c({optionSets:o.optionSets||[]})})}),e={colors:{background:"#2A3440",text:"#E5E5E5",primary:"#FF9F1C",error:"#FF4444",success:"#4CAF50"}},$=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-width: 400px;
  min-height: 300px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: ${e.colors.text};
`,x=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  min-width: 400px;
  background: ${e.colors.background};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: ${e.colors.text};
  gap: 2rem;
  padding: 20px;
`,u=n.div`
  width: 48px;
  height: 48px;
  background: url('assets/favicon.png') no-repeat center;
  background-size: contain;
  margin: 0 auto 16px;

  ${x} & {
    width: 64px;
    height: 64px;
    margin: 0;
  }
`,v=n.h2`
  text-align: center;
  margin: 0 0 16px;
  color: ${e.colors.primary};
  font-size: 18px;
  font-weight: 600;
`,C=n.div`
  font-size: 18px;
  color: ${e.colors.primary};
  text-align: center;
  font-weight: 500;
`,h=n.div`
  margin: 16px 0;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  border-left: 4px solid ${e.colors.primary};
  text-align: left;
  color: ${e.colors.text};
  width: 100%;
`,E=n.div`
  margin: 16px 0;
  width: 100%;
  
  h3 {
    margin: 0 0 8px;
    color: ${e.colors.primary};
    font-size: 14px;
    font-weight: 600;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
    color: ${e.colors.text};
    font-size: 13px;
    line-height: 1.4;
    
    li {
      margin-bottom: 4px;
    }
  }
`,F=n.button`
  width: 100%;
  padding: 12px;
  background: ${e.colors.primary};
  color: ${e.colors.background};
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: auto;
  
  &:hover {
    filter: brightness(110%);
  }

  &:active {
    filter: brightness(90%);
  }
`,L=()=>{const[c,o]=d.useState("idle"),[f,a]=d.useState(""),[w,b]=d.useState("");d.useEffect(()=>{(async()=>{try{const[t]=await chrome.tabs.query({active:!0,currentWindow:!0});if(!t.url||!t.id){o("error"),a("No valid URL found");return}const{optionSets:p}=await R();if(!(p!=null&&p.length)){o("error"),a("No URL pairs configured");return}const i=p.find(l=>l.checked?t.url.includes(l.topUrl)||t.url.includes(l.bottomUrl):!1);if(!i){o("error"),a("No matching URL pair found");return}const g=t.url.includes(i.topUrl)?t.url.replace(i.topUrl,i.bottomUrl):t.url.replace(i.bottomUrl,i.topUrl);if(g===t.url){o("error"),a("URLs are identical");return}o("swapping"),b(g),await new Promise(l=>setTimeout(l,1e3)),await chrome.tabs.update(t.id,{url:g}),window.close()}catch(t){o("error"),a("An error occurred"),console.error("Error:",t)}})()},[]);const y=()=>{chrome.runtime.openOptionsPage?chrome.runtime.openOptionsPage():window.open(chrome.runtime.getURL("options.html"))};return c==="swapping"?s(x,{children:[r(u,{}),r(C,{children:"Swapping..."}),r(h,{children:w})]}):s($,{children:[r(u,{}),r(v,{children:"url-swip-swap"}),c==="error"&&r(h,{children:f}),s(E,{children:[r("h3",{children:"Instructions"}),s("ul",{children:[s("li",{children:["Click Options (Ctrl+click ",">"," Options)."]}),r("li",{children:"Set the URLs you want to swap between."}),r("li",{children:"While on a configured URL, clicking the extension will trigger the swap."})]})]}),r(F,{onClick:y,children:"Options"})]})},m=document.getElementById("root");m&&U(m).render(s(S.StrictMode,{children:[r(k,{}),r(L,{})]}));
