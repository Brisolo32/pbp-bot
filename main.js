const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
const firebaseconf = require('./firebaseconfig.json')
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

const firebaseConfig = firebaseconf

const adminId = [
    382528255753977856,
    953363314384187462,
    323896995918118912
]

initializeApp(firebaseConfig);
const db = getDatabase();  

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds] 
});

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

    if (commandName === 'push') {
        console.log(interaction.author.id)
        if (adminId.include(interaction.author.id)) {
            const date = interaction.options.getString('date')
            const message = interaction.options.getString('message')
            const media = interaction.options.getAttachment('media')
            const user = interaction.user.tag
    
            const embed = new EmbedBuilder()
                .setColor("#ff8400")
                .setTitle(`Dev Update - ${user}`)
                .setDescription(message)
                .setImage(media.url)
                .setTimestamp()
    
            console.log(interaction.user.id)
            writeData(date, message, user, media.url)
            interaction.reply({ embeds: [embed] })
        }
    }
});


client.login(token);

function writeData(date, message, user, media) {
    set(ref(db), {
      date: date,
      message: message,
      user: user,
      img: media
    });
    console.log('Wrote data to database')
}