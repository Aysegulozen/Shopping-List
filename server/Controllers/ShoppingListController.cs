using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace ShoppingListApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShoppingListController : ControllerBase
    {
        private static readonly Dictionary<string, List<Item>> UserShoppingLists = new Dictionary<string, List<Item>>
        {
            { "guest@example.com", new List<Item>
                {
                    new Item { Name = "Milk", Quantity = "1 l", Important = false, Bought = false },
                    new Item { Name = "Bread", Quantity = "2 pcs", Important = false, Bought = false },
                    new Item { Name = "Cheese", Quantity = "500 g", Important = false, Bought = false }
                }
            }
        };

        [HttpGet("{userId}")]
        public IActionResult Get(string userId)
        {
            if (UserShoppingLists.ContainsKey(userId))
            {
                return Ok(UserShoppingLists[userId]);
            }
            return Ok(new List<Item>());
        }

        [HttpPost("{userId}")]
        public IActionResult Post(string userId, [FromBody] List<Item> newItems)
        {
            if (UserShoppingLists.ContainsKey(userId))
            {
                UserShoppingLists[userId] = newItems;
            }
            else
            {
                UserShoppingLists[userId] = newItems;
            }
            return Ok(UserShoppingLists[userId]);
        }

        [HttpDelete("{userId}/{name}")]
        public IActionResult Delete(string userId, string name)
        {
            if (UserShoppingLists.ContainsKey(userId))
            {
                var item = UserShoppingLists[userId].FirstOrDefault(i => i.Name == name);
                if (item != null)
                {
                    UserShoppingLists[userId].Remove(item);
                    return Ok(UserShoppingLists[userId]);
                }
                return NotFound();
            }
            return NotFound();
        }

        [HttpPut("{userId}/{name}")]
        public IActionResult Put(string userId, string name, [FromBody] Item updatedItem)
        {
            if (UserShoppingLists.ContainsKey(userId))
            {
                var item = UserShoppingLists[userId].FirstOrDefault(i => i.Name == name);
                if (item != null)
                {
                    item.Quantity = updatedItem.Quantity;
                    item.Important = updatedItem.Important;
                    item.Bought = updatedItem.Bought;
                    return Ok(UserShoppingLists[userId]);
                }
                return NotFound();
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
