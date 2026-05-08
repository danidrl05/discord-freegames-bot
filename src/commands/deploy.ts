import {REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const commands = [
    new SlashCommandBuilder()
        .setName('games')
        .setDescription('Shows the list of free games avaliable using the server filters'),

    new SlashCommandBuilder()
        .setName('allgames')
        .setDescription('Shows the complete list of free games available'),
    
    new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Configure the bot for this server')
    .addChannelOption((option) =>
        option
        .setName('channel')
        .setDescription('Channel to send daily notifications')
        .setRequired(true),
    )
    .addStringOption((option) =>
        option
        .setName('daily')
        .setDescription('Enable or disable daily notifications')
        .setRequired(true)
        .addChoices(
        { name: 'Enable', value: 'enable' },
        { name: 'Disable', value: 'disable' },
        ),
    )
    .addStringOption((option) =>
        option
        .setName('language')
        .setDescription('Bot language')
        .setRequired(true)
        .addChoices(
          { name: 'Català', value: 'ca' },
          { name: 'Español', value: 'es' },
          { name: 'English', value: 'en' },
        ),
    )
    .addStringOption((option) =>
        option
        .setName('platform')
        .setDescription('Filter by platform (Steam, Epic, GOG...)')
        .setRequired(false),
    )
    .addStringOption((option) =>
        option
        .setName('genre')
        .setDescription('Filter by genre (RPG, Shooter...)')
        .setRequired(false),
    ),

    new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Show the current configuration for this server'),
    
    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show all available commands and valid filter options'),
].map((command) => command.toJSON());

const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

rest
    .put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!), {
        body:commands,
    })
    .then(() => console.log('✅ Commands registered on Discord'))
    .catch(console.error);