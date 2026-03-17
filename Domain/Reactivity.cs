using System.ComponentModel.DataAnnotations;


namespace Domain
{
    public class Reactivity
    {
        // Changed from using Title as [Key] to a dedicated ReactivityId property.
        // Using a business field like Title as a primary key is bad practice — titles can change
        // and aren't guaranteed unique. ReactivityId matches EF Core's <TypeName>Id convention,
        // so [Key] is technically redundant but kept here for explicitness.
        // The server generates this value — it is never supplied by the client.
        [Key]
        public string ReactivityId { get; set; } = Guid.NewGuid().ToString();
        public required string Title { get; set; }
        public DateTime Date { get; set; }
        public required string Description { get; set; }
        public required string Category { get; set; }
        public bool IsCancelled { get; set; }

        // location props
        public required string City { get; set; }
        public required string Venue { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}