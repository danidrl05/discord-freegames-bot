import { ChatInputCommandInteraction } from 'discord.js';
import db from '../db/database';
import { getFilteredGames } from '../api/gamerpower';

export async function gamesCommand(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.deferReply();

    const server = db
        .prepare('SELECT * FROM servers WHERE server_id = ?')
        .get(interaction.guildId!) as { platforms: string; genres: string} | undefined;

    const games = await getFilteredGames(server?.platforms, server?.genres);

    if (games.length === 0) {
        await interaction.editReply('No free games found with the current filters.');
        return;
    }

    const message = games
        .slice(0, 10)
        .map((g) => `**${g.title}** - ${g.platforms}\n${g.open_giveaway_url}`)
        .join(`\n\n`);

    await interaction.editReply(message);
}