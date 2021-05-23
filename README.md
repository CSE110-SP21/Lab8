# Lab8_Starter

## Team Members
Nada Galal
Siddharth Vohra


## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
1(A). Within a Github action that runs whenever code is pushed 

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
No, we would ideally not use a single unit test for the "message" feature since writing a message and sending a message are two seperate components and we would need to test them separately. 

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
Yes, we can use a unit test to check for max message length since it is a single unit and can be tested through a unit test.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
If Headless is set to true, our puppeteer tests will run without a broswer UI.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

