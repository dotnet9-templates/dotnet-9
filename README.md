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

=== STARTING SECTION 5 part 48 ===

Date form is a little off and browswer will look different on each one.

=== STARTING SECTION 5 part 49 ===

using state hooks for edit mode. still prop drilling.

seeing the form, creating an activity form and cancel buttons working.

=== STARTING SECTION 5 part 50 ===

Forms input 2 ways

1. controlled input: component states react knows what's going on.
2. uncontrolled input: react no idea what's going on.

able to see console submit from create form because of the name property on the input fields.

Why It Works:
The name attribute is a standard HTML form feature. When you use new FormData(form), it automatically:
Finds all input elements in the form
Looks at their name attribute
Gets their current value
Creates key-value pairs: { [name]: value }
Without the name attribute, the input values wouldn't be captured because FormData wouldn't know what to call them! The name is literally the property name in your final data object.

The FormData Rule:
new FormData(form) only looks for form elements (input, textarea, select) with a name attribute inside the form. That's the HTML standard.

=== STARTING SECTION 5 part 51 ===

populate itself into the list. front end only.
See front end changes only to forms and list.

=== STARTING SECTION 5 part 52 and 53 ===

delete button added. all client side crud examples completed for this section

=== STARTING SECTION 6 part 54 ===

Introduction and understanding cache and global states.

=== STARTING SECTION 6 part 55 ===

Setting up React Query (Tanstack)
https://tanstack.com/query/v5/docs/framework/react/installation

be sure you're in the client folder: npm i @tanstack/react-query

https://tanstack.com/query/v5/docs/framework/react/quick-start

use <QueryClientProvider> to wrap the app. in Main.tsx

in App.tsx, we're removing local state and using react query to manage the state.

For now, we want to see a flicker of the loading text before the data is loaded.

console > network tag inside fetching to see one query of Reactivities.
react query removes ability to remove duplicate queries.

At this point the version is: "@tanstack/react-query": "^5.90.20",

=== STARTING SECTION 6 part 56 ===

installing reactu query developer tools

https://tanstack.com/query/v5/docs/framework/react/devtools

be sure you're in the client folder and run npm i @tanstack/react-query-devtools
Then we will use the floating tools.

At this point the version is: "@tanstack/react-query-devtools": "^5.91.2",

now on the lower right side we have a button to click on to open the developer tools.
clicking on the button and first query will show data of 11 reactivities.
You can also trigger the loading state by clicking on the button and then clicking on the button again to see the loading state. then press button to see the data again.

=== STARTING SECTION 6 part 57 ===

hooks must have the word use in the name.

=== STARTING SECTION 6 part 58 ===

Using Axios in the hook.

for useReactvities we no longer need to use axios and can use agent.
also in the same file we do not need to use the hardcoded url and can use the agent for the base url.

now the browser will have the loading delay of 1 second. because of the interceptor in the agent.

remove the hardcoded url and use the agent for the base url.

used a .env file to store the base url.

=== STARTING SECTION 6 part 59 ===

update an activity on client side browser with react query mutation and update on database.

using react query to see the data explorer and seeing the data. Invalidate the cache to see the data updated on the database.

Material UI v7 does come with a loading property. You can use this instead of disabled here to display a spinner on the button. -- comment is on the reactivity form.

test on form, click view. click edit. change title. change date. click submit and we should see the title change on the list of cards but no the view for activity details component because of the temporary nature.

you can see the mutation in react query devtools. console, etc.

the details wont show until refresh. . . . not mentioned in the video but is in the code.

Testing with title and date for now.

=== STARTING SECTION 6 part 60 ===

fixing date issue and details issue from previous section.

in order for the list and activity details. we need to use the same reactivity from getting from react query state.

testing on will now show the update on the list and details.

fixed date...

=== STARTING SECTION 6 part 61 ===

creating a mutation with react query.

Testing you should see the created reactivity on the list and details.

=== STARTING SECTION 6 part 62 ===

Able to delete a reactivity from the list and details.

also end for part 63

+++=== STARTING SECTION 7 part 64 ===+++

ROUTING
react router hooks are
useNavigate()
useParams()
use SearchParams()
useLocation()
and more . . .

=== STARTING SECTION 7 part 65 ===

NOTES: URL changed from today Feb 2, 2026 from last update from tutorial!!!

We will be using react router.
https://reactrouter.com
https://reactrouter.com/start/declarative/installation

npm i react-router BE SURE YOU'RE IN THE CLIENT FOLDER.
"react-router": "^7.13.0"

