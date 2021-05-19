// script.js

import { router } from './router.js';

const headerText = document.querySelector('header > h1');
const settings = document.querySelector('header > img');

// When the back button is hit, set the state with the new page
window.addEventListener('popstate', e => {
  if (e.state?.page && e.state.page.startsWith('entry')) {
    router.setState('entry', true, Number(e.state.page.substr(5,e.state.page.length)));
  } else {
    router.setState(e.state?.page, true);
  }
});

// Go to header page when header button is clicked
headerText.addEventListener('click', () => {
  router.setState('home', false);
});

// Go to settings page when settings button is clicked
settings.addEventListener('click', () => {
  router.setState('settings', false);
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.addEventListener('click', () => {
          let numEntry = Array.from(document.querySelector('main').childNodes).indexOf(newPost);
          router.setState('entry', false, numEntry + 1);
        });
        document.querySelector('main').appendChild(newPost);
      });
    });
});
