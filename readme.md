# auto-vote-topgg

auto-vote-topgg automates voting for bots on top.gg using google chrome!

- uses your account thats already logged into top.gg
- you must be logged into top.gg on google chrome for this to work properly

## Installation

```bash
npm i auto-vote-topgg
```

## Usage

`vote(voteUrl, userDataDir)`

- `voteUrl`
  - the top.gg url to vote for your bot
- `userDataDir`
  - the path to the directory of your local user's chrome data
    - Will likely be `%userprofile%\AppData\Local\Google\Chrome\User Data` on windows

```js
const { vote } = require('auto-vote-topgg')

async function voteForMyBot() {
  const { success, msg } = await vote(
    'https://top.gg/bot/123456789/vote',
    'C:\\Users\\JohnSmith\\AppData\\Local\\Google\\Chrome\\User Data',
  )
  console.log(success, msg)
}

// call it on startup
voteForMyBot()

// call it every 12 hours after startup
setInterval(async () => {
  await voteForMyBot()
}, 43300000)
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
