require('dotenv').config();


dotenv.config();
const token = process.env.TOKEN;
const { REST, Routes, ApplicationCommandOptionType} =  require('discord.js');


// const commands = [
//     {
//         name: "add",
//         description: "Adds two numbers",
//         options: [
//             {
//                 name: 'first-number',
//                 description: 'The first number',
//                 type:ApplicationCommandOptionType.Number,
//                 required: true,
//             },
//             {
//                 name: 'second-number',
//                 description: 'The second number',
//                 type:ApplicationCommandOptionType.Number,
//                 required: true,
//             },
//         ],
//     },
// ]

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};


const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registerings slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID, 
                process.env.GUILD_ID
                ),
                { body: commands }
            )
            console.log('Slash commands were registered successfully');
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();