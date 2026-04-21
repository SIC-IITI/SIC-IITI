import React, { useEffect, useState } from "react";

function GoogleTranslate() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const addScript = () => {
      if (document.getElementById("google-translate-script")) return;

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "hi,en",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    };

    addScript();
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "hi" : "en";
    setLang(newLang);

    const interval = setInterval(() => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = newLang;
        select.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {/* Hidden Google widget */}
      <div id="google_translate_element" style={{ display: "none" }}></div>

      <button
        onClick={toggleLanguage}
        style={{
          padding: "10px 18px",
          borderRadius: "8px",
          border: "none",
          background: "#ffffff",
          color: "#0b3d91",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        {lang === "en" ? "हिंदी में देखें" : "View in English"}
      </button>
    </div>
  );
}

export default GoogleTranslate;