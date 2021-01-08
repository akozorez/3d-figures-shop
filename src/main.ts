import Application from './Application';

async function main(): Promise<void> {
    const app = new Application();
    return await app.start();
}

main().catch(console.log);
