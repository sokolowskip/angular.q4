using System;
using System.Collections.Generic;

namespace Q4.Angular.Models
{
    public class Project
    {
        public Guid? ProjectId { get; set; }

        public string Name { get; set; }

        public IList<Developer> Developers { get; set; }
    }
}