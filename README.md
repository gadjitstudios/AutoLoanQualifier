# Auto Loan Qualifier


## Prerequisites:


1. Nodejs installed



## Steps to RUN or BUILD


1. Create a project directory on your local machine


2. Open a terminal in the project's root directory


3. Clone the project from this Git Repository using the following cmd in the terminal:


    `git clone https://github.com/gadjitstudios/AutoLoanQualifier.git`


4. After cloning (and still in the project directory) run the following cmd n the terminal:


    `npm i` 


to pull in all of the dependencies.


5. After the dependencies have been install, you can run the project by entering:


    `npm start`


in the terminal (again you must be in the project's root directory); or, you can build the project by entering:


    `npm run-script build`


in the terminal.



## Design Retrospective and Explanation:


### Minimum Viable Product (MVP) Design


This iteration of the Auto Loan Qualifier is definitely in an MVP state. The project meets all of the basic requirements declared by the requirements doc. It uses off the self libraries for basic application functions, such as routing; and, it sticks to React standard practices, such as using controlled components (for forms used throughout the app). 


React stresses the ‘single responsibility’ principle, which basically states that a component should only be responsible for one thing. With this in mind, I have defined a structure to help maintain this principle. If you notice, the call to the “Mock Fetch” POST method has been abstracted into an api-service found in the services directory. The views directory contains only components that create a full web page, or a piece of a web page to present to the user. A view many contain a data file, which is responsible for providing data to the view component. In most cases, the data file will use the api-service to perform REST calls to the app’s API; it may also clean and or validate data. In this case, the AppHome and AppNewAccount components’ data files use the InputValidation-service to validate their forms. These same data files are responsible for handling error status redirects from their resulting api-service calls. If there was not a need to handle the redirects on an individual basis, this functionality could be moved into the api-service.


### Design Retrospective

This app was quickly designed and written in a relatively short period of time, and therefore, some shortcuts were taken; one of these shortcuts has security. Protection against common malicious practices, such as cross-site-scripting and sql injection were not taken into account. On this subject, password fields were not encrypted or masked, which should also be taken into account.

Private routing and authentication were also left out of this application. Users are freely able to navigate to any page by simply changing the url of the browser.

Lastly, error handling was another feature left out of this application. In general, this MVP is pretty stable using the InputValidation-service for cleaning data, however, this will not cover all potentially error-prone inputs. Common error checks, such as null checks, were also left out with the interest of time; as well as error redirects (such as a 404 page redirect). One feature that was added to aid in preventing some of these types of errors, was prop-type checking (using the prop-type library).

