/*
 * @Description: 
 * @Author: Chengbotao
 * @Date: 2021-07-13 10:36:10
 * @LastEditors: Chengbotao
 * @FilePath: \wechaty-chenger\src\index.ts
 */
import chenger from "./core/chenger";

chenger().catch((err) => {
  console.log(err);
})