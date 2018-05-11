import { renderComponent, branch } from "recompose";
import { Spinner } from "native-base";

export type LoadingProps = { loading?: boolean; };
export const spinnerWhileLoading = branch(
  ({ loading = false }: LoadingProps) => loading,
  renderComponent(Spinner)
);