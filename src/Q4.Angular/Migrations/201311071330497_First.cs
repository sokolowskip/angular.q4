namespace Q4.Angular.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class First : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Developers",
                c => new
                    {
                        DeveloperId = c.Guid(nullable: false),
                        FirstName = c.String(),
                        LastName = c.String(),
                        BirthDate = c.DateTime(nullable: false),
                        HireDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.DeveloperId);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        ProjectId = c.Guid(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.ProjectId);
            
            CreateTable(
                "dbo.ProjectDevelopers",
                c => new
                    {
                        Project_ProjectId = c.Guid(nullable: false),
                        Developer_DeveloperId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.Project_ProjectId, t.Developer_DeveloperId })
                .ForeignKey("dbo.Projects", t => t.Project_ProjectId, cascadeDelete: true)
                .ForeignKey("dbo.Developers", t => t.Developer_DeveloperId, cascadeDelete: true)
                .Index(t => t.Project_ProjectId)
                .Index(t => t.Developer_DeveloperId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProjectDevelopers", "Developer_DeveloperId", "dbo.Developers");
            DropForeignKey("dbo.ProjectDevelopers", "Project_ProjectId", "dbo.Projects");
            DropIndex("dbo.ProjectDevelopers", new[] { "Developer_DeveloperId" });
            DropIndex("dbo.ProjectDevelopers", new[] { "Project_ProjectId" });
            DropTable("dbo.ProjectDevelopers");
            DropTable("dbo.Projects");
            DropTable("dbo.Developers");
        }
    }
}
