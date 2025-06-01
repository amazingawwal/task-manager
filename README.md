# Task Manager CLI + HTTP API

A simple Node.js task manager app that supports both a command-line interface (CLI) and an HTTP API server for creating and managing tasks.

---

## Features

- Add, list, complete, and delete tasks from the CLI
- Save tasks to `tasks.json`
- Start an HTTP server to interact via browser or tools like Postman
- Lightweight and built with only Node.js (no external libraries required)

---

## Getting Started

## Sample Usage Examples
## Command Line Usage:
# Add a new task

node app.js add "Buy groceries" "Milk, bread, eggs"

# List all tasks

node app.js list

# Mark task as complete

node app.js complete 1

# Delete a task

node app.js delete 2

# Start HTTP server

node app.js server

## Expected Output Examples:
Adding a task:
✓ Task added successfully!

ID: 1, Title: "Buy groceries"

Listing tasks:
=== Your Tasks ===

[1] Buy groceries (Pending)

    Description: Milk, bread, eggs

    Created: 2025-05-27 10:30 AM 

[2] Learn Node.js (Completed ✓)

    Description: Complete the beginner tutorial

    Created: 2025-05-27 09:15 AM


# Start the HTTP Server
node app.js server

GET -'/' Welcome message

GET - '/tasks' All tasks as JSON

POST - '/tasks/  Add a new task with JSON body

# Note.
- Server is running on port 4000.
- The file test.rest can be used to test out the http requests.

---
# Project Structure

TASK-MANAGER/
├── app.js             # Main CLI + server logic
├── package.json       # node package
├── taskManager.js     # Task management module
├── tasks.json         # Task data (auto-generated)
├── test.rest          # RESTful API test file
└── README.md          # Project info
