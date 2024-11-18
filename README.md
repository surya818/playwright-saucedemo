<h1> Playwright UI Test Automation </h1>
<h3>Run saucedemo Web UI tests written in typescript playwright</h3>
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
	</br>1. Clone this repository
	</br>2. Navigate inside the directory
	</br>3. RUN => npm install This will install all dependancies needed for playwright and uor tests
	</br>4. RUN => npx playwright test This will start our UI test execution. I have enabled the tests to be headed, and tests will be run in Chromium as I disabled the config for other browsers
	</br>5. You can access test reports in playwright-report directory
	

</br>**2nd way:** Running the tests in a docker container. Pre-requisite is that your have docker installed on your machine. Advantage is that this can be used to run the tests inside a container and you dont have to worry </br>about the nodejs and playwright setup. Plus, this could be reused if we want to run tests inside a kubernetes self managed cluster hosts.
	</br>1. Clone this repository
	</br>2. Navigate inside the directory
	</br>3. RUN => npm install This will install all dependancies needed for playwright and uor tests
	</br>4. RUN => npx playwright test This will start our UI test execution. I have enabled the tests to be headed, and tests will be run in Chromium as I disabled the config for other browsers
	</br>5. You can access test reports in playwright-report directory
	
</br>**3rd way:** I also created a Github action for the test, which has been run successfully and creates a test report that you can download and the test results run in a github managed agent and the results can be viewed </br>instantly. I could show this in demo

<ul style="list-style-type: circle;">
  <li>I used Page object model. So, the pages inside e2e > pages directory are our Pages, that encapsulate all the selectors and UI actions related to that web page.</li>
  <li>For framework, I directly used Playwright's methods in this effort. I also created framework code which has UIActions interface which defines some sample actions and an implementing PlayWrightActions class that </br>implements all the actions. I have used just one test for demoing this approach. 
</li>
  <li> Finally. the tests are inside tests directory, which uses Page object instances and methods to make neccesary UI actions. I also added lot of verifications and asserts</li>
</ul>
</p>
</br><h2>Source and Framework:</h2>
</br>
</br> </br>




![image](https://github.com/user-attachments/assets/8b7c8d16-ec42-467d-99bf-fa3e451c2a4a)

