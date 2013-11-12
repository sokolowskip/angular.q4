using System.Data.Entity;

namespace Q4.Angular.Models
{
    public class AngularDbContext : DbContext
    {
        public DbSet<Developer> Developers { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<Task> Tasks { get; set; }
        
        public DbSet<Feature> Features { get; set; }

        public AngularDbContext() : base("AngularDb")
        {
        }
    }
}