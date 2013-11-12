namespace Q4.Angular.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeNameOfDeveloper : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Tasks", "AssignedDeveloper_DeveloperId", "dbo.Developers");
            DropIndex("dbo.Tasks", new[] { "AssignedDeveloper_DeveloperId" });
            AddColumn("dbo.Tasks", "Developer_DeveloperId", c => c.Guid());
            CreateIndex("dbo.Tasks", "Developer_DeveloperId");
            AddForeignKey("dbo.Tasks", "Developer_DeveloperId", "dbo.Developers", "DeveloperId");
            DropColumn("dbo.Tasks", "AssignedDeveloper_DeveloperId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Tasks", "AssignedDeveloper_DeveloperId", c => c.Guid());
            DropForeignKey("dbo.Tasks", "Developer_DeveloperId", "dbo.Developers");
            DropIndex("dbo.Tasks", new[] { "Developer_DeveloperId" });
            DropColumn("dbo.Tasks", "Developer_DeveloperId");
            CreateIndex("dbo.Tasks", "AssignedDeveloper_DeveloperId");
            AddForeignKey("dbo.Tasks", "AssignedDeveloper_DeveloperId", "dbo.Developers", "DeveloperId");
        }
    }
}
