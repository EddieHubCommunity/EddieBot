import { MessageEmbed } from 'discord.js'
import commandList from './index'
import config from '../config'
const { COMMAND_PREFIX } = config

export const command = (embed: MessageEmbed) => {
  embed.setTitle('Help commands').setDescription('Lists the command available')

  commandList.forEach(({ triggers, description }) => {
    const mainTrigger = `${COMMAND_PREFIX}${triggers[0]}`

    embed.addField(mainTrigger, description, true)
  })

  return embed
}

export const description = 'Lists available commands'

export const triggers = ['help']
