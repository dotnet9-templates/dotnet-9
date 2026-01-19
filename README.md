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

== Starting at Section 2 Part 12 ==

color on info doesn't work on dotnet watch. use dotnet run because of .NET 9 updates . . . causes this error.

== Starting at Section 2 Part 13 - 15 SKIPPED ==

+++=== STARTING SECTION 3 part 17 ===+++

create react project in sln director.

npm create vite@latest
yes to the question.
project name client
framework react
variant typescript + swc

cd into client folder and run npm install.
run npm run dev to start the development server.

on mac to upgrade node to latest version, run the command brew update then brew upgrade node. then node --version

OR

just go to the node website and download the latest version.

OR

brew install node@22
brew upgrade node

OR

troubleshoot on your own.

=== STARTING SECTION 3 part 18 ===

vite.config.ts is the file used for npm run dev.

Check package.json to make sure the dependences for react and react-dom are installed the right verision by hovering over the dependencies. then be sure you're in the client folder and re-run npm install for the correct version.

change index.html title to dotnet-9
change the App.tsx
removed styling from index.css

just simplfiy.

install extension es7 react/redux/react-native snippets by dsznajder

=== STARTING SECTION 3 part 19 ===

javascript fetch and other examples

=== STARTING SECTION 3 part 20 ===
in API folder needs to do in command line

# Step 1: Remove old certificates

dotnet dev-certs https --clean

# Step 2: Create and trust a new certificate

dotnet dev-certs https --trust

because chrome . . .

Great question! Let me explain **why** this works:

## The Problem

When you use **HTTPS**, your browser needs to verify the server's identity using an **SSL/TLS certificate**. This prevents man-in-the-middle attacks.

