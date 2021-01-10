import Application from './app/Application';
import { IDebugger } from './app/interfaces';
import { LISTEN_FORMATTER } from './app/Const';

function main() {
    const app: Application = new Application();
    const logger: IDebugger = app.getLogger();
    const port: number = app.getPort();
    app.start().then(() => logger(LISTEN_FORMATTER, port)).catch(logger);
}

main();
