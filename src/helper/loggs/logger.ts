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

export function setLoggerForScenario(scenarioName: string): void {
  const logsDir = path.resolve(__dirname, '../../../logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/:/g, '-').replace('T', '_').replace('Z', '');
  const safeScenarioName = scenarioName.replace(/[^a-zA-Z0-9-_]/g, '_');
  const logFilePath = path.join(logsDir, `TestLogs-${safeScenarioName}-${timestamp}.log`);
  logger.clear();
  logger.add(new transports.Console());
  logger.add(new transports.File({ filename: logFilePath }));
}

export default logger;
