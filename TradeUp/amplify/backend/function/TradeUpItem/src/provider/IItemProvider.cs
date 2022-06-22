using System.Threading.Tasks;
using System;
namespace TradeUpItem
{
    public interface IItemProvider
    {
        Task<ItemModel[]> GetActiveItemByModeAsync(string inputItemMode);
        Task<ItemModel[]> AdminGetAllItemByModeAsync(string inputItemMode);
        Task<ItemModel[]> GetActiveItemByModeAndCategoryAsync(string inputItemMode, string inputItemStatus);
        Task<ItemModel[]> GetActiveItemByModeAndCategoryUserIDExistAsync(string inputItemMode, string inputItemStatus, string inputUserID);
        Task<ItemModel[]> GetItemByItemID(string inputItemID);
        Task<ItemModel[]> GetItemByUserID(string inputUserID);
        Task<bool> AddItemWithImageAsync (ItemModel item);
        Task<bool> AddItemWithoutImageAsync (ItemModel item);
        Task<bool> DeleteSelectedItemWithImageAsync(String inputItemID, String inputUserID);
        Task<bool> DeleteSelectedItemWithoutImageAsync(String inputItemID, String inputUserID);
        Task<bool> DeleteImageByIDAsync(String inputItemID);
    }
}