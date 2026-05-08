import cron from 'node-cron';
import { Client, TextChannel } from 'discord.js';
import db from '../db/database';
import { getFilteredGames } from '../api/gamerpower';
import { t } from '../i18n';

export default function startCron(client: Client): void {
  cron.schedule('0 9 * * *', async () => {
    console.log('⏰ Running daily notification...');

    const servers = db
      .prepare('SELECT * FROM servers WHERE channel_id IS NOT NULL AND daily_enabled = 1')
      .all() as { server_id: string; channel_id: string; platforms: string; genres: string, language: string }[];

    for (const server of servers) {
      try {
        const lang = t(server.language ?? 'en');
        const games = await getFilteredGames(server.platforms, server.genres);

        if (games.length === 0) continue;

        const message = `**${lang.daily.header}**\n\n` + games
          .slice(0, 10)
          .map((g) => `**${g.title}** — ${g.platforms}\n${g.open_giveaway_url}`)
          .join('\n\n');

        const channel = await client.channels.fetch(server.channel_id);
        if (!channel || !(channel instanceof TextChannel)) continue;

        await channel.send(message);
      } catch (error) {
        console.error(`Error sending to server ${server.server_id}:`, error);
      }
    }
  });
}