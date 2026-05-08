import { ChatInputCommandInteraction, PermissionFlagsBits, TextChannel } from 'discord.js';
import db from '../db/database';
import { t } from '../i18n';

export async function setupCommand(interaction: ChatInputCommandInteraction): Promise<void> {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)) {
        await interaction.reply({
            content: t('en').setup.noPermission,
            ephemeral: true,
        });
        return;
    }

    const channel = interaction.options.getChannel('channel', true);
    const daily = interaction.options.getString('daily', true);
    const language = interaction.options.getString('language', true);
    const platform = interaction.options.getString('platform');
    const genre = interaction.options.getString('genre');

    const lang = t(language);

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
        daily === null ? null : daily === 'enable' ? 1 : 0,
        language,
    );

    if (daily === 'enable') {
        const welcomeChannel = await interaction.client.channels.fetch(channel.id);
        if (welcomeChannel instanceof TextChannel) {
            await welcomeChannel.send(lang.daily.enabled);
        }
    }

    await interaction.reply({
        content: `${lang.setup.success} <#${channel.id}>`,
        ephemeral: true,
    });
}