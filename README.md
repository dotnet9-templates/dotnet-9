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

Make sure you have c# dev kit to create classes easier as a template.

I changed the model name from Activity to Reactivy.

in the model required keyword is used to ensure that the property is not null. even if the csproj is enabled for nullable...we do not want disabled in csproj.

== Starting at Section 2 Part 9 ==

extension nuget gallery to install packages.

nuget package Microsoft.EntityFrameworkCore.Sqlite install into Persistence. Make sure the version matches the .Net runtime version.

you can check runtime version with the command line command dotnet --info.

== Starting at Section 2 Part 10 ==

appsettings.json file to add the connection string for the sqlite database.
DefaultConnection is the name of the connection string in the appsettings.json file from Program.cs line 9 - 11.

so the default connection string is "Data Source=reactivities.db" in the appsettings.json file.

next install the dotnet tool by googling dotnet ef nuget and get the command line for your version from the first link. In this case it'll be: dotnet tool install --global dotnet-ef --version 9.0.11

- make sure you install in the API project folder. Then you can run doetnet ef to see the commands.

then go to the .sln file and run the command dotnet ef migrations add InitialCreate -p Persistence -s API. This create two switches: -p Persistence and -s API.

make sure you have Microsoft.EntityFrameworkCore.Design package installed in the API dir with the correct runtime version.

Check for errors with dotnet build

Example below :
jacobreola@MacBook-Pro-04 dotnet-9 % dotnet ef migrations add InitialCreate -p Persistence -s API
Build started...
Build succeeded.
Your startup project 'API' doesn't reference Microsoft.EntityFrameworkCore.Design. This package is required for the Entity Framework Core Tools to work. Ensure your startup project is correct, install the package, and try again.
jacobreola@MacBook-Pro-04 dotnet-9 % dotnet ef migrations add InitialCreate -p Persistence -s API
Build started...
Build succeeded.
Done. To undo this action, use 'ef migrations remove'
jacobreola@MacBook-Pro-04 dotnet-9 % dotnet build
Restore complete (0.7s)
Domain succeeded (0.0s) → Domain/bin/Debug/net9.0/Domain.dll
Persistence succeeded (0.2s) → Persistence/bin/Debug/net9.0/Persistence.dll
Application succeeded (0.1s) → Application/bin/Debug/net9.0/Application.dll
API succeeded (0.6s) → API/bin/Debug/net9.0/API.dll

Build succeeded in 1.8s

in the Persistence project folder, you should see a Migrations folder with the InitialCreate.cs file.

you can see the update with dotnet ef database update. nothing should happen because we haven't added any data yet.

therefore run the command dotnet ef database update -p Persistence -s API again to create the initial migration.

example below:

acobreola@MacBook-Pro-04 dotnet-9 % dotnet ef database update -p Persistence -s API
Build started...
Build succeeded.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
Executed DbCommand (6ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
PRAGMA journal*mode = 'wal';
info: Microsoft.EntityFrameworkCore.Migrations[20411]
Acquiring an exclusive lock for migration application. See https://aka.ms/efcore-docs-migrations-lock for more information if this takes too long.
Acquiring an exclusive lock for migration application. See https://aka.ms/efcore-docs-migrations-lock for more information if this takes too long.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
Executed DbCommand (2ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
SELECT COUNT(*) FROM "sqlite*master" WHERE "name" = '**EFMigrationsLock' AND "type" = 'table';
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
Executed DbCommand (1ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
CREATE TABLE IF NOT EXISTS "**EFMigrationsLock" (
"Id" INTEGER NOT NULL CONSTRAINT "PK**\_EFMigrationsLock" PRIMARY KEY,
"Timestamp" TEXT NOT NULL
);
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
Executed DbCommand (0ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
INSERT OR IGNORE INTO "**EFMigrationsLock"("Id", "Timestamp") VALUES(1, '2025-12-24 08:43:34.106457+00:00');
SELECT changes();
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
Executed DbCommand (0ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
CREATE TABLE IF NOT EXISTS "**EFMigrationsHistory" (
"MigrationId" TEXT NOT NULL CONSTRAINT "PK\_**EFMigrationsHistory" PRIMARY KEY,
"ProductVersion" TEXT NOT NULL
);
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
Executed DbCommand (0ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
SELECT COUNT(*) FROM "sqlite_master" WHERE "name" = '**EFMigrationsHistory' AND "type" = 'table';
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
Executed DbCommand (0ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
SELECT "MigrationId", "ProductVersion"
FROM "**EFMigrationsHistory"
ORDER BY "MigrationId";
info: Microsoft.EntityFrameworkCore.Migrations[20402]
Applying migration '20251224083817_InitialCreate'.
Applying migration '20251224083817_InitialCreate'.
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
Executed DbCommand (0ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
CREATE TABLE "Reactivities" (
"ReactivityId" TEXT NOT NULL CONSTRAINT "PK_Reactivities" PRIMARY KEY,
"Title" TEXT NOT NULL,
"Date" TEXT NOT NULL,
"Description" TEXT NOT NULL,
"Category" TEXT NOT NULL,
"IsCancelled" INTEGER NOT NULL,
"City" TEXT NOT NULL,
"Venue" TEXT NOT NULL,
"Latitude" REAL NOT NULL,
"Longitude" REAL NOT NULL
);
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
Executed DbCommand (0ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
INSERT INTO "**EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20251224083817_InitialCreate', '9.0.11');
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
Executed DbCommand (0ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
DELETE FROM "**EFMigrationsLock";
Done.

Make sure you have the extension SQLite Viewer by Florian Klampfer.
You sould see the db in the API folder.

use dotnet ef database drop -p Persistence -s API to drop the database. as we're taking a different approach to the database. This drops the db in the API folder.

== Starting at Section 2 Part 11 ==

use the course seed file and copy and paste into the dbInitializer.cs file.

see comments in code. afterwards, run dotnet watch to see the command line in the API folder.
in the api folder after creation from dotnetwatch you should see the data in the fake database in the API folder.

== Starting at Section 2 Part 11 ==

color on info doesn't work on dotnet watch. use dotnet run because of .NET 9 updates . . . causes this error.
