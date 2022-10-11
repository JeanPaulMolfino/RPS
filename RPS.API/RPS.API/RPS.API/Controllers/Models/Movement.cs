using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RPS.API.Controllers.Models
{
    public class Movement
    {
        public Movement(string name, string kills)
        {
            Name = name;
            Kills = kills;
        }
        [Key]
        public string Name { get; set; }

        public string Kills { get; set; }
    }
}
