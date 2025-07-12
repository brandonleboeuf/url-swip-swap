import { r as reactExports, j as jsxs, U as UrlPairWrapper, L as LabelWrapper, C as CheckboxWrapper, a as jsx, b as RemoveButton, e as Label, I as InputWrapper, f as Input, g as CopyButton, O as OpenInNewTabButton, F as Footer$1, h as Container, T as Title, i as Tagline, D as Description, k as UrlPairsContainer, A as AddPairButton, l as ImportExportContainer, m as ImportExportButton, c as createRoot, R as React, G as GlobalStyle } from './global.e7d5450c.js';

const ClipboardIcon = () => /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ jsx("path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }),
  /* @__PURE__ */ jsx("path", { d: "M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" })
] });
const CheckIcon = () => /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { d: "M20 6L9 17l-5-5" }) });
const OpenInNewTabIcon = () => /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }),
  /* @__PURE__ */ jsx("polyline", { points: "15 3 21 3 21 9" }),
  /* @__PURE__ */ jsx("line", { x1: "10", y1: "14", x2: "21", y2: "3" })
] });
const UrlPair = ({
  id,
  index,
  topUrl,
  bottomUrl,
  checked,
  onRemove,
  onInputChange,
  isRemoveDisabled = false
}) => {
  const [isRemoving, setIsRemoving] = reactExports.useState(false);
  const [topCopySuccess, setTopCopySuccess] = reactExports.useState(false);
  const [bottomCopySuccess, setBottomCopySuccess] = reactExports.useState(false);
  const removeTimeoutRef = reactExports.useRef();
  const handleCopy = async (url, setSuccess) => {
    if (!url.trim())
      return;
    try {
      await navigator.clipboard.writeText(url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  const handleOpenInNewTab = (url) => {
    if (!url.trim())
      return;
    let formattedUrl = url.trim();
    if (formattedUrl.startsWith("localhost")) {
      formattedUrl = `http://${formattedUrl}`;
    } else if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = `https://${formattedUrl}`;
    }
    window.open(formattedUrl, "_blank");
  };
  const handleRemove = () => {
    if (!isRemoveDisabled && !isRemoving) {
      setIsRemoving(true);
      removeTimeoutRef.current = window.setTimeout(() => {
        onRemove();
      }, 100);
    }
  };
  const isDisabled = !topUrl?.trim() || !bottomUrl?.trim();
  const handleToggleChange = (event) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }
    onInputChange(event);
  };
  reactExports.useEffect(() => {
    if (isDisabled && checked) {
      onInputChange({
        target: {
          type: "checkbox",
          name: "checked",
          checked: false,
          id: `enabled-${id}`
        }
      });
    }
  }, [isDisabled, checked, onInputChange, id]);
  reactExports.useEffect(() => {
    return () => {
      if (removeTimeoutRef.current) {
        window.clearTimeout(removeTimeoutRef.current);
      }
    };
  }, []);
  return /* @__PURE__ */ jsxs(UrlPairWrapper, { isRemoving, children: [
    /* @__PURE__ */ jsxs(LabelWrapper, { children: [
      /* @__PURE__ */ jsxs("h4", { children: [
        "PAIR ",
        index + 1
      ] }),
      /* @__PURE__ */ jsxs(CheckboxWrapper, { children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            id: `enabled-${id}`,
            name: "checked",
            checked: checked && !isDisabled,
            onChange: handleToggleChange,
            disabled: isDisabled
          }
        ),
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: `enabled-${id}`,
            title: isDisabled ? "Fill in both URLs to enable" : ""
          }
        )
      ] })
    ] }),
    !isRemoveDisabled && /* @__PURE__ */ jsx(
      RemoveButton,
      {
        onClick: handleRemove,
        disabled: isRemoving,
        title: "Remove this URL pair",
        children: "Remove"
      }
    ),
    /* @__PURE__ */ jsx(Label, { children: "Primary URL:" }),
    /* @__PURE__ */ jsxs(InputWrapper, { children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "text",
          id: `topUrl-${id}`,
          name: "topUrl",
          value: topUrl,
          onChange: onInputChange,
          placeholder: "e.g., production.myapp.com"
        }
      ),
      /* @__PURE__ */ jsx(
        CopyButton,
        {
          onClick: () => handleCopy(topUrl, setTopCopySuccess),
          disabled: !topUrl.trim(),
          title: topUrl.trim() ? `Copy "${topUrl}" to clipboard` : "Enter a URL to enable copying",
          children: topCopySuccess ? /* @__PURE__ */ jsx(CheckIcon, {}) : /* @__PURE__ */ jsx(ClipboardIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        OpenInNewTabButton,
        {
          onClick: () => handleOpenInNewTab(topUrl),
          disabled: !topUrl.trim(),
          title: topUrl.trim() ? `Open "${topUrl}" in new tab` : "Enter a URL to enable opening in new tab",
          children: /* @__PURE__ */ jsx(OpenInNewTabIcon, {})
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Label, { children: "Alternative URL:" }),
    /* @__PURE__ */ jsxs(InputWrapper, { children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "text",
          id: `bottomUrl-${id}`,
          name: "bottomUrl",
          value: bottomUrl,
          onChange: onInputChange,
          placeholder: "e.g., localhost:3000"
        }
      ),
      /* @__PURE__ */ jsx(
        CopyButton,
        {
          onClick: () => handleCopy(bottomUrl, setBottomCopySuccess),
          disabled: !bottomUrl.trim(),
          title: bottomUrl.trim() ? `Copy "${bottomUrl}" to clipboard` : "Enter a URL to enable copying",
          children: bottomCopySuccess ? /* @__PURE__ */ jsx(CheckIcon, {}) : /* @__PURE__ */ jsx(ClipboardIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        OpenInNewTabButton,
        {
          onClick: () => handleOpenInNewTab(bottomUrl),
          disabled: !bottomUrl.trim(),
          title: bottomUrl.trim() ? `Open "${bottomUrl}" in new tab` : "Enter a URL to enable opening in new tab",
          children: /* @__PURE__ */ jsx(OpenInNewTabIcon, {})
        }
      )
    ] })
  ] });
};

