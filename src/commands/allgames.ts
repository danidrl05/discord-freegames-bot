import { ChatInputCommandInteraction} from 'discord.js';
import { getAllGames} from '../api/gamerpower';
import db from '../db/database';
import { t } from '../i18n';

export async function allGamesCommand(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.deferReply();

    const server = db
    .prepare('SELECT language FROM servers WHERE server_id = ?')
    .get(interaction.guildId!) as { language: string } | undefined;

    const lang = t(server?.language ?? 'en');
    const games = await getAllGames();

    if (games.length === 0) {
        await interaction.editReply(lang.allGames.noGames);
        return;
    }

    const message = `**${lang.allGames.header}**\n\n` + games
        .slice(0, 10)
        .map((g) => `**${g.title}** - ${g.platforms}\n${g.open_giveaway_url}`)
        .join(`\n\n`);

    await interaction.editReply(message);
}