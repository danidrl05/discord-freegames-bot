import {Client, Interaction} from 'discord.js';
import { gamesCommand } from '../commands/games';
import { allGamesCommand } from '../commands/allgames';
import { setupCommand } from '../commands/setup';
import { settingsCommand } from '../commands/settings';
import { helpCommand } from '../commands/help';

export default function interactionCreate(client: Client): void {
    client.on('interactionCreate', async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        try {
            switch (interaction.commandName) {
                case 'games':
                    await gamesCommand(interaction);
                    break;
                case 'allgames':
                    await allGamesCommand(interaction);
                    break;
                case 'setup':
                    await setupCommand(interaction);
                    break;
                case 'settings':
                    await settingsCommand(interaction);
                    break;
                case 'help':
                    await helpCommand(interaction);
                    break;
                default:
                    await interaction.reply({ content: 'Unknown command.', ephemeral: true});
            }
        } catch (error) {
            console.error('Error handling interaction:', error);
            await interaction.editReply('Something went wrong. Please try again.');
        }
    });
}