using System.ComponentModel.DataAnnotations;

namespace Application.Reactivities.DTOs;

// DTO used when the client submits a POST request to create a new reactivity.
// DTOs (Data Transfer Objects) decouple the API surface from the domain model,
// giving us control over exactly what the client can and cannot send.
public class CreateReactivityDto
{
        // ReactivityId was intentionally removed from this DTO.
        // The domain entity owns ID generation via Guid.NewGuid().ToString().
        // Allowing the client to supply an ID would be a security/data integrity risk —
        // AutoMapper would overwrite the server-generated value with whatever the client sent.

        // [Required] is used instead of the 'required' keyword for string properties.
        // The 'required' keyword does not serialize validation errors in a client-friendly way.
        // [Required] from System.ComponentModel.DataAnnotations produces clear, field-level
        // 400 Bad Request errors (e.g. "The Title field is required.") visible in Postman/clients.
        [Required]
        public string Title { get; set; } = "";
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public string Category { get; set; } = string.Empty;

        // location props
        [Required]
        public string City { get; set; } = string.Empty;
        [Required]
        public string Venue { get; set; } = string.Empty;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
}