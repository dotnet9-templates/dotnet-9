using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ReactivityController(AppDbContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Reactivity>>> GetReactivities()
        {
            return await context.Reactivities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reactivity>> GetReactivityDetail(string id)
        {
            var reactivity = await context.Reactivities.FindAsync(id);
            if (reactivity == null) return NotFound();
            return reactivity;
        }
    }
}