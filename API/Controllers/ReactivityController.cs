using Application.Queries;
using Application.Reactivities.Commands;
using Domain;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class ReactivityController() : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Reactivity>>> GetReactivities()
        {
            return await Mediator.Send(new GetReactivityList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reactivity>> GetReactivityDetail(string id)
        {
            return await Mediator.Send(new GetReactivityDetails.Query { ReactivityId = id });
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateReactivity(Reactivity reactivity)
        {
            return await Mediator.Send(new CreateReactivity.Command { Reactivity = reactivity });
        }

        [HttpPut]
        public async Task<ActionResult> EditReactivity(Reactivity reactivity)
        {
            await Mediator.Send(new EditReactivity.Command { Reactivity = reactivity });
            
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReactivity(string id)
        {
            await Mediator.Send(new DeleteReactivity.Command { ReactivityId = id });
            
            return Ok();
        }
    }
}