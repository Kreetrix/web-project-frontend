import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("userLanguage");
    if (savedLanguage && (savedLanguage === "fi" || savedLanguage === "en")) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("userLanguage", lng);
  };

  return (
    <div>
      <button
        onClick={() => changeLanguage("fi")}
        disabled={i18n.language === "fi"}
      >
        FI
      </button>
      <button
        onClick={() => changeLanguage("en")}
        disabled={i18n.language === "en"}
      >
        EN
      </button>
    </div>
  );
}
