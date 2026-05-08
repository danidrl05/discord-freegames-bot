import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export async function helpCommand(interaction: ChatInputCommandInteraction): Promise<void> {
  await interaction.deferReply({ ephemeral: true });

  const embed = new EmbedBuilder()
    .setTitle('📖 Help')
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
    .setFooter({ text: 'Use /setup platform:<name1>, <name2>, ... or genre:<name1>, <name2>, ... to filter your results' });

  await interaction.editReply({ embeds: [embed] });
}