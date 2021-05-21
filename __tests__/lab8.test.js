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
    const entries = await page.$$('journal-entry');
    const [response] = await Promise.all([
      page.waitForNavigation(),
      entries[0].click(),
    ]);
    let url = await page.url();
    expect(url).toMatch(/\/#entry1/);
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    const headTitle = await page.$eval('header h1', e => e.innerText);
    expect(headTitle).toMatch('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    let expEntry = {
      'title': 'You like jazz?',
      'date': '4/25/2021',
      'content': "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      'image': {
        'src': 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
        'alt': 'bee with sunglasses'
      }
    }
    let actualEntry = await page.$eval('entry-page', e => e.entry);
    expect(actualEntry).toEqual(expEntry);
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    const bodyClass = await page.$eval('body', e => e.className);
    expect(bodyClass).toMatch('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    const [response] = await Promise.all([
      page.waitForNavigation(),
      page.click('header img'),
    ]);
    let url = await page.url();
    expect(url).toMatch(/\/#settings/);
  });

  it('Test8: On Settings page - checking page header title', async () => {
    const headTitle = await page.$eval('header h1', e => e.innerText);
    expect(headTitle).toMatch('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    const bodyClass = await page.$eval('body', e => e.className);
    expect(bodyClass).toMatch('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    await page.goBack();
    let url = await page.url();
    expect(url).toMatch(/\/#entry1/);
  });

  it('Test11: Clicking the back button, should go back to home page URL', async() => {
    await page.goBack();
    let url = await page.url();
    expect(url).toMatch('http://127.0.0.1:5500');
  });

  it('Test12: On home page - checking page header title', async () => {
    const headTitle = await page.$eval('header h1', e => e.innerText);
    expect(headTitle).toMatch('Journal Entries');
  });

  it('Test13: On home page - checking <body> element classes', async () => {
    const bodyClass = await page.$eval('body', e => e.className);
    expect(bodyClass).toMatch('');
  });

  it('Test14: Clicking second <journal-entry>, new URL should contain /#entry2', async () => {
    const entries = await page.$$('journal-entry');
    const [response] = await Promise.all([
      page.waitForNavigation(),
      entries[1].click(),
    ]);
    let url = await page.url();
    expect(url).toMatch(/\/#entry2/);
  });

  it('Test15: On second Entry page - checking page header title', async () => {
    const headTitle = await page.$eval('header h1', e => e.innerText);
    expect(headTitle).toMatch('Entry 2');
  });

  it('Test16: On second Entry page - checking <entry-page> contents', async () => {
    let expEntry = {
      'title': 'Run, Forrest! Run!',
      'date': '4/26/2021',
      'content': "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      'image': {
        'src': 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
        'alt': 'forrest running'
      }
    }
    let actualEntry = await page.$eval('entry-page', e => e.entry);
    expect(actualEntry).toEqual(expEntry);
  }, 10000);

  it('Test17: Clicking page header, should go back to home page URL', async () => {
    const head = await page.$('header h1');
    const [response] = await Promise.all([
      page.waitForNavigation(),
      head.click(),
    ]);
    let url = await page.url();
    expect(url).toMatch('http://127.0.0.1:5500');
  });

  it('Test18: Clicking fourth <journal-entry>, new URL should contain /#entry4', async () => {
    const entries = await page.$$('journal-entry');
    const [response] = await Promise.all([
      page.waitForNavigation(),
      entries[3].click(),
    ]);
    let url = await page.url();
    expect(url).toMatch(/\/#entry4/);
  });

  it('Test19: On fourth Entry page - checking page header title', async () => {
    const headTitle = await page.$eval('header h1', e => e.innerText);
    expect(headTitle).toMatch('Entry 4');
  });

  it('Test20: On fourth Entry page - checking <entry-page> contents', async () => {
    let expEntry = {
      'title': "You're a wizard, Harry",
      'date': '4/28/2021',
      'content': "Hmm, difficult. VERY difficult. Plenty of courage, I see. Not a bad mind, either. There's talent, oh yes. And a thirst to prove yourself. But where to put you? Not Slytherin. Not Slytherin. Not Slytherin, eh? Are you sure? You could be great, you know. It's all here in your head. And Slytherin will help you on the way to greatness, there's no doubt about that. No? Please, please. Anything but Slytherin, anything but Slytherin. Well if you're sure, better be... GRYFFINDOR!",
      'image': {
        'src': 'https://w7w5t4b3.rocketcdn.me/wp-content/uploads/2019/01/harry-potter-sorting-hat-wrong.jpg',
        'alt': 'harry looking up at the sorting hat'
      },
      'audio': 'https://drive.google.com/uc?export=download&id=1Orwnly-OMhNt83tb-SAWt6Y3S6AYQgkk'
    }
    let actualEntry = await page.$eval('entry-page', e => e.entry);
    expect(actualEntry).toEqual(expEntry);
  }, 10000);
  
});
