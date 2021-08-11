# Hunt Jobs

This helps you to fetch and render Stackoverflow developer jobs feed on UI. Evrything is bundled into docker containers. So you don't need to worry about the nitty gritty of running this app. For tech stack and instructions how to run, see below -

## Prerequisites

Node.js v14.15+
Docker 20.10.7+

## Setup

Hunt-jobs comes with dockeer-enabled containers. Just run the command `docker-compose up` and then access the application on `localhost:3000` in your browser.
## Technology stack

- React
- Typescript
- Scss
- Express
- Node.js
- Docker

## Assumptions 

1. Right now `Apply` a job is just for demonstration purpose since there aren't any database involved to store the application status.
2. Stackoverflow RSS feed does not provide job type (Contract, Full time, Part time etc.) as of today. It only provides assitive information whether a job provides `remote` opportunity or not.
