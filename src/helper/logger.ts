import { createLogger, transports, format, Logger } from 'winston';
import * as path from 'path';
import * as fs from 'fs';

let logger: Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [new transports.Console()]
});

let currentLogFilePath: string | null = null;

function deleteOldLogs(logsDir: string, safeScenarioName: string) {
  if (!fs.existsSync(logsDir)) return;

  try {
    const files = fs.readdirSync(logsDir);
    for (const file of files) {
      if (file.startsWith(safeScenarioName) && file.endsWith('.log')) {
        const p = path.join(logsDir, file);
        try {
          fs.unlinkSync(p);
        } catch {
          // ignore individual delete errors
        }
      }
    }
  } catch {
    // ignore read errors
  }
}

export function setLoggerForScenario(scenarioName: string): void {
  const logsDir = path.resolve(process.cwd(), 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  const safeScenarioName = scenarioName.replace(/[^a-zA-Z0-9-_]/g, '_');
  deleteOldLogs(logsDir, safeScenarioName);
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const logFilePath = path.join(logsDir, `${safeScenarioName}${timestamp}.log`);
  currentLogFilePath = logFilePath;
  logger.clear();
  logger.add(new transports.Console());
  logger.add(new transports.File({ filename: logFilePath }));
}

export default logger;
