# northstar-support-deflection-mvp


PROJECT OVERVIEW

The Northstar Support Deflection MVP is a lightweight self-service support website designed to help customers resolve common support questions without immediately requiring assistance from a human support agent.
The prototype uses guided decision-tree flows to direct customers toward appropriate answers based on the information they provide.
For this Minimum Viable Product (MVP), the system focuses on two common support categories:
📦 Order Status
🔄 Returns & Refunds
The prototype uses simulated/sample data rather than connecting to real Northstar customer, payment, shipping, or order-management systems.
The purpose of the MVP is to demonstrate how a self-service support experience could reduce repetitive support requests while providing customers with a clear route to human assistance when automated resolution is not possible.


PROJECT GOAL

The main goal of the project is to demonstrate a working self-service support experience that allows customers to obtain answers to common questions through guided interactions.
Instead of immediately contacting a support agent, a customer can:
Open the support website → select a support category → provide the required information → receive a result → contact human support if the issue cannot be resolved automatically.
The MVP is intentionally limited in scope so that the core customer journeys can be completed and demonstrated within the sprint.


PROBLEM STATEMENT

Customer support teams can receive large numbers of repetitive requests, including questions such as:
"Where is my order?"
"Has my order been delivered?"
"Can I return this item?"
"Is my item eligible for a refund?"
When these requests require manual handling individually, support staff may spend significant time responding to questions that could potentially be handled through a self-service system.
The Northstar Support Deflection MVP explores how a simple guided support website can provide customers with immediate answers to selected common questions while escalating unresolved cases to human support.


PROPOSED SOLUTION

The proposed solution is a self-service support website based on guided decision-tree flows.
The customer begins at the homepage and chooses the type of assistance they need.
This approach keeps the MVP simple and understandable while still demonstrating an end-to-end support experience.


MVP Scope

Included in the MVP
📦 1. Order Status
Customers can:
Select Order Status.
Enter an order number.
Submit the request.
Have the system check the simulated order dataset.
Receive the corresponding order status.
Receive a clear message if the order cannot be found.
Receive an option to contact human support when necessary.

🔄 2. Returns & Refunds

Customers can:
Select Returns & Refunds.
Enter their order number.
Provide the required item information.
Select or provide a return reason.
Submit the request.
Have the system evaluate the simulated return rules.
Receive an eligibility result.
Receive appropriate guidance.
Contact human support when automated resolution is not appropriate.


CUSTOMER SUPPORT FLOWS

i) Order Status Flow
Homepage
   ↓
   
Select "Order Status"
   ↓
   
Enter Order Number
   ↓
   
Click "Check Status"
   ↓
   
Validate Input
   ↓
   
Search Sample Order Data
   ↓
   
Is Order Found?

   ├── YES → Display Order Status
   
   │
   
   └── NO → Display "Order Not Found"
                  ↓
             Contact Support
             

ii) Returns & Refunds Flow

Homepage
   ↓
   
Select "Returns & Refunds"
   ↓
   
Enter Order Number
   ↓
   
Provide Item
   ↓
   
Select Return Reason
   ↓
   
Click "Check Eligibility"
   ↓
   
Validate Information
   ↓
   
Check Sample Return Rules
   ↓
   
Is Return Eligible?

   ├── YES → Display Return Instructions
   
   │
   
   └── NO → Explain Ineligibility
                  ↓
             Contact Support


Technology Stack👩‍💻👨‍💻

The MVP is intentionally built using simple technologies suitable for a lightweight prototype.
Technology.         Purpose

HTML................Structure of the website


CSS.................Layout, styling and visual presentation

JavaScript..........User interaction, decision logic and validation

JSON / JavaScript...Simulated order and return information

GitHub..............Source-code repository and version control

GitHub Projects.....Task management and sprint tracking

Google Docs.........Project planning, requirements, testing and documentation


File Responsibilities

i) index.html

Contains the structure of the website, including:

Homepage,
Support-category options,
Order Status interface,
Returns & Refunds interface,
Input fields,
Buttons,
Result areas

ii) style.css

Controls the visual presentation of the website, including:

Layout,
Spacing,
Typography,
Buttons,
Forms,
Responsive presentation,
Error/success messages

iii) script.js

