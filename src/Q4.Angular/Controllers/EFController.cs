using System.Web.Mvc;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public abstract class EFController : Controller
    {
        protected readonly AngularDbContext context = new AngularDbContext();

        protected override void Dispose(bool disposing)
        {
            context.Dispose();
            base.Dispose(disposing);
        }
    }
}