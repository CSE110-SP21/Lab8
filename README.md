# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline?

`1. Within a Github action that runs whenever code is pushed`

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

No, because a unit test by itself is not enough to comprehensively test the entire messaging feature of the app. The "message" feature would be made up of multiple individual components that should each be unit tested, but you cannot test the whole "message" feature with just a unit test.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

Yes, because the feature is simple and small-scale enough to be tested individually. This feature would only rely on the length of the message to function, and its result can be clearly measured and defined.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

