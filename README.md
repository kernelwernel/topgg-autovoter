<h1 align="center">topgg-autovoter</h1>

<p align="center">topgg-autovoter automates voting for bots on top.gg using google chrome! </p>

- uses your account thats already logged into top.gg
- you must be logged into top.gg on google chrome for this to work properly
  - or you may optionally pass in your `connect.sid` cookie

- - -

## NOTE FROM THE MAINTAINER:
> I am **NOT** the original creator of this package. All the credit goes to @Shrinkvine with his repository named `auto-vote-topgg` (I modified the name a little because npm is a bitch about "similar package names" lol), but he deleted/privated it for some reason. This package is merely a fork of his repository before it was unavailable, so I'm reuploading it as I think this is such a useful package for automation purposes. 
> 
> I will keep maintaining this package if it ever gets any PRs or issues but if you're the original author of this repository and you want me to remove it for whatever reason, please contact me on discord at `nonce#0001`. If it doesn't work, my discord tag should be on my github profile.

- - - 


## Installation

```bash
npm i topgg-autovoter
```

## Usage

`vote({ voteUrl, userDataDir, connectSidCookie })`

- `voteUrl`
  - the top.gg url to vote for your bot
- `userDataDir`
  - the path to the directory of your local user's chrome data
    - Will likely be `%userprofile%\AppData\Local\Google\Chrome\User Data` on windows
- `connectSidCookie`
  - The `connect.sid` cookie value from top.gg
    - Use the cookie if you are voting from multiple accounts
      - Prioritized over userDataDir if this is passed in

```js
const { vote } = require("topgg-autovoter");

async function voteForMyBot() {
  const { success, msg } = await vote({
    voteUrl: "https://top.gg/bot/12345678/vote",
    connectSidCookie: "connect.sid cookie", // Only connectSidCookie or userDataDir is required. connectSidCookie input will be prioritized.
    userDataDir:
      "C:\\Users\\JohnSmith\\AppData\\Local\\Google\\Chrome\\User Data", // Only connectSidCookie or userDataDir is required. connectSidCookie input will be prioritized.
  });
  console.log(success, msg);
}

// call it on startup
voteForMyBot();

// call it every 12 hours after startup
setInterval(async () => {
  await voteForMyBot();
}, 43300000);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
