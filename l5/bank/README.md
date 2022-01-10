
## 🚀 Quick Start

Ensure you have

- [Node.js](https://nodejs.org) 10 or later installed
- [npm](https://npmpkg.com) v1 or v2 installed

Then run the following:

- `npm install` to install dependencies.
- `npm run dev:chrome` to start the development server for chrome extension
- `npm run dev:firefox` to start the development server for firefox addon
- `npm run dev:opera` to start the development server for opera extension
- `npm run build:chrome` to build chrome extension
- `npm run build:firefox` to build firefox addon
- `npm run build:opera` to build opera extension
- `npm run build` builds and packs extensions all at once to extension/ directory

### Development

- `npm install` to install dependencies.
- To watch file changes in development

  - Chrome
    - `npm run dev:chrome`
  - Firefox
    - `npm run dev:firefox`
  - Opera
    - `npm run dev:opera`

- **Load extension in browser**

- ### Chrome

  - Go to the browser address bar and type `chrome://extensions`
  - Check the `Developer Mode` button to enable it.
  - Click on the `Load Unpacked Extension…` button.
  - Select your extension’s extracted directory.

- ### Firefox

  - Load the Add-on via `about:debugging` as temporary Add-on.
  - Choose the `manifest.json` file in the extracted directory

- ### Opera

  - Load the extension via `opera:extensions`
  - Check the `Developer Mode` and load as unpacked from extension’s extracted directory.

### Production

- `npm run build` builds the extension for all the browsers to `extension/BROWSER` directory respectively.

Note: By default the `manifest.json` is set with version `0.0.0`. The webpack loader will update the version in the build with that of the `package.json` version. In order to release a new version, update version in `package.json` and run script.

If you don't want to use `package.json` version, you can disable the option [here](https://github.com/abhijithvijayan/web-extension-starter/blob/e10158c4a49948dea9fdca06592876d9ca04e028/webpack.config.js#L79).

### Generating browser specific manifest.json

Update `source/manifest.json` file with browser vendor prefixed manifest keys

```js
{
  "__chrome__name": "SuperChrome",
  "__firefox__name": "SuperFox",
  "__edge__name": "SuperEdge",
  "__opera__name": "SuperOpera"
}
```

if the vendor is `chrome` this compiles to:

```js
{
  "name": "SuperChrome",
}
```

---

Add keys to multiple vendors by separating them with | in the prefix

```
{
  __chrome|opera__name: "SuperBlink"
}
```

if the vendor is `chrome` or `opera`, this compiles to:

```
{
  "name": "SuperBlink"
}
```

See the original [README](https://github.com/abhijithvijayan/wext-manifest-loader) of `wext-manifest-loader` package for more details

## Bugs

Please file an issue [here](https://github.com/abhijithvijayan/web-extension-starter/issues/new) for bugs, missing documentation, or unexpected behavior.

### Linting Config

- Shared Eslint & Prettier Configuration - [`@abhijithvijayan/eslint-config`](https://www.npmjs.com/package/@abhijithvijayan/eslint-config)

## License

MIT © [Abhijith Vijayan](https://abhijithvijayan.in)
