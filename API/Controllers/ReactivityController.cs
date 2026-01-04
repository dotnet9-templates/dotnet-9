using Application.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ReactivityController(AppDbContext context, IMediator mediator) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Reactivity>>> GetReactivities()
        {
            return await mediator.Send(new GetReactivityList.Query());
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