https://reactrouter.com/start/declarative/routing

Testing client...nothing changes.

=== STARTING SECTION 7 part 66 ===

removed all the code in App.tsx and replaced it with the route beccuase of props drilling and it is fixed by using the router.

also getting rid of props drilling and using the router.

This was a code cleanup section.

Testing page still get list, but button is not working.
we still need more work i.e. where to load components.

<App> is the parent component and <Outlet> is the child component. We replaced App with <Outlet> in App.tsx. because we want to load the components from the router.

Testing client...should have a default homepage and to see the list you need to put in url https://localhost:3001/reactivities

=== STARTING SECTION 7 part 67 ===

Using NavLink to navigate to the reactivities page.

Reactivites click doesn't have loading. it's coming frome cache.

Understand how {children} works. when being passed as a prop to a component, it will be the content of the component.

the correct code for MenuItemLink file is type { ReactNode } from "react"; Verified from owners repo.
https://github.com/TryCatchLearn/Reactivities/commit/30e1d245962c3b9d7803d2f321525269e31b3e6f#diff-1892cf650bcb5f9f189bd72a6eed3f739edd26fb230ccfff150b5eb116f2e726

=== STARTING SECTION 7 part 68 ===

Test on client should now show yellow highlighted text when the link is active for ony Reactivity and Create Reactivity links only.

two version of link and navigate on buttons on ReactivityDetail.tsx file.

1. component={Link} to={`/reactivities/${reactivity.reactivityId}`}
2. onClick={() => navigate("/reactivities")}

component is more convenient than onClick because it's a react router link and will handle the navigation for you. the other requires a hook to navigate.

after testing on client we should have the ability to click on the view button and navigate to the reactivity detail page. but with no data. just a card with edit and cancel buttons with no image. we should also see the id in the url.
![image.png](image.png)

=== STARTING SECTION 7 part 69 ===

entity id is on the url from the route to get from the API. unique.

enabled: !!reactivityId, // only run the query if reactivityId is provided. without it see what happens when you refresh the page and you're on the detail page. it will try to get the reactivity and it will not find it and it will throw an error especially if you're using the react query devtools. you can also see the error in the console network tab fetc/xhr.

once enabled is true, the query will run and you will see the reactivity in the detail page. you can see the query in the react query devtools. ["reactivity", null] will be disabled.

=== STARTING SECTION 7 part 70 ===

changed the route to manage/:reactivityId to match the reactivityId in the ReactivityForm component. e.g. id vs reactivityId. because we are using useParams to get the reactivityId from the url.

tested adding a route to the form to edit the reactivity. also tested the create reactivity form.

one bug is the edit of the newly created reactivity, and then click on create reactivity, the data is not cleared.

=== STARTING SECTION 7 part 71 & 72 ===

fixing the bug of the edit of the newly created reactivity, and then click on create reactivity, the data is not cleared.

use {reactivity} ? "Edit Reactivity" : "Create Reactivity" to show the correct title in the ReactivityForm component.

instead of using reactivityId directly, use reactivity to show the correct title in the ReactivityForm component.

=== STARTING SECTION 8 part 73 & 74 ===

titleTypographyProps={{ fontWeight: "bold", fontSize: 20 }}

titleTypographyProps is deprecated . . . because of the new version of material ui. MUI v7 does not have this property.

so change to slotProps={{ title: { fontWeight: "bold", fontSize: 20 } }}

Why: MUI v7 migrated from legacy xxxProps shorthand props to a unified slotProps API. slotProps lets you pass props to any internal sub-component slot (title, subheader, avatar, action) in one place, which is more consistent and composable than the old individual titleTypographyProps, subheaderTypographyProps, etc. props that existed before.

=== STARTING SECTION 8 part 75 ===

creating cards and exportable components for the details page.

=== STARTING SECTION 8 part 76 ===

Use snippets and change to appropriate names.
Grid2 is now Grid

test the header to change isCancelled to true and see the badge and loading to true.

be sure to change some hardcoded values to the reactivity object.

next is adding filters with no functionality yet.

=== STARTING SECTION 8 part 77 ===

Solution can be found in the owner's repo. Since it's faster. Also he does use Grid instead of Grid2.

https://github.com/TryCatchLearn/Reactivities/commits/main/
For the calendar, we need to add a css file to the project. Check styles.css

=== STARTING SECTION 8 part 78 && 79 && 80 ===

HomePage creation and dates.

for dates we're using date-fns to format the dates. go to website date-fns.org

