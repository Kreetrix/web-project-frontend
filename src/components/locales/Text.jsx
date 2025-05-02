import { useI18n } from "../I18nProvider";

export default function Text({
  id,
  fallback = "",
  variables = {},
  asString = false,
  ...props
}) {
  const { dictionary } = useI18n();

  // Move this function outside to avoid recreation on every render
  const getNestedTranslation = (obj, path) => {
    return path.split(".").reduce((acc, part) => {
      return acc && acc[part];
    }, obj);
  };

  let translation = getNestedTranslation(dictionary, id) || fallback || id;

  // Handle variable interpolation
  if (variables && typeof translation === "string") {
    Object.keys(variables).forEach((key) => {
      translation = translation.replace(
        new RegExp(`\\{${key}\\}`, "g"),
        variables[key]
      );
    });
  }

  return asString ? translation : <span {...props}>{translation}</span>;
}
