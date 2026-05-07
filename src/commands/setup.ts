import { ChatInputCommandInteraction, PermissionFlagsBits } from 'discord.js';
import db from '../db/database';

export async function setupCommand(interaction: ChatInputCommandInteraction): Promise<void> {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)) {
        await interaction.reply({
            content: 'You need the "Manage Server" permission to use this command.',
            ephemeral: true,
        });
        return;
    }

    const channel = interaction.options.getChannel('channel', true);
    const platform = interaction.options.getString('platform');
    const genre = interaction.options.getString('genre');
    const language = interaction.options.getString('language');
    const daily = interaction.options.getString('daily');

    db.prepare(`
        INSERT INTO servers (server_id, channel_id, platforms, genres, daily_enabled, language)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(server_id) DO UPDATE SET
            channel_id      = excluded.channel_id,
            platforms       = COALESCE(excluded.platforms, platforms),
            genres          = COALESCE(excluded.genres, genres),
            daily_enabled   = COALESCE(excluded.daily_enabled, daily_enabled),
            language        = COALESCE(excluded.language, language)
    `).run(
        interaction.guildId!,
        channel.id,
        platform,
        genre,
        language,
        daily === null ? null : daily === 'enable' ? 1 : 0,
    );

    await interaction.reply({
        content: `✅ Configuration saved! Daily notifications → <#${channel.id}>`,
        ephemeral: true,
    });
}