therefore install date-fns npm i date-fns
"date-fns": "^4.1.0"

put date in util.ts file and use it in the ReactivityCard component and others.

=== STARTING SECTION 9 part 81 & 82 & 83 ===

mobx is for client side state management.
react query is for server side state management asynchronous data fetching.
mobx react lite is to observe the state that's inside our mob stores.

mobx for async states means manually observing the state that's inside our mob stores and caching. This is why we use react query for async states.

MobX functions: observable, computed properties, action, Reactions, AutoRun which is similar to Reaction but does not wait for the state to change.

Lesson 82 is useful to understand the difference between mobx and react query.

Setting up mobx in the client folder. https://mobx.js.org/README.html
npm i mobx mobx-react-lite This version is 4.1.1 old is 4.1.0

=== STARTING SECTION 9 part 84 && 85 && 86 && 87 ===

A lot of this are examples and most of it ths solution was from the owner's repo.

=== STARTING SECTION 9 part 88 ===

Add a loading state to the app by creating a ui store.

Position abosolute needs to be relative to the parent element.

=== STARTING SECTION 9 part 89 && 90===

react query fetching.

for this section we need to use the react query devtools to see the data fetching and clicked on Reactivities you can see the data fetching becoming stale in react query devtools.

For this whole section, we utilized the solution from the owner's repo. https://github.com/TryCatchLearn/Reactivities/commit/92e9cd38d537906590afa86a1452aa6aba860a4b

=== STARTING SECTION 10 part 91 & 92 — DTOs, Validation & Domain ID ===

## What Changed in This Lesson WITH DATA ANNOTATIONS NOT FLUENT VALIDATION

After changing the domain model, a new EF Core migration is required since the database schema changed:

```
dotnet ef migrations add AddReactivityId -p Persistence -s API
dotnet ef database update -p Persistence -s API
```

---

### 2. CreateReactivityDto — ReactivityId removed, `required` replaced with `[Required]`

**ReactivityId removed from the DTO:**
The client should never supply an ID for a new resource. If the DTO included `ReactivityId`, AutoMapper would map it onto the domain entity and overwrite the server-generated value — a security and data integrity risk. The server owns ID generation.

**`required` keyword replaced with `[Required]` data annotation:**
The C# `required` keyword enforces compile-time non-nullability but does not produce useful HTTP validation error responses. `[Required]` from `System.ComponentModel.DataAnnotations` integrates with ASP.NET Core's model validation pipeline and produces clear field-level 400 errors visible in Postman/clients.

---

### 3. Postman Testing

Set `{{url}}` = `https://localhost:5001` in your Postman environment.

**Test all CRUD endpoints:**

- GET `{{url}}/api/reactivity`
- GET `{{url}}/api/reactivity/{id}`
- POST `{{url}}/api/reactivity`
- PUT `{{url}}/api/reactivity`
- DELETE `{{url}}/api/reactivity/{id}`

**Expected POST with empty body — 400 Bad Request (old `required` keyword error):**

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "$": [
      "JSON deserialization for type 'Application.Reactivities.DTOs.CreateReactivityDto' was missing required properties including: 'title', 'description', 'category', 'city', 'venue'."
    ],
    "reactivityDto": ["The reactivityDto field is required."]
  }
}
```

**Expected POST with empty body — 400 Bad Request (after switching to `[Required]` annotations):**

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "City": ["The City field is required."],
    "Title": ["The Title field is required."],
    "Venue": ["The Venue field is required."],
    "Category": ["The Category field is required."],
    "Description": ["The Description field is required."]
  }
}
```

The `[Required]` approach gives per-field errors, which is far more useful for clients than the generic deserialization error from `required`.

These are data annotations — a simple validation approach. Fluent Validation is the more powerful alternative for complex rules but is not used here.

=== STARTING SECTION 10 part 93 — FluentValidation ===

## What Changed in This Lesson

Replaced `[Required]` data annotations on `CreateReactivityDto` with **FluentValidation** — a dedicated NuGet package that moves validation logic into its own class, separate from the DTO.

---

### Why Switch from Data Annotations to FluentValidation?

| Scenario                                          | Use                              |
| ------------------------------------------------- | -------------------------------- |
| Simple CRUD with basic required/length rules      | Data Annotations — less overhead |
| Complex business rules, conditional validation    | FluentValidation                 |
| Need to unit test validation logic                | FluentValidation                 |
| Cross-field validation (e.g. EndDate > StartDate) | FluentValidation                 |
| Large team / production app                       | FluentValidation — scales better |

---

