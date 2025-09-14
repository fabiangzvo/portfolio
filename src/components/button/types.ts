import { PressEvent, ButtonProps as ButtonPropsHeroui } from "@heroui/react";

export type ButtonProps = Partial<
  ButtonPropsHeroui & { label: string, onClick: (values: PressEvent) => void }
>;
