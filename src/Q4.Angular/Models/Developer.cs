using System;
using System.Collections.Generic;
using MongoDB.Bson;

namespace Q4.Angular.Models
{
    public class Developer
    {
        public ObjectId Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime BirthDate { get; set; }

        public DateTime HireDate { get; set; }

        public List<string> Skills { get; set; } 
    }

    public class DeveloperDTO
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime BirthDate { get; set; }
    }
}