### 1. Install the NuGet Package

Install `FluentValidation.DependencyInjectionExtensions` into `Application.csproj` — **no prerelease**.

- Tutorial version: `11.11.0`
- Latest at time of writing: `12.1.1`

---

### 2. Create the Validator (`Application/Reactivities/Validators/CreateReactivityValidator.cs`)

A new dedicated class inheriting `AbstractValidator<T>` where `T` is the MediatR `Command` (not the DTO directly). Rules are defined with `RuleFor` + `.NotEmpty()` + `.WithMessage()`:

```csharp
RuleFor(x => x.ReactivityDto.Title).NotEmpty().WithMessage("Title is required");
```

The validator validates against the `Command` object (which wraps the DTO), so rules access fields via `x.ReactivityDto.PropertyName`.

---

### 3. Register the Validator in `Program.cs`

Added one line to scan the `Application` assembly and register all validators automatically:

```csharp
builder.Services.AddValidatorsFromAssemblyContaining<CreateRectivityValidator>();
```

This means any new validator added to the `Application` project is picked up automatically — no need to register each one individually.

---

### 4. Inject and Call the Validator in `CreateReactivity.cs`

The `Handler` constructor now receives `IValidator<Command>` via dependency injection:

```csharp
public class Handler(AppDbContext context, IMapper mapper, IValidator<Command> validator)
```

And validation runs before any database work:

```csharp
await validator.ValidateAndThrowAsync(request, cancellationToken);
```

If validation fails, `ValidateAndThrowAsync` throws a `FluentValidation.ValidationException` and halts execution — the entity is never created.

---

### 5. Remove `[Required]` from the DTO

Since FluentValidation now owns all validation rules, the `[Required]` data annotations were removed from `CreateReactivityDto`. The DTO is now a plain data carrier with no validation attributes.

---

### Postman Result — Empty POST body returns 500

At this stage the validation exception is a raw 500 because there is no global exception handler yet to convert it to a clean 400. The stack trace in the terminal shows:

```
FluentValidation.ValidationException: Validation failed:
-- ReactivityDto.Title: Title is required Severity: Error
-- ReactivityDto.Description: Description is required Severity: Error
-- ReactivityDto.Category: Category is required Severity: Error
-- ReactivityDto.City: City is required Severity: Error
-- ReactivityDto.Venue: Venue is required Severity: Error
```

This confirms FluentValidation is working correctly — it's just not yet mapped to a proper HTTP error response. That will be handled in a future lesson with exception handling middleware.

---

=== STARTING SECTION 10 part 94 ===

### What this lesson covers

Instead of injecting `IValidator<T>` directly into every command handler, this lesson introduces a **MediatR pipeline behavior** that runs FluentValidation automatically for any request that has a registered validator. This keeps handlers clean — they contain only business logic and database operations.

### Key concept: MediatR Pipeline Behaviors

A pipeline behavior implements `IPipelineBehavior<TRequest, TResponse>` and wraps every MediatR request/response pair, similar to ASP.NET middleware but scoped to the application layer. Behaviors are composed in a chain; each one calls `next()` to pass control to the next behavior or the handler itself.

### Files changed

#### `Application/Core/ValidationBehavior.cs` (new)

A generic open behavior registered once in `Program.cs`. It resolves an `IValidator<TRequest>` from DI — if none exists for a given request type it passes straight through, so queries and other commands without validators are unaffected.

```csharp
public class ValidationBehavior<TRequest, TResponse>(IValidator<TRequest>? validator = null)
    : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(...)
    {
        if (validator == null) return await next(cancellationToken);

        var validationResult = await validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
            throw new ValidationException(validationResult.Errors);

        return await next(cancellationToken);
    }
}
```

#### `Application/Reactivities/Validators/CreateReactivityValidator.cs` (new)

FluentValidation validator for `CreateReactivity.Command`. Rules are defined here once and enforced before the handler ever executes.

```csharp
public sealed class CreateReactivityValidator : AbstractValidator<CreateReactivity.Command>
{
    public CreateReactivityValidator()
    {
        RuleFor(x => x.ReactivityDto.Title).NotEmpty();
        RuleFor(x => x.ReactivityDto.Description).NotEmpty();
        // ... etc.
    }
}
```

#### `Program.cs` — two additions

```csharp
// 1. Register ValidationBehavior as an open generic pipeline behavior.
//    MediatR automatically applies it to every IRequest<TResponse> in the assembly.
x.AddOpenBehavior(typeof(ValidationBehavior<,>));

// 2. Scan the Application assembly and register all AbstractValidator<T> implementations.
builder.Services.AddValidatorsFromAssemblyContaining<CreateReactivityValidator>();
```

