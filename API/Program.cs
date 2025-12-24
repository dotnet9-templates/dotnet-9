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

app.Run();
