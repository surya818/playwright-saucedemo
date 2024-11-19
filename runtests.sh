#! /bin/bash
npx playwright install
npm install
xvfb-run npx playwright test
