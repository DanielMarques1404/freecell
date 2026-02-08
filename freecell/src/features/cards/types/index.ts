export type ContainerColor = "light" | "dark" | "";

export type CardContainerProps = {
  color: ContainerColor;
};

export const bgColor = (color: ContainerColor): string => {
  return color === "light"
    ? "border-gray-400 border-4 rounded-2xl"
    : color === "dark"
      ? "border-gray-600 border-4 rounded-2xl"
      : "";
};
