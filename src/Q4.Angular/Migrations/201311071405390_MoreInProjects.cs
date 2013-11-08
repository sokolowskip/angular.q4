namespace Q4.Angular.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MoreInProjects : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Projects", "ClientName", c => c.String());
            AddColumn("dbo.Projects", "Technology", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Projects", "Technology");
            DropColumn("dbo.Projects", "ClientName");
        }
    }
}
