import { getThemedColors } from "@/utils/getThemedColors";
import { useColorScheme } from "react-native";

export function useThemeStyles() {
  const theme = useColorScheme() ?? "light";

  return getThemedColors(theme);
}
