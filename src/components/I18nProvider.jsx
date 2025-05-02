import { createContext, useContext, useReducer, useEffect } from "react";
import fi from "../locales/fi";
import en from "../locales/en";

export const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    locale: getStoredLanguage() || "fi",
    dictionary: getStoredLanguage() === "fi" ? fi : en,
  });

  useEffect(() => {
    storeLanguage(state.locale);
  }, [state.locale]);

  const value = {
    ...state,
    setLocale: (locale) => dispatch({ type: "SET_LOCALE", locale }),
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

const getStoredLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userLanguage");
  }
  return null;
};

const storeLanguage = (language) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userLanguage", language);
  }
};

function reducer(state, action) {
  const dictionaries = { fi, en };
  switch (action.type) {
    case "SET_LOCALE":
      return {
        locale: action.locale,
        dictionary: dictionaries[action.locale] || en,
      };
    default:
      return state;
  }
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }

  const t = (id, variables = {}) => {
    const getNestedValue = (obj, path) =>
      path.split(".").reduce((acc, part) => acc && acc[part], obj);

    let translation = getNestedValue(context.dictionary, id) || id;

    Object.keys(variables).forEach((key) => {
      translation = translation.replace(
        new RegExp(`\\{${key}\\}`, "g"),
        variables[key]
      );
    });

    return translation;
  };

  return { t };
}
