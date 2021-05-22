# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter) </br>
<strong>1</strong>
2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user. </br>
</br>
<strong>No. Since the "message" feature may conclude sending message feature and receiving message feature. Unit testing cannot test how these individual components interact with each other on an feature level. Otherwise, the "message" feature is too big for unit testing to test. </strong>

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters</br>
</br>
<strong>Yes. Since the 'max message length' feature is in a small scale. It can be exected quickly and changing other app features likely won't affect the non-related unit tests.</strong>

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

