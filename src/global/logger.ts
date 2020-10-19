import { createLogger, Logger, format, transports } from 'winston'
import DailyFile from 'winston-daily-rotate-file';
import FS from 'fs'
import PATH from 'path'
import cfg from '../config.json'
require('dotenv').config()

const env: string = process.env.ENVIROMENT || 'localhost'
const config: any = JSON.parse(JSON.stringify(cfg))[env]

function getLogDir(): string {
  const logPath: string = `${config.log_path}`
  if (!FS.existsSync(logPath)) {
    FS.mkdirSync(logPath)
  }

  return logPath
}

function getFormat(): any {
  return format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  )
}

function getFormatConsole(): any {
  return format.combine(
    format.colorize(),
    format.printf(
      info => `${info.timestamp} ${info.level}: ${info.message}`
    )
  )
}


const logger: Logger = createLogger({
  level: config.log_level,
  format: getFormat(),
  transports: [
    new transports.Console({
      level: config.log_level,
      format: getFormatConsole()
    }),
    new DailyFile({
      filename: PATH.join(getLogDir(), '%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
    })
  ]
})

export default logger