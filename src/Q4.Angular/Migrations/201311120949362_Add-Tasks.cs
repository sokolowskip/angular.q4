namespace Q4.Angular.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddTasks : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Tasks",
                c => new
                    {
                        TaskId = c.Guid(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        DueDate = c.DateTime(),
                        ExpectedWorkload = c.Decimal(precision: 18, scale: 2),
                        AssignedDeveloper_DeveloperId = c.Guid(),
                        Feature_FeatureId = c.Guid(),
                    })
                .PrimaryKey(t => t.TaskId)
                .ForeignKey("dbo.Developers", t => t.AssignedDeveloper_DeveloperId)
                .ForeignKey("dbo.Features", t => t.Feature_FeatureId)
                .Index(t => t.AssignedDeveloper_DeveloperId)
                .Index(t => t.Feature_FeatureId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tasks", "Feature_FeatureId", "dbo.Features");
            DropForeignKey("dbo.Tasks", "AssignedDeveloper_DeveloperId", "dbo.Developers");
            DropIndex("dbo.Tasks", new[] { "Feature_FeatureId" });
            DropIndex("dbo.Tasks", new[] { "AssignedDeveloper_DeveloperId" });
            DropTable("dbo.Tasks");
        }
    }
}
