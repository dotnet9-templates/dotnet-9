
namespace Application.Reactivities.DTOs;

// DTO used when the client submits a POST request to create a new reactivity.
// DTOs (Data Transfer Objects) decouple the API surface from the domain model,
// giving explicit control over which fields the client is allowed to supply.
//
// ReactivityId is intentionally omitted — the domain entity generates its own
// ID via Guid.NewGuid(). Allowing the client to supply an ID would risk
// data integrity issues and would let AutoMapper overwrite the server-generated value.
//
// Field-level validation (NotEmpty, etc.) is handled by CreateReactivityValidator
// via the MediatR ValidationBehavior pipeline, so no [Required] attributes are needed here.
public class CreateReactivityDto : BaseReactivityDto
{
}
