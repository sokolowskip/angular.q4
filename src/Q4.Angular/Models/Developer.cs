using System;
using System.Collections.Generic;

namespace Q4.Angular.Models
{
    public class Developer
    {
        public Guid DeveloperId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime BirthDate { get; set; }

        public DateTime HireDate { get; set; }
    }
}