Controls the interactive behaviour of the application, including:
Navigation,
Input validation,
Order lookup,
Return eligibility checking,
Decision-tree logic,
Result messages,
Human-support escalation

iv) data/orders.json

Contains simulated order information used by the Order Status flow.

v) data/returns.json

Contains simulated return/eligibility information used by the Returns & Refunds flow.
README.md
Contains information about the project, setup instructions, scope, testing, limitations and future improvements.

vi) Backend

Responsible for handling the application's server-side logic and providing the API services required by the frontend. It manages order-status lookups, processes requests from the frontend, retrieves the relevant data, returns expected results, and handles errors such as invalid or unavailable orders.

The backend is built using Node.js and Express and includes the necessary configuration and dependencies for running the API locally. It also enables communication between the frontend and backend through API endpoints.


DECISION LOGIC

The MVP uses straightforward rules to determine the appropriate response.
i) Order Status

Conceptually:

IF order number is empty → Ask customer to enter an order number

ELSE IF order number exists → Display the corresponding order status

ELSE → Display "Order Not Found" → Provide Contact Support option

ii) Returns & Refunds

Conceptually:

IF required information is missing → Ask customer to provide the missing information

ELSE IF item is eligible → Display return eligibility and guidance

ELSE IF item is not eligible → Explain that the item is not currently eligible

ELSE → Provide Contact Support option


Human Support Escalation

The MVP is not intended to solve every possible customer problem.
When the self-service flow cannot provide an appropriate answer, the system should clearly communicate that the customer can seek human assistance.

Example:
We're unable to resolve this request automatically.
Please contact Northstar Support for further assistance.

[ Contact support ]




******** HOW TO SET UP THE PROJECT *******
Prerequisites
A person running the project should have:
Git
Node.js
npm
A web browser
Access to the GitHub repository

Step 1 — Clone the repository
Open Git Bash or another terminal and run:
git clone [GITHUB_REPOSITORY_URL]
Then enter the project:
cd northstar-support-deflection-mvp

Step 2 — Enter the backend directory
cd backend

Step 3 — Install backend dependencies
Run:
npm install
This installs the dependencies defined in package.json.

***** HOW TO RUN THE PROJECT*****
Step 1 — Start the backend
From the backend directory, run the backend using the command confirmed by the final package.json.
For example, if the repository uses a development script:
npm run dev
If it does not have a dev script, use the actual command configured in the repository, such as:
node server.js
When the backend starts successfully, it should display its local server address in the terminal.
For your current setup, you have previously confirmed that the API runs on:
http://localhost:5001

Step 2 — Open the frontend
Open the project's frontend through the method documented and tested by the team BY:

Option 1 — Open Locally

Clone or download the repository.

Then open:index.html in a modern web browser.

Option 2 — Use a Local Development Environment

A developer can open the project using a code editor such as Visual Studio Code.
The project files can then be edited and tested locally in a browser.
The frontend should then communicate with the running backend API.
Important
The backend must remain running while testing features that depend on the API.




TESTING

Testing focuses on determining whether the MVP behaves according to its defined requirements.
The main test areas are:

i) Order Status

Valid order number, 

Different order statuses, 

Unknown order, 

Empty input, 

Invalid input

ii) Returns & Refunds

Eligible return, 

Ineligible return, 

Missing order number, 

Missing item information, 

Missing return reason, 

Human-support escalation



MVP SUCCES CRITERIA

The MVP is considered successful when the following can be demonstrated:

[ ] A customer can open the Northstar Support website.  

[ ] A customer can select Order Status.  

[ ] A valid sample order produces the correct simulated status.

[ ] An unknown order produces a clear error message.  

[ ] Missing input is handled appropriately.  

[ ] A customer can select Returns & Refunds.  

[ ] An eligible return produces the correct result.  

[ ] An ineligible return produces the correct result.  

[ ] Missing return information is handled appropriately.  

[ ] An unresolved case provides a human-support option.  

[ ] Both complete customer journeys can be demonstrated from the homepage to the final response.  

[ ] The application does not depend on real customer or production data.  




🚫 Out of Scope

To keep the project within the MVP scope, the following are not initially included:

❌ AI chatbot, 

❌ Generative AI, 

