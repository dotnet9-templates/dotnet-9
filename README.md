== Starting at Section 2 Part 6. ==

Getting started with .NET 9.
Make sure you have the dotnet 9 SDK installed. On mac install the arm64 version.

check with dotnet --info.

See if you have the solution code with the command line command dotnet new list.

- we will be using ASP .NET Core Web API and Solution File.

Create a new solution with the command line command dotnet new sln.

then create a new web api project with the command line command dotnet new webapi -n MyApi -controllers.

- we want to see in the API folder the Controllers folder.

then in root folder in the command line new class libraries with the command line:

- dotnet new classlib -n Domain.
- dotnet new classlib -n Application.
- dotnet new classlib -n Persistence.

Then after the 4 projects are created, we need to add them to the solution file.
dotnet sln add API/API.csproj
dotnet sln add Domain/Domain.csproj
dotnet sln add Application/Application.csproj
dotnet sln add Persistence/Persistence.csproj

Then we need to set up the references between the projects...can use GUI on VS Code or in the command line with the command line command dotnet add reference.

- dotnet add API/API.csproj reference Application/Application.csproj
  Application.csproj needs two references to Domain.csproj and Persistence.csproj. - dotnet add Application/Application.csproj reference Domain/Domain.csproj - dotnet add Application/Application.csproj reference Persistence/Persistence.csproj

Persistence.csproj needs a reference to Domain.csproj.

- dotnet add Persistence/Persistence.csproj reference Domain/Domain.csproj

== Starting at Section 2 Part 7. ==

cd API and run the command dotnet run
be sure the ports are open i.e. info is all green.

Change the API/Properties/launchSettings.json to remove the https only 1 profile is needed.
changed in launchSettings.json to "applicationUrl": "https://localhost:5001;",

in the API.csproj..optional to remove the Microsoft.AspNetCore.OpenApi package.

API.http file to test the API. We removed it because we're using Postman to test the API.

The 4 files in this lesson to pay attention to is WeatherForecast.cs, Program.cs, and launchSettings.json, and API.csproj

== Starting at Section 2 Part 8. ==
