import { ChatInputCommandInteraction} from 'discord.js';
import { getAllGames} from '../api/gamerpower';

export async function allGamesCommand(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.deferReply();

    const games = await getAllGames();

    if (games.length === 0) {
        await interaction.editReply('No free games found.');
        return;
    }

    const message = games
        .slice(0, 10)
        .map((g) => `**${g.title}** - ${g.platforms}\n${g.open_giveaway_url}`)
        .join(`\n\n`);

    await interaction.editReply(message);
}