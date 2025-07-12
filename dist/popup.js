import { d as dt, r as reactExports, j as jsxs, a as jsx, c as createRoot, R as React, G as GlobalStyle } from './global.e7d5450c.js';

class ChromeStorageService {
  static async getOptionSets() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(["optionSets"], (result) => {
        resolve(result.optionSets || []);
      });
    });
  }
  static async setOptionSets(optionSets) {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ optionSets }, () => {
        resolve();
      });
    });
  }
  static async addOptionSet(optionSet) {
    const currentSets = await this.getOptionSets();
    const newSets = [...currentSets, optionSet];
    await this.setOptionSets(newSets);
  }
  static async updateOptionSet(index, optionSet) {
    const currentSets = await this.getOptionSets();
    if (index >= 0 && index < currentSets.length) {
      currentSets[index] = optionSet;
      await this.setOptionSets(currentSets);
    }
  }
  static async removeOptionSet(index) {
    const currentSets = await this.getOptionSets();
    if (index >= 0 && index < currentSets.length) {
      currentSets.splice(index, 1);
      await this.setOptionSets(currentSets);
    }
  }
  static async toggleOptionSet(index, checked) {
    const currentSets = await this.getOptionSets();
    if (index >= 0 && index < currentSets.length) {
      currentSets[index].checked = checked;
      await this.setOptionSets(currentSets);
    }
  }
}

const theme = {
  colors: {
    background: "#2A3440",
    text: "#E5E5E5",
    primary: "#FF9F1C",
    error: "#FF4444",
    success: "#4CAF50"
  }
};

const PopupContainer = dt.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-width: 400px;
  min-height: 300px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: ${theme.colors.text};
`;
const SwappingContainer = dt.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  min-width: 400px;
  background: ${theme.colors.background};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: ${theme.colors.text};
  gap: 2rem;
  padding: 20px;
`;
const Logo = dt.div`
  width: 48px;
  height: 48px;
  background: url('assets/favicon.png') no-repeat center;
  background-size: contain;
  margin: 0 auto 16px;

  ${SwappingContainer} & {
    width: 64px;
    height: 64px;
    margin: 0;
  }
`;
const Title = dt.h2`
  text-align: center;
  margin: 0 0 16px;
  color: ${theme.colors.primary};
  font-size: 18px;
  font-weight: 600;
`;
const SwappingText = dt.div`
  font-size: 18px;
  color: ${theme.colors.primary};
  text-align: center;
  font-weight: 500;
`;
const Message = dt.div`
  margin: 16px 0;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  border-left: 4px solid ${theme.colors.primary};
  text-align: left;
  color: ${theme.colors.text};
  width: 100%;
`;
const Instructions = dt.div`
  margin: 16px 0;
  width: 100%;
  
  h3 {
    margin: 0 0 8px;
    color: ${theme.colors.primary};
    font-size: 14px;
    font-weight: 600;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
    color: ${theme.colors.text};
    font-size: 13px;
    line-height: 1.4;
    
    li {
      margin-bottom: 4px;
    }
  }
`;
const OptionsButton = dt.button`
  width: 100%;
  padding: 12px;
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
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
`;
dt.button`
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
`;

const Popup = () => {
  const [status, setStatus] = reactExports.useState("idle");
  const [errorMessage, setErrorMessage] = reactExports.useState("");
  const [targetUrl, setTargetUrl] = reactExports.useState("");
  reactExports.useEffect(() => {
    const switchUrl = async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab.url || !tab.id) {
          setStatus("error");
          setErrorMessage("No valid URL found");
          return;
        }
        const optionSets = await ChromeStorageService.getOptionSets();
        if (!optionSets?.length) {
          setStatus("error");
          setErrorMessage("No URL pairs configured");
          return;
        }
        const matchingSet = optionSets.find((set) => {
          if (!set.checked)
            return false;
          return tab.url.includes(set.topUrl) || tab.url.includes(set.bottomUrl);
        });
        if (!matchingSet) {
          setStatus("error");
          setErrorMessage("No matching URL pair found");
          return;
        }
        const newUrl = tab.url.includes(matchingSet.topUrl) ? tab.url.replace(matchingSet.topUrl, matchingSet.bottomUrl) : tab.url.replace(matchingSet.bottomUrl, matchingSet.topUrl);
        if (newUrl === tab.url) {
          setStatus("error");
          setErrorMessage("URLs are identical");
          return;
        }
        setStatus("swapping");
        setTargetUrl(newUrl);
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        await chrome.tabs.update(tab.id, { url: newUrl });
        window.close();
      } catch (error) {
        setStatus("error");
        setErrorMessage("An error occurred");
        console.error("Error:", error);
      }
    };
    switchUrl();
  }, []);
  const handleOptionsClick = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL("options.html"));
    }
  };
  if (status === "swapping") {
    return /* @__PURE__ */ jsxs(SwappingContainer, { children: [
      /* @__PURE__ */ jsx(Logo, {}),
      /* @__PURE__ */ jsx(SwappingText, { children: "Swapping..." }),
      /* @__PURE__ */ jsx(Message, { children: targetUrl })
    ] });
  }
  return /* @__PURE__ */ jsxs(PopupContainer, { children: [
    /* @__PURE__ */ jsx(Logo, {}),
    /* @__PURE__ */ jsx(Title, { children: "url-swip-swap" }),
    status === "error" && /* @__PURE__ */ jsx(Message, { children: errorMessage }),
    /* @__PURE__ */ jsxs(Instructions, { children: [
      /* @__PURE__ */ jsx("h3", { children: "Instructions" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          "Click Options (Ctrl+click ",
          ">",
          " Options)."
        ] }),
        /* @__PURE__ */ jsx("li", { children: "Set the URLs you want to swap between." }),
        /* @__PURE__ */ jsx("li", { children: "While on a configured URL, clicking the extension will trigger the swap." })
      ] })
    ] }),
    /* @__PURE__ */ jsx(OptionsButton, { onClick: handleOptionsClick, children: "Options" })
  ] });
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    /* @__PURE__ */ jsxs(React.StrictMode, { children: [
      /* @__PURE__ */ jsx(GlobalStyle, {}),
      /* @__PURE__ */ jsx(Popup, {})
    ] })
  );
}
