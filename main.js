const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, onValue } = require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyDpemaaPygvXbvEonlUC3QjMVz158h_OFI",
    authDomain: "projectgames-304f4.firebaseapp.com",
    databaseURL: "https://projectgames-304f4-default-rtdb.firebaseio.com",
    projectId: "projectgames-304f4",
    storageBucket: "projectgames-304f4.appspot.com",
    messagingSenderId: "443851954620",
    appId: "1:443851954620:web:8208c9b1e55242cc7773b9"
};
  
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
        const date = interaction.options.getString('date')
        const message = interaction.options.getString('message')
        const media = interaction.options.getAttachment('media')
        const user = interaction.user.tag

        console.log(`${date}, ${message}, ${user}`)
        console.log(media.url)

        const embed = new EmbedBuilder()
            .setColor("#ff8400")
            .setTitle(`Dev Update - ${user}`)
            .setDescription(message)
            .setImage(media.url)
            .setTimestamp()

        writeData(date, message, user, media.url)
        interaction.reply({ embeds: [embed] })
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