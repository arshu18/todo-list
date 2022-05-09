# A Responsive Todo List

This is a Todo List implemented using ReactJS with a calendar view to seamlessly navigate between months and years. The backend is implemented with ASP.NET Core Web API. Currently there is only feature to add tasks. Editing feature is not available.

## Steps to follow to integrate project

* I have included the .bak file to provide the structure of the database. Integrate it into a SQL Server instance of your choice.
* In appsettings.json file of the Web API project, change the connection string to the SQL Server where you took the backup.
* In Program.cs file of the Web API project, change the CORS settings to point to the URL where the React application is hosted. 
* In the path **~/src/GlobalVar.js**, Change the API_HOST to point to the URL where you plan to host the Web API Project.

Any valuable suggestions to make this project better are always welcome!
