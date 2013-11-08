namespace Q4.Angular.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddFeatures : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ProjectDevelopers", "Project_ProjectId", "dbo.Projects");
            DropForeignKey("dbo.ProjectDevelopers", "Developer_DeveloperId", "dbo.Developers");
            DropIndex("dbo.ProjectDevelopers", new[] { "Project_ProjectId" });
            DropIndex("dbo.ProjectDevelopers", new[] { "Developer_DeveloperId" });
            CreateTable(
                "dbo.Features",
                c => new
                    {
                        FeatureId = c.Guid(nullable: false),
                        Name = c.String(),
                        Project_ProjectId = c.Guid(),
                    })
                .PrimaryKey(t => t.FeatureId)
                .ForeignKey("dbo.Projects", t => t.Project_ProjectId)
                .Index(t => t.Project_ProjectId);
            
            DropTable("dbo.ProjectDevelopers");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.ProjectDevelopers",
                c => new
                    {
                        Project_ProjectId = c.Guid(nullable: false),
                        Developer_DeveloperId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.Project_ProjectId, t.Developer_DeveloperId });
            
            DropForeignKey("dbo.Features", "Project_ProjectId", "dbo.Projects");
            DropIndex("dbo.Features", new[] { "Project_ProjectId" });
            DropTable("dbo.Features");
            CreateIndex("dbo.ProjectDevelopers", "Developer_DeveloperId");
            CreateIndex("dbo.ProjectDevelopers", "Project_ProjectId");
            AddForeignKey("dbo.ProjectDevelopers", "Developer_DeveloperId", "dbo.Developers", "DeveloperId", cascadeDelete: true);
            AddForeignKey("dbo.ProjectDevelopers", "Project_ProjectId", "dbo.Projects", "ProjectId", cascadeDelete: true);
        }
    }
}
