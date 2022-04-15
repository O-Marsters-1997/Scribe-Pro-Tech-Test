export const colors: { [key in ScribePro.ColorVariants]: string } = {
  base: "#232042",
  baseLight: "rgba(35, 32, 66, 0.69)",
  error: "#e00000",
  caution: "#fdb52d",
  success: "#92cc49",
  secondary: "#d24f3e",
  gradient: "",
  primary: "#f9bb3d",
  white: "#ffffff",
  lightGrey: "#f5f5f5",
};

export const svgPDFColors = {
  svgSelected: colors.secondary,
  svgDefaultLight: "#f5f5f5",
  svgDisabled: colors.lightGrey,
};
