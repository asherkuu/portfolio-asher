import { ReactChild, ReactFragment, ReactPortal } from "react";

// props.children type
export type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

export type PortfolioModel = {
  body: string
  id: string
  title: string
  useId: string
}
