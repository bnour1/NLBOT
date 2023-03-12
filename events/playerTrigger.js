const { GuildQueuePlayerNode } = require("discord-player");
const { EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  name: "playerTrigger",
  once: false,
  async execute(queue, track) {
    let ts = queue.node.getTimestamp();
    const songEmbed = new EmbedBuilder()

      .setFields([
        {
          name: `Proxima música`,
          value: `Bruno Mars - That’s What I Like [Official Music Video]`,
          inline: true,
        },
      ])
      .addFields([
        { name: "Author", value: track.author },
        {
          name: "Progress",
          value: queue.node.createProgressBar({timecodes: true,}) + ts.progress+'%',
        },
      ])
      .setColor("00ffff")
      .setTitle(track.title)
      .setURL(track.url)
      .setThumbnail(track.thumbnail)
      .setAuthor({
        name: track.author,
        iconURL:
          "https://i0.wp.com/guitarandlace.com/wp-content/uploads/2022/03/tiffany-blue-app-icons-Spotify.jpg?ssl=1",
        url: "https://discord.js.org",
      })
      .setImage(track.thumbnail)
      .setTimestamp()
      .setFooter({
        text: "Enviada por " + queue.metadata.member.displayName,
        iconURL: queue.metadata.member.displayAvatarURL(),
      });
    return await queue.metadata.followUp({ embeds: [songEmbed] });
  },
};
