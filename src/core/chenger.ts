/*
 * @Description: 
 * @Author: Chengbotao
 * @Date: 2021-07-13 12:33:03
 * @LastEditors: Chengbotao
 * @FilePath: \wechaty-chenger\src\core\chenger.ts
 */

import { Wechaty } from "wechaty";
// import { PuppetWeChat } from "wechaty-puppet-wechat";
// const puppet = new PuppetWeChat()
export default async function chenger() {
  const bot = new Wechaty({
    // puppet,
    name: "chenger"
  });
  bot
    .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`))
    .on('login', user => console.log(`User ${user} logged in`))
    .on('message', async message => {
      console.log(`Message: ${message}`)
      await message.say(message.text())
    })
  await bot.start()
}