For production websites, certificates come from trusted Certificate Authorities (like Let's Encrypt). But for **localhost development**, .NET creates a **self-signed certificate** - meaning it's not verified by a trusted authority.

**Browsers don't trust self-signed certificates by default** - that's why you got the `ERR_CERT_AUTHORITY_INVALID` error.

## The Solution

### `dotnet dev-certs https --clean`

- Removes old development certificates from:
  - Your **user certificate store** (~/.dotnet/corefx/cryptography/)
  - Your **system keychain** (macOS Keychain Access)
- Useful if certificates got corrupted or expired

### `dotnet dev-certs https --trust`

- Creates a new development certificate
- **Installs it in your Mac's Keychain** as a trusted root certificate
- Chrome (and all browsers) check the system keychain
- When they see the certificate is trusted there, they accept it!

## Why Chrome vs Safari?

- **Safari** is more lenient - clicking "Proceed" in the warning is enough
- **Chrome** is stricter - it requires certificates to be in the **system keychain** as trusted
- **Postman** ignores certificate validation entirely in development mode

## The Flow

```
Your Browser → Makes HTTPS request to localhost:5001
             ↓
Server sends → Self-signed certificate
             ↓
Browser checks → "Is this in my trusted certificates?"
             ↓
System Keychain → "Yes! You ran --trust, so it's here"
             ↓
Browser → ✅ Connection allowed
```

Without `--trust`, the browser says "Not in my trusted list, I'm blocking this!"

That's why the certificate needed to be trusted system-wide for Chrome to work! 🎉

strict mode and use effect will return 2 fetches in the console network. This is by design.

=== STARTING SECTION 3 part 21 ===

get json from console fetch and go to json to typescript
https://transform.tools/json-to-typescript

TypeScript: interface vs type (concise summary)
Both interface and type are exportable in TypeScript. There’s no difference in how they’re exported.
An interface is best for defining object shapes and public/shared models. It can be extended and declaration-merged, which makes it a good default for things like API response models.
A type is more flexible and is better when you need unions, intersections, or more complex compositions. It cannot be merged.
For simple object shapes, either works.
If these definitions are meant to be shared across the app, they can go in index.d.ts. Use exports if they’re imported, or make them global if you want them available without imports.
TL;DR:
Use interface for object models, type for complex types. Both are exportable and fine to place in index.d.ts when shared globally.

=== STARTING SECTION 3 part 22 ===

https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?utm_source=ext_app_menu

react developer tools extension for chrome. pin to toolbar

console site using react will now show components and profiler

=== STARTING SECTION 3 part 23 ===

MUI.com/core -> get started CURRENT VERSION AT THIS POINT IS v7.3.6
We'll use MUI Design 2 and click on installation getting start and follow....

in terminal npm install @mui/material @emotion/react @emotion/styled IN CLIENT FOLDER.

Use Roboto font. npm install @fontsource/roboto
then copy the fonts

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

then Icons
npm install @mui/icons-material

Check package.json to make sure the dependencies are installed the right version.

OLD is below if you want to use it
"@emotion/react": "^11.14.0",
"@emotion/styled": "^11.14.1",
"@fontsource/roboto": "^5.1.1",
"@mui/icons-material": "^6.3.0",
"@mui/material": "6.3.0",

This is for styling the app....can use the oldest if want the exact same styling.

Setting > Link Editing and turn on. To make sure tags are linked correctly..

=== STARTING SECTION 3 part 24 ===

running client app in https isn't required. publishing will be on https...might as well keep it as close to production as possible.

in client run npm install -D vite-plugin-mkcert for local certificate authority. Just for your browser to trust the certificate.

MKCERT will ask you to trust the certificate via password on npm run dev
jacobreola@MacBook-Pro-04 client % npm run dev

> client@0.0.0 dev
> vite

Sudo password:
The list of generated files:
/Users/jacobreola/.vite-plugin-mkcert/dev.pem
/Users/jacobreola/.vite-plugin-mkcert/cert.pem
8:21:30 AM [vite] (client) Re-optimizing dependencies because vite config has changed

VITE v7.3.0 ready in 24825 ms

➜ Local: https://localhost:3001/
➜ Network: use --host to expose
➜ press h + enter to show help

This will not work on the internet but it will work on development mode.

=== STARTING SECTION 3 part 25 ===

Axios
in client npm install axios

+++=== STARTING SECTION 4 part 28 - 29 ===+++

=== STARTING SECTION 4 part 30 ===

install nuget MediaTr by Jimmy Board install in Application.csproj 12.4.1 version.

I installed 14.0.0 is for dotnet 10 and backwards compatible with dotnet 9.

files GetReactivityList.cs and ReactivityController.cs to pay attention to how the medator handles the request.

we used Imediator mediator in ReactivityController.cs to handle the request as a dependency injection.

in postman use module 4 to test the API. use the query get reactivities to get the list of reactivities.

=== STARTING SECTION 4 part 31 ===

Interesting debugging on mediatr.

cleanup controller injection of AppDbContext context line 9

Let me clarify this for you! The key is understanding **where** `AppDbContext` is actually used.

## Here's What's Happening:

Your controller **BEFORE** (with AppDbContext):

```csharp
public class ReactivityController(AppDbContext context, IMediator mediator) : BaseApiController
```

Your controller **NOW** (without AppDbContext):

```csharp
public class ReactivityController(IMediator mediator) : BaseApiController
```

## Why It Still Works:

**`AppDbContext` was NEVER used in your controller!** Look at your methods:

```csharp
[HttpGet]
public async Task<ActionResult<List<Reactivity>>> GetReactivities()
{
    return await mediator.Send(new GetReactivityList.Query());  // ← Uses mediator, NOT context
}

[HttpGet("{id}")]
public async Task<ActionResult<Reactivity>> GetReactivityDetail(string id)
{
    return await mediator.Send(new GetReactivityDetails.Query { ReactivityId = id });  // ← Uses mediator, NOT context
}
```

You never wrote `context.Reactivities` anywhere in your controller! You only used `mediator`.

## Where AppDbContext IS Actually Used:

It's in your **handlers** in the Application layer:

**GetReactivityList.cs:**

```csharp
public class Handler(AppDbContext context) : IRequestHandler<Query, List<Reactivity>>
{
    public async Task<List<Reactivity>> Handle(Query request, CancellationToken cancellationToken)
    {
        return await context.Reactivities.ToListAsync(cancellationToken);  // ← context used HERE
    }
}
```

**GetReactivityDetails.cs:**

```csharp
public class Handler(AppDbContext context) : IRequestHandler<Query, Reactivity>
{
    public async Task<Reactivity> Handle(Query request, CancellationToken cancellationToken)
    {
        var reactivity = await context.Reactivities.FindAsync([request.ReactivityId], cancellationToken);  // ← context used HERE
        if (reactivity == null) throw new Exception("Reactivity not found");
        return reactivity;
    }
}
```

## The Flow:

1. **Request comes in** → Controller
2. **Controller** → Sends query via `mediator.Send()`
3. **MediatR** → Finds the right handler and creates it
4. **DI Container** → Injects `AppDbContext` into the handler (not the controller!)
5. **Handler** → Uses `AppDbContext` to get data from database
6. **Handler** → Returns data back through MediatR to controller

So `AppDbContext` was just sitting unused in your controller as an extra parameter. Removing it doesn't break anything because you were never using it there in the first place! 🎯

=== STARTING SECTION 4 part 32 ===

Making API Controller thinner.
understanding variables in baseapi controller.

      protected IMediator Mediator => \\_mediator ??= HttpContext.RequestServices.GetRequiredService<IMediator>();

=> is the expression-bodied property syntax in C#. It means the property returns the value of the expression on the right instead of using a full get block.
The ??= operator assigns a value only if the variable is currently null.
Together, this line lazily resolves IMediator from dependency injection, stores it in \_mediator, and reuses it on future accesses.

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<IMediator>()
        ?? throw new InvalidOperationException("Mediator is not registered");

This is still an expression-bodied property, but with an added safety check.
First, \_mediator ??= assigns \_mediator if it is null.
Then the second ?? checks the result of that assignment.
If resolving IMediator returns null, it throws an InvalidOperationException.
In short: it lazily resolves and caches IMediator, and explicitly fails if it is not registered in dependency injection.

    public class ReactivityController(IMediator mediator) : BaseApiController

in ReactivivityController we remove the IMediator dependency injection and use the Mediator property from the BaseApiController.

=== STARTING SECTION 4 part 33 ===

Test on postman module 4. create a new reactivity. you'll receive the ReactivityId. and put it in the details endpoint to get the details of the reactivity.

=== STARTING SECTION 4 part 34 ===

returning no content for edit or put . . . can watch if wanted.

Test Put on module 4. mapped only to title. you should get a 204 status code no return for proper edit.
Then get the details of the reactivity to see the changes.

=== STARTING SECTION 4 part 35 ===
Auto mapper instead of inputting manually like in previous secction for title.

nuget install automapper by jimmy bogard.
use version 13.0.1 as it's free and auto mapper 14 uses a commercial license. Does other things we do not need or want.
install into Application.csproj and Persistence.csproj

MappProfiles needs a service in Program.cs

in builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly); The assemply is in the API/bin/Application.dll

