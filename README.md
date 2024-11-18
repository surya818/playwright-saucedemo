<h1> Playwright UI Test Automation </h1>
<h3>Run saucedemo Web UI tests written in typescript playwright<h3>
</br>
<p>Playwright Typescript Test Automation framework to test saucedemo web application
</br>
**Tech Stack:**
</br>Language: Typescript
</br>Framework: Playwright
</br>Nodejs

</br>The whole setup is containerized. The dockerfile has everything needed for setting up the Nodejs environemnt and run browser based (headed) tests
</br>**We could run the tests in 3 ways**
</br>******1st way:** Running the tests locally, on your machine which has nodejs and npm pre-installed
	1. Clone this repository
	2. Navigate inside the directory
	3. RUN => npm install This will install all dependancies needed for playwright and uor tests
	4. RUN => npx playwright test This will start our UI test execution. I have enabled the tests to be headed, and tests will be run in Chromium as I disabled the config for other browsers
	5. You can access test reports in playwright-report directory
	

</br>**2nd way:** Running the tests in a docker container. Pre-requisite is that your have docker installed on your machine. Advantage is that this can be used to run the tests inside a container and you dont have to worry about the nodejs and playwright setup. Plus, this could be reused if we want to run tests inside a kubernetes self managed cluster hosts.
	1. Clone this repository
	2. Navigate inside the directory
	3. RUN => npm install This will install all dependancies needed for playwright and uor tests
	4. RUN => npx playwright test This will start our UI test execution. I have enabled the tests to be headed, and tests will be run in Chromium as I disabled the config for other browsers
	5. You can access test reports in playwright-report directory
	
</br>**3rd way:** I also created a Github action for the test, which has been run successfully and creates a test report that you can download and the test results run in a github managed agent and the results can be viewed instantly. I could show this in demo


</p>
