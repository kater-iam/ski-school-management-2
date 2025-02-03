import "@ferdiunal/refine-shadcn";

export interface CustomTheme {
  // Add custom variables here like below:
  // status: {
  //   danger: string;
  // };
}

declare module "@ferdiunal/refine-shadcn" {
  interface Theme extends import("@ferdiunal/refine-shadcn").Theme, CustomTheme {}
  interface ThemeOptions
    extends import("@ferdiunal/refine-shadcn").ThemeOptions,
      CustomTheme {}
}
