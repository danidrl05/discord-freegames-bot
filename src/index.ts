import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import ready from './events/ready';
import interactionCreate from './events/interactionCreate';
import './db/database';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

ready(client);
interactionCreate(client);

client.login(process.env.DISCORD_TOKEN);