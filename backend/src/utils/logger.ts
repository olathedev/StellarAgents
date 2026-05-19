const ts = () => new Date().toISOString();

export const logger = {
  info: (msg: string, meta?: object) =>
    console.log(JSON.stringify({ level: "info", ts: ts(), msg, ...meta })),

  warn: (msg: string, meta?: object) =>
    console.warn(JSON.stringify({ level: "warn", ts: ts(), msg, ...meta })),

  error: (msg: string, meta?: object) =>
    console.error(JSON.stringify({ level: "error", ts: ts(), msg, ...meta })),
};
