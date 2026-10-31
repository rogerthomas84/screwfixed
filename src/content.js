// Runs on screwfix.com/stores/* pages. If the URL identifies a single store
// (e.g. /stores/AB1/anytown), offer a button to save it as the user's store.

(() => {
  const match = location.pathname.match(/^\/stores\/([A-Za-z]{1,3}[0-9]{1,4})(?:\/([^/?#]+))?\/?$/);
  if (!match) return;

  const storeId = match[1].toUpperCase();
  const storeSlug = match[2] || '';

  const button = document.createElement('button');
  button.className = 'screwfixed-save';
  document.body.appendChild(button);

  function render(savedId) {
    if (savedId === storeId) {
      button.textContent = `✓ ${storeId} is your Screwfixed store`;
      button.disabled = true;
    } else {
      button.textContent = `Set ${storeId} as my Screwfixed store`;
      button.disabled = false;
    }
  }

  button.addEventListener('click', async () => {
    await chrome.storage.sync.set({ storeId, storeSlug });
    render(storeId);
  });

  chrome.storage.sync.get({ storeId: '' }).then(({ storeId: saved }) => render(saved));
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.storeId) render(changes.storeId.newValue || '');
  });
})();
