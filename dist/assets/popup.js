import{d as n,r as d,j as s,a as t,c as w,R as b,G as y}from"./global.0b8f86d6.js";const U=async()=>new Promise(c=>{chrome.storage.sync.get(["optionSets"],e=>{c({optionSets:e.optionSets||[]})})}),o={colors:{background:"#2A3440",text:"#E5E5E5",primary:"#FF9F1C",error:"#FF4444",success:"#4CAF50"}},k=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-width: 400px;
  min-height: 300px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: ${o.colors.text};
`,m=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  min-width: 400px;
  background: ${o.colors.background};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: ${o.colors.text};
  gap: 2rem;
  padding: 20px;
`,g=n.div`
  width: 48px;
  height: 48px;
  background: url('assets/favicon.png') no-repeat center;
  background-size: contain;
  margin: 0 auto 16px;

  ${m} & {
    width: 64px;
    height: 64px;
    margin: 0;
  }
`,S=n.h2`
  text-align: center;
  margin: 0 0 16px;
  color: ${o.colors.primary};
  font-size: 18px;
  font-weight: 600;
`,R=n.div`
  font-size: 18px;
  color: ${o.colors.primary};
  text-align: center;
  font-weight: 500;
`,$=n.div`
  margin: 16px 0;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  border-left: 4px solid ${o.colors.primary};
  text-align: left;
  color: ${o.colors.text};
  width: 100%;
`,v=n.div`
  margin: 16px 0;
  width: 100%;
  
  h3 {
    margin: 0 0 8px;
    color: ${o.colors.primary};
    font-size: 14px;
    font-weight: 600;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
    color: ${o.colors.text};
    font-size: 13px;
    line-height: 1.4;
    
    li {
      margin-bottom: 4px;
    }
  }
`,C=n.button`
  width: 100%;
  padding: 12px;
  background: ${o.colors.primary};
  color: ${o.colors.background};
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
`,E=()=>{const[c,e]=d.useState("idle"),[x,a]=d.useState("");d.useEffect(()=>{(async()=>{try{const[r]=await chrome.tabs.query({active:!0,currentWindow:!0});if(!r.url||!r.id){e("error"),a("No valid URL found");return}const{optionSets:p}=await U();if(!(p!=null&&p.length)){e("error"),a("No URL pairs configured");return}const i=p.find(l=>l.checked?r.url.includes(l.topUrl)||r.url.includes(l.bottomUrl):!1);if(!i){e("error"),a("No matching URL pair found");return}const u=r.url.includes(i.topUrl)?r.url.replace(i.topUrl,i.bottomUrl):r.url.replace(i.bottomUrl,i.topUrl);if(u===r.url){e("error"),a("URLs are identical");return}e("swapping"),await chrome.tabs.update(r.id,{url:u}),await new Promise(l=>setTimeout(l,1e3)),window.close()}catch(r){e("error"),a("An error occurred"),console.error("Error:",r)}})()},[]);const f=()=>{chrome.runtime.openOptionsPage?chrome.runtime.openOptionsPage():window.open(chrome.runtime.getURL("options.html"))};return c==="swapping"?s(m,{children:[t(g,{}),t(R,{children:"Swapping..."})]}):s(k,{children:[t(g,{}),t(S,{children:"url-swip-swap"}),c==="error"&&t($,{children:x}),s(v,{children:[t("h3",{children:"Instructions"}),s("ul",{children:[s("li",{children:["Click Options (Ctrl+click ",">"," Options)."]}),t("li",{children:"Set the URLs you want to swap between."}),t("li",{children:"While on a configured URL, clicking the extension will trigger the swap."})]})]}),t(C,{onClick:f,children:"Options"})]})},h=document.getElementById("root");h&&w(h).render(s(b.StrictMode,{children:[t(y,{}),t(E,{})]}));
