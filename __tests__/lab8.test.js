import { expect, it } from "@jest/globals";
import { url } from "inspector";

//global.document = jsdom();

describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”

    await page.click('journal-entry');
    
    const url = await page.evaluate("document.URL");

    expect(url).toContain('/#entry1');

  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 

    const title = await page.evaluate("document.querySelector('h1').innerText");
    
    expect(title).toBe('Entry 1');

  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {

    const sroot = await page.evaluate("document.querySelector('entry-page').shadowRoot");

    const title = await page.evaluate("document.querySelector('entry-page').shadowRoot.querySelector('.entry-title').innerText");
    const date = await page.evaluate("document.querySelector('entry-page').shadowRoot.querySelector('.entry-date').innerText");
    const cont = await page.evaluate("document.querySelector('entry-page').shadowRoot.querySelector('.entry-content').innerText");
    const src = await page.evaluate("document.querySelector('entry-page').shadowRoot.querySelector('img').src");
    const alt = await page.evaluate("document.querySelector('entry-page').shadowRoot.querySelector('img').alt");

    expect(title).toBe('You like jazz?');
    expect(date).toBe('4/25/2021');
    expect(cont).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
    expect(src).toBe('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');
    expect(alt).toBe('bee with sunglasses');

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’

    const cls = await page.evaluate("document.querySelector('body').className");

    expect(cls).toEqual("single-entry");

  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”

    await page.click('img');

    const url = await page.evaluate("document.URL");

    expect(url).toContain('/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”

    await page.click('img');

    const title = await page.evaluate("document.querySelector('header h1').innerText");

    expect(title).toBe('Settings');

  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’

    await page.click('img');

    const cls = await page.evaluate("document.querySelector('body').className");

    expect(cls).toEqual("settings");

  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’

    await page.evaluate('history.back()');

    const url = await page.evaluate('document.URL');

    expect(url).toContain('/#entry1');

  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('test11: Clicking the back button once should bring the user back to the home page', async() => {
    
    
    await page.evaluate('history.back()');

    const url = await page.evaluate('document.URL');

    expect(url.indexOf("#")).toBe(-1);
    
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('test12: When the user is on the homepage, the header title should be “Journal Entries”', async() => {

    const title = await page.evaluate("document.querySelector('header h1').innerText");

    expect(title).toBe('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('test13: On the home page the <body> element should not have any class attribute', async() => {

    const len = await page.evaluate("document.querySelector('body').classList.length");

    expect(len).toBe(0);
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it ('test14: Verify the url is correct when clicking on the second entry', async() => {

    //const je = await page.$$('jounral-entry')[1];

    await page.click('journal-entry:nth-child(2)');

    const url = await page.evaluate('document.URL');

    expect(url).toContain('/#entry2');
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('test15: Verify the title is current when clicking on the second entry', async () => {

    expect(await page.evaluate("document.querySelector('h1').innerText")).toBe('Entry 2');
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('test16: Verify the entry page contents is correct when clicking on the second entry', async () => {

    const sroot = await page.evaluate("document.querySelector('entry-page').shadowRoot");

    const title = await page.evaluate("document.querySelector('entry-page').shadowRoot.querySelector('.entry-title').innerText");
    const date = await page.evaluate("document.querySelector('entry-page').shadowRoot.querySelector('.entry-date').innerText");
    const cont = await page.evaluate("document.querySelector('entry-page').shadowRoot.querySelector('.entry-content').innerText");
    const src = await page.evaluate("document.querySelector('entry-page').shadowRoot.querySelector('img').src");
    const alt = await page.evaluate("document.querySelector('entry-page').shadowRoot.querySelector('img').alt");

    expect(title).toBe('Run, Forrest! Run!');
    expect(date).toBe('4/26/2021');
    expect(cont).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
    expect(src).toBe('https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg');
    expect(alt).toBe('forrest running');

  }, 10000);

  // create your own test 17
  it('test17: Verify that clicking on the title returns the user to the homepage from an entry', async () => {
  
    await page.click('h1');

    const bclass = await page.evaluate("document.querySelector('body').classList.length");

    expect(bclass).toBe(0);
  });

  // create your own test 18
  it('test18: Verify that clicking on the title returns the user to the homepage from the settings menu', async () => {
  
    await page.click('img');
    
    await page.click('h1');

    const bclass = await page.evaluate("document.querySelector('body').classList.length");

    expect(bclass).toBe(0);
  });

  // create your own test 19
  it('test19: Verify that clicking on the title from the home screen does not change pages', async () => {
  
    await page.click('h1');

    const bclass = await page.evaluate("document.querySelector('body').classList.length");

    expect(bclass).toBe(0);
  });

  // create your own test 20
  it('Test20: Clicking the back button from settings should return the user to entry 1', async() => {

    await page.click('journal-entry');
    await page.click('img');

    await page.evaluate("history.back()");

    const url = await page.evaluate("document.URL");

    expect(url).toContain('/#entry1');

  });
});