Module 4 to test. with further changes of all properties. EDIT

=== STARTING SECTION 4 part 36 ===

Create Delet Controller and Handler.
Test module 4 with the created Reactivity . . .
Delete, get 200k then get the detail and it should be gone.

=== STARTING SECTION 4 part 37 ===

using cancellation tokens to cancel the request if the user closes the browser and helps with cancel token on postman.

This is an example of a cancellation token in the handler and what it looks like.

=== STARTING SECTION 4 part 38 ===

Using Debugger.
Breakpoints in VS Code.

+++=== STARTING SECTION 5 ===+++

=== STARTING SECTION 5 part 41 ===

Creating architecture for the project client side.
created folder and renamed files and deleted files that were not needed.
clean bill of health in console.

=== STARTING SECTION 5 part 42 ===

Navbar creation.
https://mui.com/material-ui/react-app-bar/ use basic app bar example.

<MenuIcon /> change to <Menu /> then add import @mui/icons-material

add <CssBaseline /> to App.tsx to make sure the styles are applied correctly.

=== STARTING SECTION 5 part 43 ===

Make it look good but not worried about responsiveness.

mt in mui is margin top \* 2 which is 8px. because the container is 4px. different than tailwind css.

=== STARTING SECTION 5 part 44 ===
Grid2 is just now Grid at this point.
https://mui.com/material-ui/migration/upgrade-to-grid-v2/

=== STARTING SECTION 5 part 45 ===

for file ReactivityList.tsx for mapping a funciton using the {} we need to explicitly return the value. for () it means return one thing.

=== STARTING SECTION 5 part 46 ===

Inputting images

=== STARTING SECTION 5 part 47 ===

Selecting an individual activity to view.

no state management yet, this is an example of how to do it with props.

shows how to use props with selected . . . destructuring props.

Important to see how props and parameter passing works for components with no state management. currently using prop drilling.
