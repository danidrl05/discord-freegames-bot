import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import db from '../db/database';

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

    if (!server) {
        await interaction.reply({
            content: 'This server has no configuration yet. Use `/setup` to get started.',
            ephemeral: true,
        });
        return;
    }

    const embed = new EmbedBuilder()
        .setTitle('⚙️ Server Settings')
        .setColor(0x5865f2)
        .addFields(
            { name: '📢 Channel', value: `<#${server.channel_id}>`, inline: true },
            { name: '🌐 Language', value: server.language ?? 'en', inline: true },
            { name: '🔔 Daily', value: server.daily_enabled ? '✅ Enabled' : '❌ Disabled', inline: true },
            { name: '🎮 Platforms', value: server.platforms ?? 'All', inline: true },
            { name: '🎭 Genres', value: server.genres ?? 'All', inline: true },
        )
        .setFooter({ text: 'Use /setup to update your configuration.' });
    
    await interaction.reply({ embeds: [embed], ephemeral: true });
}