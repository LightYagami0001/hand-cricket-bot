import { Message, MessageEmbed } from 'discord.js';
import { DiscordClient } from '../../util/discord-client';
import { setCommand } from '../command';

export function setStats(
  client: DiscordClient
) {
  return setCommand(
    client,
    'stats',
    'Stats about the bot.',
    '',
    async (msg: Message) => {
      const matchesPlayed = client.matchesDB.getMatches();

      const statsEmbed = new MessageEmbed()
        .setTitle('Hand Cricketer Stats')
        .addField('Servers', `\`${client.guilds.cache.array().length}\``, true)
        .addField('Users', `\`${client.guilds.cache.array().map(guild => guild.memberCount).reduce((a, b) => a + b)}\``, true)
        .addField('1P Matches Played', `\`${matchesPlayed.singlePlayer}\``)
        .addField('2P Matches Played', `\`${matchesPlayed.multiPlayer}\``)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor('RED');

      if (client.dblIntegration) {
        const botStats = await client.dbl.getBot(client.user.id);
        statsEmbed.addField(`top.gg votes`, `\`${botStats.points}\``, true);

        if (botStats.invite) statsEmbed.addField('Liked the bot?', `[Vote it!](https://top.gg/bot/${client.user.id}/vote)`, true);
      }

      msg.channel.send(statsEmbed);
    }
  )
}