### How the pipeline flows

```
POST /api/reactivities
    │
    ▼
ReactivityController.CreateReactivity()
    │  sends Command via MediatR
    ▼
ValidationBehavior<Command, string>.Handle()
    │  resolves CreateReactivityValidator from DI
    │  calls ValidateAsync(request)
    │  ──► invalid? throws ValidationException (list of field errors)
    │  ──► valid?  calls next()
    ▼
CreateReactivity.Handler.Handle()
    │  maps DTO → domain entity via AutoMapper
    │  saves to database
    ▼
returns new ReactivityId
```

### Postman result at this stage

Sending an empty `{}` body returns a **500** because there is no global exception handler yet to catch `ValidationException` and convert it to a 400. The terminal shows that validation **is** firing correctly:

```
FluentValidation.ValidationException: Validation failed:
-- ReactivityDto.Title: Title is required Severity: Error
-- ReactivityDto.Description: Description is required Severity: Error
-- ReactivityDto.Category: Category is required Severity: Error
-- ReactivityDto.City: City is required Severity: Error
-- ReactivityDto.Venue: Venue is required Severity: Error
```

This confirms the pipeline behavior is working. The 500 will be resolved in the next lesson by adding **exception handling middleware** that maps `ValidationException` to a proper `400 Bad Request` response with field-level error details.

=== STARTING SECTION 10 part 95 ===

Used ExceptionMiddleware Solution from https://github.com/TryCatchLearn/Reactivities/blob/6555456b9510ad8ffbd208b29de131d6e8d3f364/API/Middleware/ExceptionMiddleware.cs
and with the help of AppException https://github.com/TryCatchLearn/Reactivities/blob/6555456b9510ad8ffbd208b29de131d6e8d3f364/Application/Core/AppException.cs

after testing on postman, we get the following error:

{
"type": "ValidationFailure",
"title": "Validation error",
"status": 400,
"detail": "One or more validation errors has occurred",
"errors": {
"ReactivityDto.Title": [
"Title is required"
],
"ReactivityDto.Description": [
"Description is required"
],
"ReactivityDto.Category": [
"Category is required"
],
"ReactivityDto.City": [
"City is required"
],
"ReactivityDto.Venue": [
"Venue is required"
]
}
}

next is handling other API error responses.

=== STARTING SECTION 10 part 96, 97 ===

For handlers! parts 1 and 2 of 3.

Solution for Core is from https://github.com/TryCatchLearn/Reactivities/blob/6555456b9510ad8ffbd208b29de131d6e8d3f364/Application/Core/Result.cs

97 solution is here: https://github.com/TryCatchLearn/Reactivities/blob/6555456b9510ad8ffbd208b29de131d6e8d3f364/Application/Activities/Queries/GetActivityDetails.cs

Base API which is needed later is from here: https://github.com/TryCatchLearn/Reactivities/blob/main/API/Controllers/BaseApiController.cs#L17

Testing module 10 get: postman result is

{
"type": "https://tools.ietf.org/html/rfc9110#section-15.5.5",
"title": "Not Found",
"status": 404,
"traceId": "00-ca3383e89bb8b62829d5cfa42602d4b3-e3e0bdd6a0986bea-00"
}

=== STARTING SECTION 10 part 98 ===

last part of handling api response part 3 or 3.

Delete Solution: https://github.com/TryCatchLearn/Reactivities/blob/6555456b9510ad8ffbd208b29de131d6e8d3f364/Application/Activities/Commands/DeleteActivity.cs

Edit Solution: https://github.com/TryCatchLearn/Reactivities/blob/6555456b9510ad8ffbd208b29de131d6e8d3f364/Application/Activities/Commands/EditActivitiy.cs

Edit DTO Solution: https://github.com/TryCatchLearn/Reactivities/blob/6555456b9510ad8ffbd208b29de131d6e8d3f364/Application/Activities/DTOs/EditActivityDto.cs

Base Reactivity DTO Solution: https://github.com/TryCatchLearn/Reactivities/blob/6555456b9510ad8ffbd208b29de131d6e8d3f364/Application/Activities/DTOs/BaseActivityDto.cs

lesson 99 has Ihost to know if running in development or production . . .

lesson 100 has the validators . . . and I just used teh solutions at this point from the owner's repo. Just all the validators folders.

lesson 101 hits the base files i.e. DTO bases...validators bases...etc.
