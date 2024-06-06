# Shopping List Manager


## Table of Contents

- [Overview](#overview)
- [Deployed Page](#deployed-page)
- [GitHub Repo](#github-repo)
- [Technologies Used](#technologies-used)
- [Development Process](#development-process)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)
- [Screenshots](#screenshots)
- [Live Demo](#live-demo)

## Overview

The Shopping List Manager is a web application that allows users to manage a shopping list. Users can add, delete, and mark items as important. They can also move items from a "To Buy" list to a "Previously Bought" list, and copy items back to the "To Buy" list with incremented quantities.

## Deployed Page

[Visit Page](https://groceryshopping-list.netlify.app/)

## GitHub Repo

[GitHub Repo](https://github.com/Aysegulozen/Shopping-List)

## Technologies Used

**React:** Used for building the user interface as a single-page application, providing a smooth and responsive user experience.
- **.NET Core:** The backend API, responsible for handling data management and business logic, ensuring robust and scalable server-side operations.
- **Flowbite React:** Pre-styled UI components from Flowbite, built with React, which helped in speeding up the development process.
- **Google Authentication:** Implemented for user login and management, allowing secure and easy access control.
- **Tailwind CSS:** Utility-first CSS framework used for styling, enabling the creation of a responsive and modern design with minimal custom CSS.
- **Node.js:** The JavaScript runtime used for developing and running the frontend build tools.
- **npm (Node Package Manager):** Used for managing project dependencies and running scripts to streamline development tasks.
- **Fetch API:** Used for making HTTP requests from the React frontend to the .NET Core backend, facilitating data exchange between the client and server.

## Development Process

1. **Planning:** Defined the tasks and broke them down into manageable parts.
2. **Setup:** Initialized the project with React and .NET Core, set up the development environment.
3. **Frontend Development:** Built the user interface with React and Flowbite React components.
4. **Backend Development:** Created the .NET Core API for managing shopping list data.
5. **Integration:** Connected the frontend and backend, implemented Google Authentication.
6. **Testing:** Tested the application thoroughly to ensure all features work as expected.

## Getting Started

To clone and run this application locally, follow these steps:
### Clone the repository:
   - git clone /repository-url/
### Backend (.NET Core API)
   - git clone <repository-url>
   - cd Shopping-List/server
   - dotnet run
### Frontend (React Application)
   - cd Shopping-List/client
   - npm install
   - npm start

## Usage

- **Add Items:** Enter item details in the form and click "Add Item" to add a new item to the "To Buy" list.
- **Mark as Important:** Click the star icon next to an item to mark it as important. Important items will move to the top of the list.
- **Mark as Bought:** Click the check icon next to an item to move it to the "Previously Bought" list.
- **Move Items:** Use the arrow icons to move items up and down in the "To Buy" list.
- **Copy Items:** Click the plus icon next to an item in the "Previously Bought" list to copy it back to the "To Buy" list.

## License

This project is licensed under the MIT License 

## Screenshots

![SignUp](./client/src/assets/images/signup-Screenshot%20.png)
![Home](./client/src/assets/images/homepage-Screenshot%20.png)

## live-demo
[Watch the Walkthrough Video](https://drive.google.com/file/d/1Jm2PpsdUsENU3zNaTgdcfKPZ3s8d3HRH/view?usp=sharing)







