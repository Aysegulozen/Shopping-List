using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ShoppingListApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShoppingListController : ControllerBase
    {
        private static readonly List<string> ShoppingList = new List<string>
        {
            "Milk",
            "Bread",
            "Cheese"
        };

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(ShoppingList);
        }

        [HttpPost]
        public IActionResult Post([FromBody] string item)
        {
            ShoppingList.Add(item);
            return Ok(ShoppingList);
        }

        [HttpDelete("{item}")]
        public IActionResult Delete(string item)
        {
            ShoppingList.Remove(item);
            return Ok(ShoppingList);
        }
    }
}