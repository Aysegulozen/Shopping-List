using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace ShoppingListApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShoppingListController : ControllerBase
    {
        private static readonly List<ShoppingItem> ShoppingList = new List<ShoppingItem>
        {
            new ShoppingItem { Name = "Milk", Quantity = "1 l", Important = false, Bought = false },
            new ShoppingItem { Name = "Bread", Quantity = "2 pcs", Important = false, Bought = false },
            new ShoppingItem { Name = "Cheese", Quantity = "500 gr", Important = false, Bought = false }
        };

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(ShoppingList);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ShoppingItem item)
        {
            ShoppingList.Add(item);
            return Ok(ShoppingList);
        }

        [HttpDelete("{name}")]
        public IActionResult Delete(string name)
        {
            var item = ShoppingList.FirstOrDefault(i => i.Name == name);
            if (item != null)
            {
                ShoppingList.Remove(item);
                return Ok(ShoppingList);
            }
            return NotFound();
        }
    }

    public class ShoppingItem
    {
        public string Name { get; set; } = string.Empty;
        public string Quantity { get; set; } = string.Empty;
        public bool Important { get; set; }
        public bool Bought { get; set; }
    }
}