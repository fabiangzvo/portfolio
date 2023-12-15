import { useReducer, FunctionComponent, useMemo, ReactNode, FC } from "react";

type ProviderType = {
  Component: FunctionComponent<any>;
  config?: Record<string, any>;
};

type ProviderFunction = { children: ReactNode };

type ResolvedProvider = {
  Providers: (props: ProviderFunction) => ReactNode;
  setProviders: Function;
};

function reducer(
  state: Array<ProviderType>,
  payload: { action: string; provider: ProviderType }
) {
  const { provider, action } = payload;

  switch (action) {
    case "add":
      return [...state, provider];
    default:
      return state;
  }
}

export function useProviders(
  initialProviders: Array<ProviderType>
): ResolvedProvider {
  const [providers, setProviders] = useReducer(reducer, initialProviders || []);

  const ProvidersComponent = useMemo(
    () =>
      ({ children }: ProviderFunction) =>
        providers.reduceRight(
          (child, { Component, config = {} }) => (
            <Component {...config}>{child}</Component>
          ),
          children
        ),
    [providers]
  );

  return { Providers: ProvidersComponent, setProviders };
}
