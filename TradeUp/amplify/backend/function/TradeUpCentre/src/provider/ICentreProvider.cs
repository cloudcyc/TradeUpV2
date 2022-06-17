using System.Threading.Tasks;
using System;
namespace TradeUpCentre
{
    public interface ICentreProvider
    {
        Task<CentreModel[]> GetAllCentresAsync();
        Task<CentreModel[]> GetAllCentresByStatusAsync(String inputCentreStatus);
        Task<CentreModel[]> GetSelectedCentresByStatusAndIDAsync(String inputCentreID, String inputCentreStatus);
        Task<bool> AddNewCentreAsync(CentreModel centre);
        Task<bool> AddCentreWithoutImageAsync(CentreModel centre);
        Task<bool> DeleteSelectedCentresByStatusAndIDAsync(String inputCentreID, String inputCentreStatus);
        Task<bool> DeleteSelectedCentresByStatusAndIDWithoutImageAsync(String inputCentreID, String inputCentreStatus);
        Task<bool> DeleteImageByIDAsync(String inputCentreID);
    
    }
}