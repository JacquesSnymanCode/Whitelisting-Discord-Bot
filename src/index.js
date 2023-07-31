const { Client, IntentsBitField } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', () => {
    console.log(`✅ ${client.user.tag} is online`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'whitelist') {
        const user = interaction.options.get('user').value;
        const CharacterName = interaction.options.get('character-name').value;
        const newRP = interaction.options.get('new-to-rp').value.toLowerCase();
        const UnderAge = interaction.options.get('under-18').value.toLowerCase();

        // Check if the member executing the command has the "Staff" role
        const isStaff = interaction.member.roles.cache.some((role) => role.name === 'Staff');
        if (!isStaff) {
            interaction.reply("You don't have permission to use this command.");
            return;
        }

        const userMatch = user.match(/^<@!?(\d+)>$/);
        if (!userMatch) {
            console.log('Invalid user mention format.');
            return;
        }

        const userID = userMatch[1];
        const member = await interaction.guild.members.fetch(userID);

        if (newRP === 'yes') {
            const newRoleName = 'test';

            const role = interaction.guild.roles.cache.find((r) => r.name === newRoleName);
            if (!role) {
                console.log(`Role '${newRoleName}' not found.`);
                return;
            }

            try {
                await member.roles.add(role);
                console.log(`Role '${newRoleName}' added to ${member.user.tag}.`);

                await member.setNickname(CharacterName);
                console.log(`${member.user.tag}'s nickname changed to '${CharacterName}'.`);
            } catch (error) {
                console.error(`Error adding role or changing nickname: ${error.message}`);
            }
        }

       
        const citizenRoleName = 'CITIZEN'; 
        const whitelistedRoleName = 'Whitelisted'; 

        const citizenRole = interaction.guild.roles.cache.find((r) => r.name === citizenRoleName);
        const whitelistedRole = interaction.guild.roles.cache.find((r) => r.name === whitelistedRoleName);

        if (citizenRole) {
            await member.roles.add(citizenRole);
            console.log(`Role '${citizenRoleName}' added to ${member.user.tag}.`);
        } else {
            console.log(`Role '${citizenRoleName}' not found.`);
        }

        if (whitelistedRole) {
            await member.roles.add(whitelistedRole);
            console.log(`Role '${whitelistedRoleName}' added to ${member.user.tag}.`);
        } else {
            console.log(`Role '${whitelistedRoleName}' not found.`);
        }

       
        const unwhitelistedRoleName = 'Unwhitelisted';
        const unwhitelistedRole = interaction.guild.roles.cache.find((r) => r.name === unwhitelistedRoleName);
        if (unwhitelistedRole) {
            await member.roles.remove(unwhitelistedRole);
            console.log(`Role '${unwhitelistedRoleName}' removed from ${member.user.tag}.`);
        }

        interaction.reply(`${user} was Whitelisted, welcome to Mzanzi Reborn❤️`);
    }
});

client.login(process.env.TOKEN);