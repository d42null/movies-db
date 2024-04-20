import React, { PropsWithChildren } from "react";
import store from "../store";
import { Provider } from "react-redux";
import { RenderOptions, render } from "@testing-library/react";

export function renderWithProviders(ui: React.ReactElement, renderOptions: RenderOptions = {}) {
  function Wrapper({ children }: PropsWithChildren<{}>): React.JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
