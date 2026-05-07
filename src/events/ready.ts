import {Client} from 'discord.js';

export default function ready(client: Client): void {
    client.once('ready', (c) => {
        console.log(`✅ Bot en línia com ${c.user.tag}`);
    });
}