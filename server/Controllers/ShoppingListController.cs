using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ShoppingListApi.Controllers
{
    public class ShoppingItem
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class ShoppingListController : ControllerBase
    {
        private static readonly List<ShoppingItem> ShoppingList = new List<ShoppingItem>
        {
            new ShoppingItem { Name = "Milk", Quantity = 1 },
            new ShoppingItem { Name = "Bread", Quantity = 1 },
            new ShoppingItem { Name = "Cheese", Quantity = 1 }
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
            ShoppingList.RemoveAll(i => i.Name == name);
            return Ok(ShoppingList);
        }
    }
}