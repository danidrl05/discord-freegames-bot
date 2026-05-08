import { ChatInputCommandInteraction } from 'discord.js';
import db from '../db/database';
import { getFilteredGames } from '../api/gamerpower';
import { t } from '../i18n';
 
export async function gamesCommand(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.deferReply();

    const server = db
        .prepare('SELECT * FROM servers WHERE server_id = ?')
        .get(interaction.guildId!) as { platforms: string; genres: string, language: string } | undefined;

    const lang = t(server?.language ?? 'en');
    const games = await getFilteredGames(server?.platforms, server?.genres);

    if (games.length === 0) {
        await interaction.editReply(lang.games.noGames);
        return;
    }

    const message = `**${lang.games.header}**\n\n` + games
        .slice(0, 10)
        .map((g) => `**${g.title}** - ${g.platforms}\n${g.open_giveaway_url}`)
        .join(`\n\n`);

    await interaction.editReply(message);
}