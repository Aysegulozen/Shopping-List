using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace ShoppingListApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShoppingListController : ControllerBase
    {
        private static readonly List<Item> ShoppingList = new List<Item>
        {
            new Item { Name = "Milk", Quantity = "1 l", Important = false, Bought = false },
            new Item { Name = "Bread", Quantity = "2 pcs", Important = false, Bought = false },
            new Item { Name = "Cheese", Quantity = "500 g", Important = false, Bought = false }
        };

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(ShoppingList);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Item newItem)
        {
            ShoppingList.Add(newItem);
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

        [HttpPut("{name}")]
        public IActionResult Put(string name, [FromBody] Item updatedItem)
        {
            var item = ShoppingList.FirstOrDefault(i => i.Name == name);
            if (item != null)
            {
                item.Quantity = updatedItem.Quantity;
                item.Important = updatedItem.Important;
                item.Bought = updatedItem.Bought;
                return Ok(ShoppingList);
            }
            return NotFound();
        }
    }

    public class Item
    {
        public string Name { get; set; } = string.Empty;
        public string Quantity { get; set; } = string.Empty;
        public bool Important { get; set; }
        public bool Bought { get; set; }
    }
}
