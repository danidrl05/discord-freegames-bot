import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import ready from './events/ready';
import interactionCreate from './events/intereactionCreate';
import './db/database';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('ready', (c) => {
  console.log(`✅ Bot en línia com ${c.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);