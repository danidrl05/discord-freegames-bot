import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import db from '../db/database';
import { t } from '../i18n';

export async function settingsCommand(interaction: ChatInputCommandInteraction): Promise<void> {
    const server = db
        .prepare('SELECT * FROM servers WHERE server_id = ?')
        .get(interaction.guildId!) as {
            channel_id: string;
            platforms: string;
            genres: string;
            language: string;
            daily_enabled: number;
        } | undefined;

    const lang = t(server?.language ?? 'en');

    if (!server) {
        await interaction.reply({
            content: lang.settings.noConfig,
            ephemeral: true,
        });
        return;
    }

    const embed = new EmbedBuilder()
        .setTitle(lang.settings.title)
        .setColor(0x5865f2)
        .addFields(
            { name: lang.settings.channel, value: `<#${server.channel_id}>`, inline: true },
            { name: lang.settings.language, value: server.language ?? 'en', inline: true },
            { name: lang.settings.daily, value: server.daily_enabled ? lang.settings.dailyEnabled : lang.settings.dailyDisabled, inline: true },
            { name: lang.settings.platforms, value: server.platforms ?? lang.settings.all, inline: true },
            { name: lang.settings.genres, value: server.genres ?? lang.settings.all, inline: true },
        )
        .setFooter({ text: lang.settings.footer });
    
    await interaction.reply({ embeds: [embed], ephemeral: true });
}