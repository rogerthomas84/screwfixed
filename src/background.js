// Keeps a dynamic declarativeNetRequest rule in sync with the user's settings.
// The rule strips (or replaces) the `tc` query parameter on any top-level
// navigation to screwfix.com, before Screwfix sees it.

const STRIP_RULE_ID = 1;
const ALLOW_RULE_ID = 2;

const DEFAULTS = { storeId: '', storeSlug: '', replaceTc: false };

async function getSettings() {
  return { ...DEFAULTS, ...(await chrome.storage.sync.get(DEFAULTS)) };
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function syncRules() {
  const { storeId, replaceTc } = await getSettings();
  const replacing = replaceTc && storeId !== '';

  const baseCondition = {
    requestDomains: ['screwfix.com'],
    resourceTypes: ['main_frame'],
  };

  const rules = [
    {
      id: STRIP_RULE_ID,
      priority: 1,
      condition: { ...baseCondition, regexFilter: '[?&]tc=' },
      action: {
        type: 'redirect',
        redirect: {
          transform: {
            queryTransform: replacing
              ? { addOrReplaceParams: [{ key: 'tc', value: storeId }] }
              : { removeParams: ['tc'] },
          },
        },
      },
    },
  ];

  if (replacing) {
    // Once tc already equals the user's store, let it through, otherwise the
    // redirect above would loop forever.
    rules.push({
      id: ALLOW_RULE_ID,
      priority: 2,
      condition: {
        ...baseCondition,
        regexFilter: `[?&]tc=${escapeRegex(storeId)}(&|#|$)`,
        isUrlFilterCaseSensitive: false,
      },
      action: { type: 'allow' },
    });
  }

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [STRIP_RULE_ID, ALLOW_RULE_ID],
    addRules: rules,
  });
}

chrome.runtime.onInstalled.addListener(syncRules);
chrome.runtime.onStartup.addListener(syncRules);
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync') syncRules();
});
