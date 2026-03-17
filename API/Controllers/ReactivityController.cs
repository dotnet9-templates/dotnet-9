using Application.Queries;
using Application.Reactivities.Commands;
using Application.Reactivities.DTOs;
using Domain;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    // Inherits from BaseApiController which provides the Mediator instance and
    // the [ApiController] / [Route("api/[controller]")] attributes.
    public class ReactivityController() : BaseApiController
    {
        // GET api/reactivity — returns all reactivities.
        [HttpGet]
        public async Task<ActionResult<List<Reactivity>>> GetReactivities()
        {
            return await Mediator.Send(new GetReactivityList.Query());
        }

        // GET api/reactivity/{id} — returns a single reactivity by ReactivityId.
        [HttpGet("{id}")]
        public async Task<ActionResult<Reactivity>> GetReactivityDetail(string id)
        {
            return HandleResult(await Mediator.Send(new GetReactivityDetails.Query { ReactivityId = id }));
        }

        // POST api/reactivity — creates a new reactivity from the inbound DTO.
        // Accepts CreateReactivityDto (not the full Reactivity entity) so the client
        // cannot supply or overwrite server-owned fields like ReactivityId.
        // Returns the newly generated ReactivityId as a string on success.
        [HttpPost]
        public async Task<ActionResult<string>> CreateReactivity(CreateReactivityDto reactivityDto)
        {
            return await Mediator.Send(new CreateReactivity.Command { ReactivityDto = reactivityDto });
        }

        // PUT api/reactivity — updates an existing reactivity.
        // Returns 204 No Content on success (no body needed after an update).
        [HttpPut]
        public async Task<ActionResult> EditReactivity(Reactivity reactivity)
        {
            await Mediator.Send(new EditReactivity.Command { Reactivity = reactivity });
            
            return NoContent();
        }

        // DELETE api/reactivity/{id} — deletes a reactivity by ReactivityId.
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReactivity(string id)
        {
            await Mediator.Send(new DeleteReactivity.Command { ReactivityId = id });
            
            return Ok();
        }
    }
}