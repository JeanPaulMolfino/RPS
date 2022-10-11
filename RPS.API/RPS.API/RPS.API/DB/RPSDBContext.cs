using Microsoft.EntityFrameworkCore;
using RPS.API.Controllers.Models;

namespace RPS.API.DB
{
    public class RPSDBContext : DbContext
    {
        public RPSDBContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Movement> Movements { get; set; }
    }
}
