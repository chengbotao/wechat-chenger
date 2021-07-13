/*
 * @Description: 
 * @Author: Chengbotao
 * @Date: 2021-07-13 12:33:03
 * @LastEditors: Chengbotao
 * @FilePath: \wechaty-chenger\src\core\chenger.ts
 */
import { Wechaty, log, Message } from "wechaty";
import { PuppetWeChat } from "wechaty-puppet-wechat";
import { EventLogger, QRCodeTerminal } from "wechaty-plugin-contrib";
import { WechatyWeixinOpenAI } from "wechaty-weixin-openai";
import { scheduleJob } from "node-schedule";

import config from "../config/index"
const puppet = new PuppetWeChat()
const preAnswerHook = async (message: Message) => {
  console.log(message);
}
const cronJob = async (bot: Wechaty) => {
  scheduleJob("每日播报", "0 19 17 * * *", async () => {
    let logMsg;
    let contact =
      (await bot.Contact.find({ name: config.oneself.name })) ||
      (await bot.Contact.find({ alias: config.oneself.alias })); // 获取你要发送的联系人
    // let one = await superagent.getOne(); //获取每日一句
    // let weather = await superagent.getTXweather(); //获取天气信息
    // let today = await untils.formatDate(new Date()); //获取今天的日期
    // let memorialDay = untils.getDay(config.MEMORIAL_DAY); //获取纪念日天数
    // let sweetWord = await superagent.getSweetWord();

    let str = `每天愉快`;
    try {
      logMsg = str;
      await contact.say(str); // 发送消息
    } catch (e) {
      logMsg = e.message;
    }
    console.log(logMsg);
  })
}
export default async function chenger() {
  const bot = new Wechaty({
    puppet,
    name: "chenger"
  });
  bot.use([EventLogger(["message", "heartbeat"]), QRCodeTerminal({
    small: true
  }), WechatyWeixinOpenAI({
    token: config.openAI.TOKEN,
    encodingAESKey: config.openAI.EncodingAESKey,
    preAnswerHook
  })])
  bot.on("login", async user => {
    log.info("程二觐见", user);
    await cronJob(bot)
  }).on("logout", async user => {
    log.info("程二退下", user);
  }).on("message", async (message: Message) => {
    const room = message.room(); // 是否群消息
    const talker = message.talker(); // 发消息的人
    const text = message.text().trim(); // 消息内容
    const mentionSelf = await message.mentionSelf(); // 是否@程二
    // const messageType = message.type(); // 消息类型
    if (message.self()) {
      return;
    }

    if (room && mentionSelf && text) {
      // 群聊,@程二,消息不为空
      const topic = await room.topic(); // 群名
      log.info(`群名: ${topic} 发消息人: ${talker.name()} 内容: ${talker}`);
    } else {
      // 私聊
    }
  })
  await bot.start()
}