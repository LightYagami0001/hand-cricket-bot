import { DiscordClient } from '../util/discord-client';
import { MessageEmbed, Message } from 'discord.js';
import DBL from 'dblapi.js';

export function setHelp(
  client: DiscordClient,
  dbl: DBL | null,
  commandList: {
    name: string,
    desc: string
  }[]
) {
  client.onCommand('help', '', async (msg: Message, prefix: string) => {
    const helpEmbed = new MessageEmbed()
      .setColor('#6633bb')
      .setTitle('Hand Cricketer Help')
      .setDescription(`\
**Custom Prefix**: You can use a custom prefix in a certain server by changing the nickname of the bot to \`[prefix] Name\`. Here the prefix can be anything such as \`!\`, \`?\` or \`.\` and the rest of the nickname doesn't matter and can be anything.

In the first half of October, we hosted nearly 2000 single and multi player matches! Also the bot is in nearly 100 servers now! Invite it to your server or recommend it to your friend too!
The bot won't be able to join more than 100 servers before verification by discord and verification is going to take some time, invite it now from the link below!
`)
      .addField(`Following is a list of Hand Cricketer commands.`, '\u200b')
      .addFields(
        { name: `${prefix}help`, value: 'Help Command.' },
        ...commandList.map(command => {
          return {
            name: `${prefix}${command.name}`,
            value: command.desc
          }
        })
      )
      .addField(`What's New!`, `Because of the AMAZING growth, we have refactored the bot's code. In simple language, it means that it becomes easier for us to add new features.
We have changed some of the scoreboard, matching system and added a bit of commentary ;) Next on the list is an option to play a test match or fix a number of overs.
If you have *absolutey any* suggestions, you can let us know in the support server (link below) or on Github(link below).
`)
      .setTimestamp()
      .setThumbnail(client.user.displayAvatarURL())
      .addField(`It's Open Source`, `[Github](https://github.com/HarshKhandeparkar/hand-cricket-bot)`, true);

      if (dbl !== null) {
        helpEmbed.addField('Vote and Invite', `[top.gg](https://top.gg/bot/${client.user.id})`, true);
        const botStats = await dbl.getBot(client.user.id);

        if (botStats.support) helpEmbed.addField('Support Server', `[Join It!](https://discord.gg/${botStats.support})`, true);
      }

      msg.channel.send(helpEmbed);
  })
}