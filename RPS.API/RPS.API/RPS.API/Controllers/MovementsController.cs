using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RPS.API.Controllers.Models;
using RPS.API.DB;

namespace RPS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovementsController : Controller
    {
        private readonly RPSDBContext _rPSDBContext;

        public MovementsController(RPSDBContext rPSDBContext)
        {
            this._rPSDBContext = rPSDBContext;
        }

        [HttpGet]

        public async Task<IActionResult> getAllMovements()
        {
            //Obtenemos todos los movimientos
            List<Movement> movements = await _rPSDBContext.Movements.ToListAsync();
            //Revisamos por si no hay ninguno
            if (movements.Count() == 0)
            {
                //En caso de serlo, agrega datos de prueba
                Movement stone = new Movement("Rock", "Scissors");
                _rPSDBContext.Movements.Add(stone);
                Movement paper = new Movement("Paper", "Rock");
                _rPSDBContext.Movements.Add(paper);
                Movement scissors = new Movement("Scissors", "Paper");
                _rPSDBContext.Movements.Add(scissors);
                _rPSDBContext.SaveChanges();
                movements = await _rPSDBContext.Movements.ToListAsync();
            }
            return Ok(movements);  
        }

        [HttpPost]

        public async Task<IActionResult> AddMovement([FromBody] Movement _Movement)
        {
            await _rPSDBContext.Movements.AddAsync(_Movement);
            await _rPSDBContext.SaveChangesAsync();
            return Ok(_Movement);
        }
    }
}
