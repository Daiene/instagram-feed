import { Colors } from "@/constants/theme";

const instagramBlack = require("@/assets/images/instagram-black-logo.png");
const instagramWhite = require("@/assets/images/instagram-white-logo.png");

export function getThemedColors(theme: "light" | "dark") {
  const isLight = theme === "light";

  return {
    isLight,
    backgroundIcon: isLight ? Colors.dark.background : Colors.light.background,
    background: isLight ? Colors.light.background : Colors.dark.background,
    text: isLight ? Colors.light.text : Colors.dark.text,
    panel: isLight ? "#e7eaee" : "#25292e",
    icon: isLight ? Colors.light.icon : Colors.dark.icon,
    logo: isLight ? instagramBlack : instagramWhite,
  };
}
