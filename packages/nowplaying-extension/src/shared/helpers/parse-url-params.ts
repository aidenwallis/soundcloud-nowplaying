const plusRx = /\+/g;

export function parseUrlParams(input: string): Record<string, string> {
  return (input || "").split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    if (!key) {
      return acc;
    }
    console.log(key, value, cur);
    return {
      ...acc,
      [decodeURIComponent(key)]: decodeURIComponent(
        (value || "").replace(plusRx, " "),
      ),
    };
  }, {});
}
