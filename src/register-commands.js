require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'whitelist', 
        description: 'Whitelist users in Mzanzi',
        options: [
            {
                name: 'user',
                description: '@user',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'character-name',
                description: 'Set the Character Name',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'new-to-rp',
                description: 'Less then 100 hours',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices:[
                    {
                        name: 'Yes',
                        value: 'Yes',
                    },
                    {
                        name: 'No',
                        value: 'No',
                    },
                    
                ],
            },
            {
                name: 'under-18',
                description: 'User Age is under 18',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices:[
                    {
                        name: 'Yes',
                        value: 'Yes',
                    },
                    {
                        name: 'No',
                        value: 'No',
                    },
                    
                ],
            },
            
        ],
    },
];


const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);


(async () => {
try{

    console.log('Registering slash commands...')
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands}  
    )

    console.log('Slash Commands were Registered Successfully!')
}catch (error) {
    console.log(`There was an error: ${error}`);
}
})();