using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>( options => {
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")); //this is the connection string from the appsettings.json file. to use for the sqlite database.
});

var app = builder.Build();

// app.UseHttpsRedirection();

// app.UseAuthorization();

app.MapControllers();


// Database initialization at startup: apply pending migrations and seed initial data.
// The 'using' statement ensures the service scope is properly disposed after initialization.
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await dbInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
