# Quick Quiz 2.0

This quiz application is an interactive web app that lets users test their knowledge by answering a series of multiple-choice questions. Each time the quiz starts, the questions are presented in a random order to provide a different experience while keeping the answer choices the same. As users progress through the quiz, they receive immediate feedback on whether their answers are correct or incorrect, their score is updated in real time, and the correct answer is highlighted when they make a mistake. At the end of the quiz, users can view their final score and restart the quiz to challenge themselves again. This app is a fun and engaging way to test their knowledge during downtime at work or at home.

## Project chosen for upgrade

Original project: **Unit 11: Quiz App**

Why I chose this project: I chose this project because I knew I could add meaningful improvements and upgrades that the original lacked and needed.

## How to use it

1. Open `final-project.html` in any modern web browser
2. Click on the dark mode toggle if you prefer that
3. Click on `Start Quiz`
4. Click which answer you believe is correct
5. Click `Next Question` to move on
6. After viewing the `Results Page`, click `Play Again` and `Start Quiz` afterwards for a second attempt


## Features

- **Multiple views:** Quiz switches between a Welcome screen, a Quiz, and a Results screen
- **Multiple choice questions:** General knowledge questions with multiple choice answers

## My upgrade

For this final version, I added: **Question Randomizer**

The randomizer switches up the order of the question on each subsequent attempt. I left the question order the same to prevent correct answers being marked as incorrect.

## Technologies and concepts used

This project uses:
- HTML for structure
- CSS for styling
- JavaScript for interactivity
- localStorage for the dark mode preference

JavaScript concepts from the course:
- Multi-view pattern
- Modular functions
- State management
- Arrays of objects
- forEach + createElement
- Event listeners
- Conditionals
- Guard clauses
- Template literals

## File structure

```
Final_Showcase/
├── final-project.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── README.md
└── (any other assets)
```

## What I learned

The most challenging part for me was breaking down longer functions into smaller ones, specifically what to separate into a single/smaller function and calling it in the original function. I am most proud of the randomizer function which adds a layer of replayability to the quiz. 


Created as the final project for the JavaScript Coding Specialist (JSCS) certification course at Pinellas Technical College.
