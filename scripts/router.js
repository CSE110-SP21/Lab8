// router.js
export const router = {};

const body = document.body;
const headerText = document.querySelector('header > h1');
let main = document.querySelector('main');
let singleEntry = document.querySelector('entry-page');

/**
 * Set the state for the new page
 * @param {string} state The new page to set the state of
 * @param {boolean} statePopped If the request came from a popstate event
 * @param {number} entryNum if state is 'entry', then entryNum is the num
 */
router.setState = (state, statePopped, entryNum) => {
  switch (state) {
    case 'settings':
      entryPage(false);
      settingsPage(true);
      break;
    case 'entry':
      entryPage(true, entryNum);
      break;
    default:
      homePage();
  }

  if(!statePopped && window.location.hash != `#${state}`) {
    pushToHistory(state, entryNum);
  }
}

/**
 * @param {boolean} goTo true if you are going to this page, false if unsetting the page
 */
function settingsPage(goTo) {
  if (goTo) {
    body.classList.add('settings');
    headerText.innerHTML = 'Settings';
  } else {
    body.classList.remove('settings');
    headerText.innerHTML = 'Journal Entries';
  }
}

/**
 * 
 * @param {boolean} goTo  true if you are going to this page, false if unsetting the page
 * @param {number} entryNum if goTo is true, number of the entry to render
 */
function entryPage(goTo, entryNum) {
  if (goTo) {
    body.classList.remove('settings');
    singleEntry.parentNode.removeChild(singleEntry);
    singleEntry = document.createElement('entry-page');
    body.classList.add('single-entry');
    headerText.innerHTML = `Entry ${entryNum}`;
    singleEntry.entry = Array.from(document.querySelector('main').childNodes)[entryNum - 1].entry;
    main.insertAdjacentElement('afterend', singleEntry);
  } else {
    body.classList.remove('single-entry');
    headerText.innerHTML = 'Journal Entries';
  }
}

/**
 * Removes any other set pages and goes back to home page
 */
function homePage() {
  settingsPage(false);
  entryPage(false);
}

/**
 * Push a new state to the history stack
 * @param {string} state The new page to set the state of
 * @param {number} entryNum if state is 'entry', then entryNum is the num
*/
export function pushToHistory(state, entryNum) {
  switch (state) {
    case 'settings':
      history.pushState({ page: 'settings' }, '', './#settings');
      break;
    case 'entry':
      history.pushState({ page: `entry${entryNum}` }, '', `./#entry${entryNum}`);
      break;
    default:
      history.pushState({}, '', './');
  }
  return history;
}