using Application.Queries;
using Application.Reactivities.Commands;
using Application.Reactivities.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReactivityController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Reactivity>>> GetReactivities()
        {
            return await Mediator.Send(new GetReactivityList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reactivity>> GetReactivityDetail(string id)
        {
            return HandleResult(await Mediator.Send(new GetReactivityDetails.Query { ReactivityId = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateReactivity(CreateReactivityDto reactivityDto)
        {
            return HandleResult(await Mediator.Send(new CreateReactivity.Command { ReactivityDto = reactivityDto }));
        }

        [HttpPut]
        public async Task<IActionResult> EditReactivity(EditReactivityDto reactivityDto)
        {
            return HandleResult(await Mediator.Send(new EditReactivity.Command { ReactivityDto = reactivityDto }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReactivity(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteReactivity.Command { ReactivityId = id }));
        }
    }
}