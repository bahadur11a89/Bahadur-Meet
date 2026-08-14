import { env } from "../config/env.js";

const levels = { error: 0, warn: 1, info: 2, debug: 3 };
const colors = { error: "\x1b[31m", warn: "\x1b[33m", info: "\x1b[36m", debug: "\x1b[90m" };
const reset = "\x1b[0m";

const currentLevel = env.NODE_ENV === "production" ? "info" : "debug";

const format = (level, message, meta) => {
    const ts = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : "";
    return `${colors[level]}[${ts}] [${level.toUpperCase()}] ${message}${metaStr}${reset}`;
};

const log = (level, message, meta) => {
    if (levels[level] > levels[currentLevel]) return;
    const output = format(level, message, meta);
    level === "error" ? console.error(output) : console.log(output);
};

const logger = {
    error: (msg, meta) => log("error", msg, meta),
    warn:  (msg, meta) => log("warn",  msg, meta),
    info:  (msg, meta) => log("info",  msg, meta),
    debug: (msg, meta) => log("debug", msg, meta),
};

export default logger;
