# Employee Time-Off Request Automation

## Project Overview

This project is an automated Employee Time-Off Request system.

Employees submit a time-off request through a web form built with Next.js. The form sends the request to an n8n workflow through a webhook.

The n8n workflow validates the request, checks employee and department information, applies business rules, processes the decision, updates the leave balance when required, and sends an email notification.

## Technologies Used

- Next.js
- React
- TypeScript
- n8n
- n8n Data Tables
- Webhooks
- SMTP Email
- Git
- GitHub

## How the System Works

Employee Time-Off Form
        ↓
n8n Webhook
        ↓
Validate Request
        ↓
Find & Verify Employee
        ↓
Check Employee Status
        ↓
Check for Duplicate Requests
        ↓
Find Department
        ↓
Apply Policy Rules
        ↓
Emergency Request?
        ↓
Automatic Decision OR Human Review
        ↓
Prepare Final Record
        ↓
Save Final Decision
        ↓
Update Leave Balance if Required
        ↓
Send Final Decision Email

## Main Features

### 1. Employee Request Form

The employee enters:

- Employee ID
- Department ID
- Start Date
- End Date
- Request Type
- Reason

The frontend also checks that the end date is not before the start date.

### 2. Webhook Integration

The Next.js application sends the request to an n8n webhook using an HTTP POST request.

### 3. Request Validation

The workflow validates the submitted information before processing the request.

Examples include:

- Employee ID is required
- Department ID is required
- Dates must be valid
- End date cannot be before the start date
- Request type must be valid
- Emergency requests require a reason

### 4. Employee Verification

The workflow checks employee information and determines whether the employee is eligible for further processing.

### 5. Duplicate Detection

The workflow checks existing requests to help prevent the same time-off request from being processed multiple times.

### 6. Policy Rules

Business rules are applied to determine whether the request can be processed automatically or requires additional review.

### 7. Human Review

Requests requiring manual review can be routed for an HR or manager decision.

### 8. Leave Balance

For applicable approved requests, the workflow updates the employee's leave balance.

### 9. Email Notifications

The system uses SMTP email nodes to send notifications such as:

- Invalid request notification
- Emergency approval email
- Final decision email

## Project Structure

```text
time-off-request-app/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── n8n-workflow/
│   └── Time-Off Request Workflow.json
│
├── public/
├── package.json
└── README.md