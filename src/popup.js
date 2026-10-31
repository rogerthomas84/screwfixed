const DEFAULTS = { storeId: '', storeSlug: '', replaceTc: false };

const form = document.getElementById('form');
const storeIdInput = document.getElementById('storeId');
const replaceTcInput = document.getElementById('replaceTc');
const savedLabel = document.getElementById('saved');
const modeLabel = document.getElementById('mode');
const myStore = document.getElementById('myStore');
const myStoreLink = document.getElementById('myStoreLink');

function render({ storeId, storeSlug, replaceTc }) {
  storeIdInput.value = storeId;
  replaceTcInput.checked = replaceTc;
  replaceTcInput.disabled = !storeId;
  modeLabel.textContent = replaceTc && storeId ? `replaced with ${storeId}` : 'removed';

  myStore.hidden = !storeId;
  if (storeId) {
    myStoreLink.href = `https://www.screwfix.com/stores/${storeId}${storeSlug ? `/${storeSlug}` : ''}`;
  }
}

storeIdInput.addEventListener('input', () => {
  replaceTcInput.disabled = storeIdInput.value.trim() === '';
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const storeId = storeIdInput.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  const current = await chrome.storage.sync.get(DEFAULTS);
  const settings = {
    storeId,
    // The slug only belongs to the store it was captured with.
    storeSlug: storeId === current.storeId ? current.storeSlug : '',
    replaceTc: storeId !== '' && replaceTcInput.checked,
  };
  await chrome.storage.sync.set(settings);
  render(settings);
  savedLabel.hidden = false;
  setTimeout(() => { savedLabel.hidden = true; }, 1500);
});

chrome.storage.sync.get(DEFAULTS).then(render);
