module.exports = function({ api, modules, config, __GLOBAL, User, Thread, Rank, Economy, Fishing, Nsfw }) {
	/* ================ Config ==================== */
	let {prefix, canCheckUpdate, googleSearch, wolfarm, yandex, openweather, tenor, saucenao, waketime, sleeptime, admins, nsfwGodMode} = config;
	const fs = require("fs-extra");
	const moment = require("moment-timezone");
	const request = require("request");
	const ms = require("parse-ms");
	const stringSimilarity = require('string-similarity');
	const axios = require('axios');
	var resetNSFW = false;

	/* ================ Check update ================ */
		//Global Ranking
		if (contentMessage == `${prefix}top rank`)
			(async () => {
				let msg = {
				body: 'Top 10 người có bật xếp hạng cao nhất:',
				mentions: []
				}
				let num = 0;
				let all = await User.getColumn(['name', 'uid', 'point']);
				all.sort((a, b) => b.point - a.point);
				for (var i = 0; i < 10; i++) {
					let level = Rank.expToLevel(all[i].point);
					num += 1;
					msg.body += '\n' + num + '. ' + all[i].name + ' - Rank ' + level;
					msg.mentions.push({
						tag: all[i].name,
						id: all[i].uid
					});
				}
				api.sendMessage(msg, threadID, messageID);
			})();

		/* ==================== System Check ==================== */

		//Check if command is correct
		if (contentMessage.indexOf(prefix) == 0) {
			var checkCmd, findSpace = contentMessage.indexOf(' ');
			if (findSpace == -1) {
				checkCmd = stringSimilarity.findBestMatch(contentMessage.slice(prefix.length, contentMessage.length), nocmdData.cmds);
				if (checkCmd.bestMatch.target == contentMessage.slice(prefix.length, contentMessage.length)) return;
			}
			else {
				checkCmd = stringSimilarity.findBestMatch(contentMessage.slice(prefix.length, findSpace), nocmdData.cmds);
				if (checkCmd.bestMatch.target == contentMessage.slice(prefix.length, findSpace)) return;
			}
			if (checkCmd.bestMatch.rating >= 0.3) return api.sendMessage(`Lệnh bạn nhập không tồn tại.\nÝ bạn là lệnh "${prefix + checkCmd.bestMatch.target}" phải không?`, threadID, messageID);
		}
	}
}
/* This bot was made by Catalizcs(roxtigger2003) and SpermLord(spermlord) with love <3, pls dont delete this credits! THANKS */