❌ Real customer accounts, 

❌ User authentication, 

❌ Real payment processing, 

❌ Real refunds, 

❌ Real shipping API, 

❌ Production order-management integration, 

❌ Production customer database, 

❌ Live inventory/stock availability, 

❌ Advanced analytics, 

❌ Full commercial customer-support platform



⚠️ Known Limitations

The prototype has several deliberate limitations.

1. Simulated Data -> The system uses fictional/sample data rather than real Northstar records.
Therefore, an order status displayed by the prototype does not represent a real customer's order.

2. No Production Integration -> The MVP does not connect to:
Northstar's order-management system, 
Shipping providers, 
Payment systems, 
Customer databases

3. Limited Support Categories-> Only two support categories are implemented:
i) Order Status
ii) Returns & Refunds

4. Rule-Based Logic-> The system uses predefined decision rules rather than AI or machine learning.
   
5. Prototype-Level Support Escalation-> The Contact Support functionality represents the escalation path in the prototype. It does not necessarily create a real support ticket unless such functionality is specifically implemented.




Data and Privacy

No real customer information should be stored in this prototype.
All sample orders, customer scenarios and return information should be fictional.
The project should not contain:
Real customer names, 
Real addresses, 
Real phone numbers, 
Real payment information, 
Real passwords, 
Production credentials, 
API keys or other secrets



Development Workflow

The team follows a simple development workflow:
Requirement
     ↓
     
Task created
     ↓
     
Task assigned
     ↓
     
Development
     ↓
     
GitHub commit / Pull Request
     ↓
     
Review
     ↓
     
Testing
     ↓
     
Fix if necessary
     ↓
     
Retest
     ↓
     
Task marked DONE




Future Improvements

If the prototype were developed beyond the MVP, possible improvements could include:

Phase 2

Add Stock Availability support.

Add additional support categories.

Improve responsive/mobile design.

Add richer customer guidance.

Improve accessibility.


Phase 3

Add a secure backend.

Connect to a real order-management system.

Integrate with shipping providers.

Implement secure customer authentication.

Connect to a real support-ticket system.


Phase 4

Add analytics to measure support deflection.

Identify frequently unresolved customer issues.

Introduce more advanced automation.

Consider an AI-assisted support experience where appropriate.

These improvements are future possibilities, not features claimed to exist in the current MVP.



Current Project Status

Project: Northstar Support Deflections MVP

Approach: Self-Service Support Website

Interaction Model: Guided / Decision-Tree Flows

Supported Categories: Order Status + Returns & Refunds

Data: Simulated Sample Data

Frontend: HTML, CSS and JavaScript

Repository: GitHub

Project Management: GitHub Projects

Documentation: Google Docs

Current Status: In Development


Project Disclaimer⚠️⚠️

This project is an educational MVP prototype developed as part of the Northstar Sprint.
The order information, return scenarios and other customer data used within the prototype are simulated and should not be interpreted as real Northstar customer or operational data.
The prototype is intended to demonstrate the concept, workflow and technical feasibility of a self-service support experience rather than serve as a production customer-support system.


***** HOW TO SET UP THE PROJECT*****
Prerequisites
A person running the project should have:
Git
Node.js
npm
A web browser
Access to the GitHub repository

Step 1 — Clone the repository
Open Git Bash or another terminal and run:
git clone [GITHUB_REPOSITORY_URL]
Then enter the project:
cd northstar-support-deflection-mvp

Step 2 — Enter the backend directory
cd backend

Step 3 — Install backend dependencies
Run:
npm install
This installs the dependencies defined in package.json.

17. HOW TO RUN THE PROJECT
Step 1 — Start the backend
From the backend directory, run the backend using the command confirmed by the final package.json.
For example, if the repository uses a development script:
npm run dev
If it does not have a dev script, use the actual command configured in the repository, such as:
node server.js
The README should contain the exact command that has been tested successfully by the team.
When the backend starts successfully, it should display its local server address in the terminal.
For your current setup, you have previously confirmed that the API runs on:
http://localhost:5001

Step 2 — Open the frontend
Open the project's frontend through the method documented and tested by the team.
The frontend should then communicate with the running backend API.
Important
The backend must remain running while testing features that depend on the API.
