using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Reactivity
    {
        // primary key, if we leave it as Id, it will be the primary key by default.
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