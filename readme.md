<p align="center">
  <img src="https://img.shields.io/github/downloads/r3ge/KeydropAutocode/total?style=for-the-badge&logo=appveyor">
  <img src="https://img.shields.io/github/stars/r3ge/KeydropAutocode?style=for-the-badge&logo=appveyor">
  </p>


### KeydropAutocode
[Youtube Tutorial](https://youtu.be/3tWlimRYWtY) - A little outdated

[Leave a ⭐ for more updates](https://github.com/r3ge/KeydropAutocode/stargazers)

### **Always update bot token when downloading a new verison of the app.**

Join the discord server for support

### 1. Config.js
If you change any communication with discord you might break the app.

1.1 discord_token - This is used to communicate with discord.

1.2 recievingFromBot_id - Used to communicate with discord.

1.3 golden_code_channels - Used to communicate with discord.

1.4 useragent - Changes the useragent of the app, don't mess with this unless you don't know what you're doing.

1.5 token_interval - Sets the time to refresh token in keydrop and never loose session.

### 2. Cookies
In order to use the app you will need to get your cookies. To do that install [this chrome extension](https://chrome.google.com/webstore/detail/%E3%82%AF%E3%83%83%E3%82%AD%E3%83%BCjson%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E5%87%BA%E5%8A%9B-for-puppet/nmckokihipjgplolmcmjakknndddifde?hl=en). and go to Keydrop.com.
Then press on the puzzle piece to reveal the chrome extension which is located in the right corner of chrome and press on the extension
A popup should appear. Press on the blue button named ‘Export cookies as JSON’
That will trigger a download. A file called key-drop.com.cookies.json will be downloaded on your device. Place it in the cookies folder of the app.


Cookies expire, you will need to refresh them once per 36/h.
However they will not expire while the program is running.

### 3. Running the app
You need to **extract** the files from the zip before you are able to use the app. Learn more [here](https://support.microsoft.com/en-us/windows/zip-and-unzip-files-8d28fa72-f2f9-712f-67df-f80cf89fd4e5#:~:text=To%20unzip%20a%20single%20file,and%20then%20follow%20the%20instructions.).

3.1 Run main.exe in order to run the app.

3.3 Run app via cmd : Open a cmd, type `cd` followed by the path of the folder then type `node index.js`


### 4. Getting BOT Token
In order to get the TOKEN, go to https://www.base64decode.org/ then decode

```T1RjMU16azVNemd3TXpRek5EWTRNRGswLkd3X19Bci5xSXJyRktqOG1PdG1LY3YtUTgzdTlYQ1JUd2RrYkVGYUZTcThTVQ```

The decoded result is the token

### 5. Running on multiple accounts

In order to run multiple accounts, put multiple txt cookie files in the cookie folder.
