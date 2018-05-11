import { renderNothing, branch } from "recompose";
type Predicate<T> = (x: T) => boolean;

export const hideIfNoData = <T>(hasNoData: Predicate<T>) =>
  branch(
    hasNoData,
    renderNothing
  );