const Footer = ({ version }) => {
  return /* @__PURE__ */ jsxs(Footer$1, { version, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      "Version: ",
      version
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      "Created by ",
      /* @__PURE__ */ jsx("a", { href: "https://github.com/brandonleboeuf", target: "_blank", rel: "noopener noreferrer", children: "Brandon" })
    ] }),
    /* @__PURE__ */ jsx("div", { children: "Est. 2024" })
  ] });
};

const Options = () => {
  const [urlPairs, setUrlPairs] = reactExports.useState([]);
  const [version, setVersion] = reactExports.useState("");
  reactExports.useEffect(() => {
    fetch(chrome.runtime.getURL("manifest.json")).then((response) => response.json()).then((data) => {
      setVersion(data.version);
    }).catch((error) => console.error("Error fetching manifest.json:", error));
    chrome.storage.sync.get(["optionSets"], ({ optionSets }) => {
      if (optionSets?.length > 0) {
        const pairsWithIds = optionSets.map((pair) => ({
          ...pair,
          id: pair.id || crypto.randomUUID()
        }));
        setUrlPairs(pairsWithIds);
      } else {
        setUrlPairs([{
          id: crypto.randomUUID(),
          topUrl: "",
          bottomUrl: "",
          checked: false
        }]);
      }
    });
  }, []);
  const saveOptions = reactExports.useCallback((newPairs) => {
    chrome.storage.sync.set({ optionSets: newPairs });
  }, []);
  const handleAddPair = reactExports.useCallback(() => {
    setUrlPairs((prevPairs) => {
      const newPairs = [
        ...prevPairs,
        {
          id: crypto.randomUUID(),
          topUrl: "",
          bottomUrl: "",
          checked: false
        }
      ];
      saveOptions(newPairs);
      return newPairs;
    });
  }, [saveOptions]);
  const handleRemovePair = reactExports.useCallback((id) => {
    setUrlPairs((prevPairs) => {
      if (prevPairs.length <= 1)
        return prevPairs;
      const newPairs = prevPairs.filter((pair) => pair.id !== id);
      saveOptions(newPairs);
      return newPairs;
    });
  }, [saveOptions]);
  const handleInputChange = reactExports.useCallback((id, event) => {
    const { name, value, type, checked } = event.target;
    setUrlPairs((prevPairs) => {
      const newPairs = prevPairs.map((pair) => {
        if (pair.id !== id)
          return pair;
        const updatedPair = { ...pair };
        if (type === "checkbox") {
          if (checked && (!pair.topUrl.trim() || !pair.bottomUrl.trim())) {
            return pair;
          }
          updatedPair.checked = checked;
        } else if (name === "topUrl") {
          updatedPair.topUrl = value;
          if (!value.trim()) {
            updatedPair.checked = false;
          }
        } else if (name === "bottomUrl") {
          updatedPair.bottomUrl = value;
          if (!value.trim()) {
            updatedPair.checked = false;
          }
        }
        return updatedPair;
      });
      saveOptions(newPairs);
      return newPairs;
    });
  }, [saveOptions]);
  const handleExport = reactExports.useCallback(() => {
    const data = JSON.stringify(urlPairs, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `url-swip-swap-config-${( new Date()).toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [urlPairs]);
  const handleImport = reactExports.useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file)
      return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedPairs = JSON.parse(e.target?.result);
        if (!Array.isArray(importedPairs))
          throw new Error("Invalid format");
        const validPairs = importedPairs.filter(
          (pair) => pair && typeof pair === "object" && typeof pair.topUrl === "string" && typeof pair.bottomUrl === "string" && typeof pair.checked === "boolean"
        );
        if (validPairs.length === 0)
          throw new Error("No valid URL pairs found");
        const pairsWithIds = validPairs.map((pair) => ({
          ...pair,
          id: pair.id || crypto.randomUUID()
        }));
        setUrlPairs(pairsWithIds);
        saveOptions(pairsWithIds);
      } catch (error) {
        console.error("Error importing configuration:", error);
        alert("Error importing configuration. Please check the file format.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }, [saveOptions]);
  return /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Title, { children: "url-swip-swap" }),
    /* @__PURE__ */ jsx(Tagline, { children: "Quick URL switching between environments" }),
    /* @__PURE__ */ jsx(Description, { children: "Configure URL pairs to quickly switch between different versions of your websites. Toggle the switch to enable/disable each pair." }),
    /* @__PURE__ */ jsx(UrlPairsContainer, { id: "url-pairs", children: urlPairs.map((pair, index) => /* @__PURE__ */ jsx(
      UrlPair,
      {
        id: pair.id,
        index,
        topUrl: pair.topUrl,
        bottomUrl: pair.bottomUrl,
        checked: pair.checked,
        onRemove: () => handleRemovePair(pair.id),
        onInputChange: (event) => handleInputChange(pair.id, event),
        isRemoveDisabled: urlPairs.length <= 1
      },
      pair.id
    )) }),
    /* @__PURE__ */ jsx(AddPairButton, { id: "add-pair", onClick: handleAddPair, children: "Add New URL Pair" }),
    /* @__PURE__ */ jsxs(ImportExportContainer, { children: [
      /* @__PURE__ */ jsxs(ImportExportButton, { as: "label", htmlFor: "import-config", children: [
        "Import Configuration",
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            id: "import-config",
            accept: ".json",
            onChange: handleImport,
            style: { display: "none" }
          }
        )
      ] }),
      /* @__PURE__ */ jsx(ImportExportButton, { onClick: handleExport, children: "Export Configuration" })
    ] }),
    /* @__PURE__ */ jsx(Footer, { version })
  ] });
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    /* @__PURE__ */ jsxs(React.StrictMode, { children: [
      /* @__PURE__ */ jsx(GlobalStyle, {}),
      /* @__PURE__ */ jsx(Options, {})
    ] })
  );
}
