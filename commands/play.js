const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Inicia musica')
        .addStringOption(option =>
            option.setName('song')
            .setDescription('The refferal to the song')
            .setRequired(true)),
    async execute(interaction) {
        let queue = interaction.client.player.createQueue(interaction.guild.id);
        const args = interaction.options.getString('song').trim().split(/ +/g);;
            await queue.join(interaction.member.voice.channel);
        let song = await queue.play(args.join(' ')).catch(err => {
            console.log(err);
            if(!guildQueue)
                queue.stop();
        });
      },
    };