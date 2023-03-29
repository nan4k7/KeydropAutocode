const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config');
const cookiefile = require('cookiefile');
const axios = require('axios');
const https = require('https');
const http = require('http');

const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });

let cookiesArr = {};
let intValTokenRefresh;



let client = new Discord.Client({
	intents: ['GUILDS', 'GUILD_MESSAGE_TYPING', 'GUILD_MESSAGES', 'GUILD_WEBHOOKS', 'GUILD_MEMBERS']
});


function getDate() {
	let date_time = new Date();

	let date = ('0' + date_time.getDate()).slice(-2);
	let month = ('0' + (date_time.getMonth() + 1)).slice(-2);
	let year = date_time.getFullYear();
	let hours = String(date_time.getHours()).padStart(2, '0');
	let minutes = String(date_time.getMinutes()).padStart(2, '0');
	let seconds = String(date_time.getSeconds()).padStart(2, '0');

	return(year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds);
}

function getAxiosCfg(url, method = 'post', data = '', cooks = '') {
	return 	{
		method: method,
		maxBodyLength: Infinity,
		url: url,
		headers: {
		  'authority': 'key-drop.com',
		  'accept': '*/*',
		  'accept-language': 'en-US,en;q=0.9',
		  'content-type': 'application/json',
		  'cookie': cooks,
		  'origin': 'https://key-drop.com',
		  'referer': 'https://key-drop.com/en/',
		  'user-agent': config.useragent,
		  'x-requested-with': 'XMLHttpRequest'
		},
		httpsAgent: httpsAgent,
		httpAgent: httpAgent,
		data: data
	};
}

async function run() {
	fs.readdirSync('./cookies').filter(filename => filename.endsWith('.txt')).forEach(async filename => {
		const cookiemap = new cookiefile.CookieMap(`./cookies/${filename}`);
		cookiesArr[filename] = cookiemap.toRequestHeader().replace ('Cookie: ','');

		console.log(`${filename} ✔`);

		refreshTokenOnPage();
	})


	let redeemer = new RedeemManager();

	client.once('ready' , c => {
		console.log(`${getDate()}: [Discord] Logged in as ${c.user.tag} (${client.user.id})`);
	})

	client.on('messageCreate', async message => {
		let code = message.getCode();
		if(code != false) {
			console.log(`${getDate()}: [Discord] Received new code: ${code}`);
			redeemer.redeem(code);
		}
	})


	const token = Buffer.from(config.discord_token, 'base64').toString('utf8');

	client.login(token);
}


const wait = ms => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(), ms);
	});
}

const refreshTokenOnPage = async () => {
	let ts = Date.now();


	for (var name in cookiesArr) {
		const cookie = cookiesArr[name];

		let axiosConfig = getAxiosCfg('https://key-drop.com/en/token?t=' + ts, 'get', '', cookie);

		axios.request(axiosConfig)
			.then((response) => {
				console.log(`${getDate()}: [TokenRefresh][${name}] OK`);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(`${getDate()}: [TokenRefresh][${name}] Error`);
				console.log(error);
		});

		await wait(1000);
	}


	const randomNess = 0.95 + ((1.05 - 0.95) * Math.random());
	const tokenRefreshTime = randomNess * config.token_interval;

	intValTokenRefresh = setTimeout(refreshTokenOnPage, tokenRefreshTime);
}

const redeemCodeOnPage = async (code) => {
	console.log(`${getDate()}: [RedeemCode] Redeeming code ${code}`);

	let axiosData = JSON.stringify({
		'promoCode': code,
		'recaptcha': null
	});


	for (var name in cookiesArr) {
		const cookie = cookiesArr[name];

		let axiosConfig = getAxiosCfg('https://key-drop.com/en/Api/activation_code', 'post', axiosData, cookie);

		axios.request(axiosConfig)
			.then((response) => {

				if (response.data.goldBonus != null) {
					console.log(`${getDate()}: [RedeemCode][${name}] Gold Bonus (${response.data.goldBonus})`);
				}
				else {
					console.log(`${getDate()}: [RedeemCode][${name}] No Gold Bonus`);
				}
			})
			.catch((error) => {
				console.log(`${getDate()}: [RedeemCode][${name}] Error`);
				console.log(error);
		});


		await wait(1000);
	}
}

class RedeemManager {
	constructor() {
		this.codeQueue = [];
		this.isRedeeming = false;
	}

	async _redeemNext() {
		console.log(`${getDate()}: [Redeemer] Redeeming next code in queue`);
		this.isRedeeming = true;
		while(this.codeQueue.length > 0) {
			let code = this.codeQueue[0];

			redeemCodeOnPage(code);

			this.codeQueue.shift();
		}
		this.isRedeeming = false;
	}

	redeem(code) {
		this.codeQueue.push(code);
		if(!this.isRedeeming) this._redeemNext();
	}
}

Discord.Message.prototype.getCode = function() {
	if(config.golden_code_channels.includes(this.channelId)) {
		if(this.author.id == config.recievingFromBot_id) {			// Keydrop
			if(this.content?.length == 17) {
				return this.content;
			}
		}
	}

	return false;
}

run();
