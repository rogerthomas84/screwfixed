# Screwfixed

A small Chrome extension that stops Screwfix ad links from changing your preferred store.

## The problem

Screwfix's Google Ads links carry a `tc` query parameter that holds a store code, for example:

```
https://www.screwfix.com/p/floplast-push-fit-87-5-triple-socket-equal-junction-110mm/12152?tc=MC7&gclsrc=aw.ds&gad_source=1&...
```

When you land on that URL, Screwfix switches your preferred store to `MC7`, which might be a store at the other end of the country. After that, stock, click & collect and prices all show for the wrong branch.

## What Screwfixed does

The extension catches every top-level navigation to `screwfix.com` that has a `tc` parameter and redirects it before the page loads:

- **Default:** it removes `tc`. Your existing preferred store stays as it was, and every other parameter is kept.
- **Optional:** it replaces `tc` with your own store ID, so an ad link selects *your* store.

It uses Chrome's [`declarativeNetRequest`](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest) API. The extension never reads page content or browsing history. It can only rewrite Screwfix URLs.

## Install

Screwfixed isn't on the Chrome Web Store yet, so you load it unpacked:

1. Clone or [download](https://github.com/rogerthomas84/screwfixed/archive/refs/heads/master.zip) this repository.
2. Open `chrome://extensions` and switch on **Developer mode** (top right).
3. Click **Load unpacked** and select the `src` folder.
4. Pin the extension from the puzzle-piece menu if you want quick access to its settings.

## Setting your store (optional)

You only need a store ID if you want to use the *replace* mode, or a quick link back to your store page.

**The easy way:**

1. Go to [screwfix.com/stores](https://www.screwfix.com/stores) and open your local store's page.
2. Click the blue **Set XXX as my Screwfixed store** button in the bottom-right corner.

**Manually:** the store ID is the code in the store page URL. For `https://www.screwfix.com/stores/AB1/anytown`, the ID is `AB1`. Open the extension's popup, enter the ID and click **Save**.

Once you've saved a store, tick **Replace `tc` with my store instead of removing it** in the popup to turn on replace mode.

## If your store has already been changed

Removing `tc` stops it happening again, but it won't undo a change that has already been made. Open your store's page (the popup has a link once a store ID is saved) and choose it as your store on Screwfix again.

## Project layout

```
src/
  manifest.json   Extension manifest (Manifest V3)
  background.js   Keeps the URL-rewriting rule in sync with your settings
  content.js/css  The "set as my store" button on Screwfix store pages
  popup.*         Settings popup
```

## Licence

[MIT](LICENSE)
