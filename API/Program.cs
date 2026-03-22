using API.Middleware;
using Application.Core;
using Application.Queries;
using Application.Reactivities.Validators;
using Domain;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();

// Register MediatR and scan the assembly containing GetReactivityList.Handler for all
// IRequestHandler implementations. AddOpenBehavior wraps every request/response pair
// with ValidationBehavior so FluentValidation runs automatically before each handler —
// no manual validator injection needed per handler.
builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetReactivityList.Handler>();
    x.AddOpenBehavior(typeof(ValidationBehavior<,>));
});

// Register AutoMapper and explicitly add the MappingProfiles profile.
// cfg.AddMaps(assembly) can be used instead to auto-discover all Profile subclasses.
builder.Services.AddAutoMapper(cfg => cfg.AddProfile<MappingProfiles>());

// Scan the assembly containing CreateReactivityValidator and register all
// AbstractValidator<T> implementations with the DI container so MediatR's
// ValidationBehavior can resolve them automatically.
builder.Services.AddValidatorsFromAssemblyContaining<CreateReactivityValidator>();
builder.Services.AddTransient<ExceptionMiddleware>(); // transient service is a service that is created once and then disposed of after use. Used when needed.
builder.Services.AddIdentityApiEndpoints<User>(opt =>
{
    opt.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<AppDbContext>();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(options =>
    options.AllowAnyMethod()
           .AllowAnyHeader()
           .WithOrigins("http://localhost:3001", "https://localhost:3001"));
app.UseAuthentication();
app.UseAuthorization();

// app.UseHttpsRedirection();

app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();  // api/login

// Apply any pending EF Core migrations and seed initial data at startup.
// A scoped service provider is used so the DbContext is properly disposed after seeding.
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    var userManager = services.GetRequiredService<UserManager<User>>();
    await context.Database.MigrateAsync();
    await dbInitializer.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
