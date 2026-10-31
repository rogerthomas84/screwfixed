# Privacy Policy

_Last updated: 31 October 2026_

Screwfixed does not collect, transmit, sell or share any personal data. It has no analytics, no tracking and no servers.

## What the extension stores

If you choose to save a store, Screwfixed keeps three settings:

- your store ID (for example `AB1`)
- the store's name from its Screwfix URL (for example `anytown`)
- whether replace mode is switched on

These are saved with Chrome's `storage.sync` API. If you're signed in to Chrome with sync turned on, Chrome syncs them across your devices as part of your Google account, under [Google's privacy policy](https://policies.google.com/privacy). Screwfixed never sends them anywhere itself. To delete them, clear the store ID in the popup and save, or remove the extension.

## What the extension does with web pages

- **URL rewriting:** when you open a screwfix.com page whose URL has a `tc` parameter, Chrome removes that parameter (or replaces it with your saved store ID) before loading the page. This uses Chrome's `declarativeNetRequest` API, so the rewrite happens inside Chrome and the extension never sees which pages you visit.
- **Store pages:** on screwfix.com store pages (`/stores/...`), the extension reads the page address to find the store ID and shows a "Set as my Screwfixed store" button. It doesn't read anything else on the page.

The extension makes no network requests of its own and doesn't run on any site other than screwfix.com.

## Permissions

| Permission | Why it's needed |
| --- | --- |
| `declarativeNetRequest` | To remove or replace the `tc` parameter on Screwfix URLs |
| `storage` | To remember your store ID and settings |
| Access to `screwfix.com` | To apply the URL rule and show the button on store pages |

## Changes

Any changes to this policy will be published in this file in the [Screwfixed repository](https://github.com/rogerthomas84/screwfixed).

## Contact

Questions can be raised as an [issue on GitHub](https://github.com/rogerthomas84/screwfixed/issues).
