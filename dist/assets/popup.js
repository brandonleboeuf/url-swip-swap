import{d as e,r as p,j as c,a as o,c as v,R,G as $}from"./global.9d95f920.js";const F=async()=>new Promise(s=>{chrome.storage.sync.get(["optionSets"],n=>{s({optionSets:n.optionSets||[]})})}),t={colors:{background:"#2A3440",text:"#E5E5E5",primary:"#FF9F1C",error:"#FF4444",success:"#4CAF50"}},L=e.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-width: 400px;
  min-height: 300px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: ${t.colors.text};
`,b=e.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  min-width: 400px;
  background: ${t.colors.background};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: ${t.colors.text};
  gap: 2rem;
  padding: 20px;
`,x=e.div`
  width: 48px;
  height: 48px;
  background: url('assets/favicon.png') no-repeat center;
  background-size: contain;
  margin: 0 auto 16px;

  ${b} & {
    width: 64px;
    height: 64px;
    margin: 0;
  }
`,E=e.h2`
  text-align: center;
  margin: 0 0 16px;
  color: ${t.colors.primary};
  font-size: 18px;
  font-weight: 600;
`,O=e.div`
  font-size: 18px;
  color: ${t.colors.primary};
  text-align: center;
  font-weight: 500;
`,f=e.div`
  margin: 16px 0;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  border-left: 4px solid ${t.colors.primary};
  text-align: left;
  color: ${t.colors.text};
  width: 100%;
`,z=e.div`
  margin: 16px 0;
  width: 100%;
  
  h3 {
    margin: 0 0 8px;
    color: ${t.colors.primary};
    font-size: 14px;
    font-weight: 600;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
    color: ${t.colors.text};
    font-size: 13px;
    line-height: 1.4;
    
    li {
      margin-bottom: 4px;
    }
  }
`,M=e.button`
  width: 100%;
  padding: 12px;
  background: ${t.colors.primary};
  color: ${t.colors.background};
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
`,P=e.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3d8b40;
  }
`,T=()=>{const[s,n]=p.useState("idle"),[y,a]=p.useState(""),[h,U]=p.useState(""),[k,u]=p.useState("Copy URL"),S=async()=>{try{await navigator.clipboard.writeText(h),u("Copied!"),setTimeout(()=>u("Copy URL"),2e3)}catch(m){console.error("Failed to copy:",m),u("Failed to copy")}};p.useEffect(()=>{(async()=>{try{const[r]=await chrome.tabs.query({active:!0,currentWindow:!0});if(!r.url||!r.id){n("error"),a("No valid URL found");return}const{optionSets:d}=await F();if(!(d!=null&&d.length)){n("error"),a("No URL pairs configured");return}const i=d.find(l=>l.checked?r.url.includes(l.topUrl)||r.url.includes(l.bottomUrl):!1);if(!i){n("error"),a("No matching URL pair found");return}const g=r.url.includes(i.topUrl)?r.url.replace(i.topUrl,i.bottomUrl):r.url.replace(i.bottomUrl,i.topUrl);if(g===r.url){n("error"),a("URLs are identical");return}n("swapping"),U(g),await new Promise(l=>setTimeout(l,1e3)),await chrome.tabs.update(r.id,{url:g}),window.close()}catch(r){n("error"),a("An error occurred"),console.error("Error:",r)}})()},[]);const C=()=>{chrome.runtime.openOptionsPage?chrome.runtime.openOptionsPage():window.open(chrome.runtime.getURL("options.html"))};return s==="swapping"?c(b,{children:[o(x,{}),o(O,{children:"Swapping..."}),o(f,{children:h}),o(P,{onClick:S,children:k})]}):c(L,{children:[o(x,{}),o(E,{children:"url-swip-swap"}),s==="error"&&o(f,{children:y}),c(z,{children:[o("h3",{children:"Instructions"}),c("ul",{children:[c("li",{children:["Click Options (Ctrl+click ",">"," Options)."]}),o("li",{children:"Set the URLs you want to swap between."}),o("li",{children:"While on a configured URL, clicking the extension will trigger the swap."})]})]}),o(M,{onClick:C,children:"Options"})]})},w=document.getElementById("root");w&&v(w).render(c(R.StrictMode,{children:[o($,{}),o(T,{})]}));
