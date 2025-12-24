using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)  //dbcontext options is the connection string from Program.cs line 9 - 11.
{
    public required DbSet<Reactivity> Reactivities { get; set; }
}