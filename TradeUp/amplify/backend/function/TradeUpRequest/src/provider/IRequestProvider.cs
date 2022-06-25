using System.Threading.Tasks;
using System;
namespace TradeUpRequest
{
    public interface IRequestProvider
    {
        Task<RequestModel[]> GetAllRequestAsync();
        Task<RequestModel[]> GetAllRequestByUserIDAsync(string inputRequestTradeFromID);
        Task<bool> AddRequestWithImageAsync (RequestModel requestbody);
        Task<bool> AddRequestWithoutImageAsync (RequestModel requestbody);
        Task<bool> UpdateRequestsToRemovedBasedOnID(string inputRequestItemID);
        Task<RequestModel[]> GetRequestByRequestItemIDAsync(string inputRequestItemID);
    }
}