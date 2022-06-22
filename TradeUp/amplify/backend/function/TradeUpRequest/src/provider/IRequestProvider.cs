using System.Threading.Tasks;
using System;
namespace TradeUpRequest
{
    public interface IRequestProvider
    {
        Task<RequestModel[]> GetAllRequestAsync();
        Task<RequestModel[]> GetAllRequestByUserIDAsync(string inputRequestTradeFromID);
    }
}