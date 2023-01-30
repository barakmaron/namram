# Namaram Ltd Online site
Namram is a plant rental company with a department specializing in concrete drilling and sawing. This project is a corporate website with a custom-built plant rental CMS built to meet Namram's specific needs.
https://www.namram.co.il
## Key Features
- Responsive design for optimal viewing on all devices.
- Add and manage rental and sale products.
- Create rental agreemnts for clients.
- Manage rental fleet with service report, spare parts and more...
- Customizable and dynamic pricing based on rental duration and type of equipment.
- Secure and efficient data management system.
- Add and manage projects publishing.
- Add and manage articles publishing.

# Dependencies
- Node.js
- Express
- MySql
- React
- Redux
- Docker (for testing or development - this is the only dependency that is not downloaded by the base code)

# Testing
  1. Clone the repository to your local machine.
  2. Switch to the test branch for running on the local machine.
  3. Change ```test.env.test``` file (in server folder) and ```test.env.local.test``` file (in client folder).<br>
     Make sure not to change the file names, only the contents.<br>
     *Warning: If you don't update these files, the app will work but not all of its functionality, such as mail sending, RSA communication with the backup server, and more.*
  4. Run the following command: 
    ```docker-compose -f docker-compose.yml up```<br>
    Make sure you in the root project directory.<br>
    This commad will spawn up 3 dockers:
    <br>Client (react docker)
    <br>Server (express docker)
    <br>Database (mysql docker)<br>
    *Note: Startup time may vary based on network connectivity, but could take up to 20 minutes.*
  5. After all dockers are up and running, you can open your browser in:<br>
    ```http://localhost:3000```<br>
    *Warning: In the testing environment, the React app is not built, so performance may differ from production. Additionally, HTTPS is not functional on the local machine in the test branch due to comments in the server/index.js file.*
  6. To reach the login page, you can open your browser in:<br>
    ```http://localhost:3000/login```
    With the credationals:<br>
    - User Name: ```test@gmail.com```<br>
    - Password: ```test1234```

# License
This project is licensed under the MIT License.
