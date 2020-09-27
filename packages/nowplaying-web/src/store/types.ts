export interface Action<T, P = undefined> {
  type: T;
  payload: P;
}

export interface PlainAction<T> {
  type: T;
}
