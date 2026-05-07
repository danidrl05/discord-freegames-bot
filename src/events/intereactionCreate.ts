import {Client, Interaction} from 'discord.js';

export default function interactionCreate(client: Client): void {
    client.on('interactionCreate', async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        console.log(`Comanda rebuda: /${interaction.commandName}`);
    
    
    });
}