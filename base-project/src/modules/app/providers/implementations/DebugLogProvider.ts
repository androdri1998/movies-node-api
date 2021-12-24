/* eslint-disable @typescript-eslint/no-explicit-any */
import debug from 'debug';

import IDebugLogProvider from '../IDebugLogProvider';
import messages from '../../intl/messages/en-US';

interface LogDTO {
  message: string;
  params?: any;
}

export default class DebugLogProvider implements IDebugLogProvider {
  essentialsLog({ message, params }: LogDTO): void {
    const logMessage = debug(messages.keys.logs.ESSENTIALS);
    logMessage(message, params);
  }

  errorLog({ message, params }: LogDTO): void {
    const logMessage = debug(messages.keys.logs.ERROR);
    logMessage(message, params);
  }
}
