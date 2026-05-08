import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import db from '../db/database';
import { t } from '../i18n';

export async function helpCommand(interaction: ChatInputCommandInteraction): Promise<void> {
  await interaction.deferReply({ ephemeral: true });

  const server = db
    .prepare('SELECT language FROM servers WHERE server_id = ?')
    .get(interaction.guildId!) as { language: string } | undefined;

  const lang = t(server?.language ?? 'en');

  const embed = new EmbedBuilder()
    .setTitle(lang.help.title)
    .setColor(0x5865f2)
    .addFields(
      {
        name: '🎮 /games',
        value: 'Shows free games using your server filters.',
      },
      {
        name: '🌍 /allgames',
        value: 'Shows all free games available right now, no filters applied.',
      },
      {
        name: '⚙️ /setup',
        value: 'Configure the bot for this server. Requires **Manage Server** permission.',
      },
      {
        name: '📋 /settings',
        value: 'Shows the current configuration for this server.',
      },
    )
    .setFooter({ text: lang.help.footer });

  await interaction.editReply({ embeds: [embed] });
}