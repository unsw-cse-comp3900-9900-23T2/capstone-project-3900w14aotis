
# Otis

A structured yet user-friendly task manager that provides a centralised platform for efficient prioritisation, collaboration and comprehensive visibility.



## Background Information

### Environment Files
For our codebase, we use two .env  files to configure our application - one located within the backend directory and one within the frontend directory. These files contain sensitive information on connecting to our Firestore database. Our team chose a Firestore membership level that allows us to perform 50K reads per day which can be comfortably used when carrying out simple functionalities within Otis. For more complex interactions or prolonged use of Otis, more than 50K reads may be made which would result in our database exceeding the limit. In these instances, we have provided a second Firestore database to be used which can be accessed in both frontend and backend .env  files. Simply uncomment the previously commented configurations and comment out the previously uncommented configurations to switch between databases. Note that the data within one database cannot be transferred to the other database and any projects, tasks and profiles would need to be recreated in the new database.

### Backend
Our backend  .env  file contains information such as our Firestore project ID as well as the private key required to access this database. Additionally, it contains the client email, ID and URL as well as the web API key. This is a slightly larger file than the frontend  .env  file. All configurations were generated upon creating our Firestore database and are necessary when using the database. Note that this file exists within our .gitignore  file and is not available within our GitHub repository.

### Frontend
Our frontend .env  file contains similar configurations such as our Firestore project ID and web API key but also contains information such as our app authentication domain, storage bucket, and message sender ID.


## Setup Instructions

### Pre-installation checklist

- **You have cloned the repository:**
    - git clone https://github.com/unsw-cse-comp3900-9900-23T2/capstone-project-3900w14aotis.git 

- **You have added the backend .env file to the backend directory:**
    - backend/.env

- **You have added the frontend .env file to the frontend directory:**
    - frontend/.env

- **You have successfully installed docker, download links below:**
    - Windows OS: 
        - https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module&_gl=1*1ma06bu*_ga*MTk3MjE2MjY5NS4xNjkwMDQ2MTM4*_ga_XJWPQMJYHQ*MTY5MTEzMTYxNy40LjEuMTY5MTEzMTYxNy42MC4wLjA.
    - MacOS Intel Chip: 
        - https://desktop.docker.com/mac/main/amd64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module&_gl=1*9t552s*_ga*MTk3MjE2MjY5NS4xNjkwMDQ2MTM4*_ga_XJWPQMJYHQ*MTY5MTEzMTYxNy40LjEuMTY5MTEzMTYxNy42MC4wLjA.
    - MacOS Apple Chip: 
        - https://desktop.docker.com/mac/main/arm64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module&_gl=1*9t552s*_ga*MTk3MjE2MjY5NS4xNjkwMDQ2MTM4*_ga_XJWPQMJYHQ*MTY5MTEzMTYxNy40LjEuMTY5MTEzMTYxNy42MC4wLjA.
    - Linux OS: 
        - https://docs.docker.com/desktop/linux/install/?_gl=1*jsz5m6*_ga*MTk3MjE2MjY5NS4xNjkwMDQ2MTM4*_ga_XJWPQMJYHQ*MTY5MTEzMTYxNy40LjEuMTY5MTEzMTYxNy42MC4wLjA.

- Typing docker ––version in the terminal should show:
    - Docker version XX/X/X

### Installation

To set up the system to run using docker, do the following steps in the terminal:


    1. Launch the docker application on your computer.

        You should be able to view Containers and Images


    2. In the project root directory, run:

        docker-compose up

    3. On Google Chrome, open either of the links below to launch our web application:

        http://127.0.0.1:3000/

        http://localhost:3000
## Authors

- Scrum Master
    - [Edison Hien](https://github.com/Eddyyyh)
- Fullstack Developers
    - [Edison Hien](https://github.com/Eddyyyh)
- Frontend Developers
    - [Calvin Chang](https://github.com/CalvinChang1)
    - [Sophia Li](https://github.com/sophiaax)
- Backend Developers
    - [Anthony Chen](https://github.com/Konatomic)
    - [Winston Liang](https://github.com/wl0831)

