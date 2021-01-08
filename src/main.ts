import HttpServer from './app/HttpServer';

async function main(): Promise<void> {
    return await new HttpServer().start();
}

main().catch(console.log);
