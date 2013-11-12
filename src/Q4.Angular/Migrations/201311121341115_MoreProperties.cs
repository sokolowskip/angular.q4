namespace Q4.Angular.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MoreProperties : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Projects", "StartDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.Tasks", "FinishDate", c => c.DateTime());
            AddColumn("dbo.Tasks", "Status", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tasks", "Status");
            DropColumn("dbo.Tasks", "FinishDate");
            DropColumn("dbo.Projects", "StartDate");
        }
    }
}
