using System.Threading.Tasks;
using System;
namespace TradeUpReceipt
{
    public interface IReceiptProvider
    {
        Task<ReceiptModel[]> GetAllReceipt();
        Task<ReceiptModel[]> GetReceiptByUserID(string inputUserID);
        Task<bool> AddReceipt (ReceiptModel item);
    }
}