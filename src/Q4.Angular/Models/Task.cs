using System;

namespace Q4.Angular.Models
{
    public class Task
    {
        public Task()
        {
            Status = "Assigned";
        }

        public Guid TaskId { get; set; }

        public virtual Developer Developer { get; set; }

        public virtual Feature Feature { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime? DueDate { get; set; }

        public DateTime? FinishDate { get; set; }

        public string Status { get; set; }

        public decimal? ExpectedWorkload { get; set; }
    }
}