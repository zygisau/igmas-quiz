This is a markdown file that outlines various tasks to be completed to make a quiz app.

# Quiz App Development Tasks

A quiz app should communicate with server in a way that it would not be possible to cheat by inspecting network requests or assets.
1. Implement server-side validation for quiz answers.
    - Server should return html page with question and possible answers.
    - When user selects an answer, client should send answer id to server for validation.
    - Server should respond with whether the answer is correct or not.
