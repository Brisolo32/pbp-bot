const { REST, Routes, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder()
        .setName('push')
        .setDescription('Pushes a update message')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option
            .setName("date")
            .setDescription('The date on which was made the post (format: DD-MM-YYYY)')
            .setRequired(true))
        .addStringOption(option =>
            option
            .setName('message')
            .setDescription('The message of the post (Maximum of 1024 char)')
            .setRequired(true))
        .addAttachmentOption(option =>
            option
            .setName('media')
            .setDescription('A photo to use (only one)')
            .setRequired(true))
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
