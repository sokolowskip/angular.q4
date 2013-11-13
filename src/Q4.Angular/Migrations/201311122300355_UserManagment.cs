namespace Q4.Angular.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserManagment : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Developers", "Login", c => c.String());
            AddColumn("dbo.Developers", "Password", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Developers", "Password");
            DropColumn("dbo.Developers", "Login");
        }
    }
}
