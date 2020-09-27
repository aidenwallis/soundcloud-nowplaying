declare const process: {
  env: {
    REACT_APP_API_BASE: string;
  };
};

export const config = {
  api: {
    baseUrl: process.env.REACT_APP_API_BASE || "",
  },
};
