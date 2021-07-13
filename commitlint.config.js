/*
 * @Description:
 * @Author: Chengbotao
 * @Date: 2021-07-13 09:50:57
 * @LastEditors: Chengbotao
 * @FilePath: \wechaty-chenger\commitlint.config.js
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // must add these rules
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
  },
};
