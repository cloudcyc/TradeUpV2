using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Newtonsoft.Json;


using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.DynamoDBv2;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

// If you rename this namespace, you will need to update the invocation shim
// to match if you intend to test the function with 'amplify mock function'
namespace TradeUpRequest
{
    // If you rename this class, you will need to update the invocation shim
    // to match if you intend to test the function with 'amplify mock function'
    public class TradeUpRequest
    {
        /// <summary>
        /// A Lambda function to respond to HTTP Get methods from API Gateway
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The list of blogs</returns>
        /// <remarks>
        /// If you rename this function, you will need to update the invocation shim
        /// to match if you intend to test the function with 'amplify mock function'
        /// </remarks>
#pragma warning disable CS1998
        public async Task<APIGatewayProxyResponse> LambdaHandler(APIGatewayProxyRequest request, ILambdaContext context)
        {
            var response = new APIGatewayProxyResponse {
                Headers = new Dictionary<string, string> {
                    { "Access-Control-Allow-Origin", "*" },
                    { "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" }
                }
            };

            string contentType = null;
            request.Headers?.TryGetValue("Content-Type", out contentType);
            var requestProvider = new RequestProvider(new AmazonDynamoDBClient());
            switch (request.HttpMethod) {
                case "GET":
                    if(request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey("inputRequestTradeFromID") && request.QueryStringParameters.ContainsKey("RequestMode"))
                    {
                        switch (request.QueryStringParameters["RequestMode"]) {
                            case "Send": 
                                var requests1 = await requestProvider.GetAllRequestByUserIDAsync(request.QueryStringParameters["inputRequestTradeFromID"]);
                                return new APIGatewayProxyResponse
                                {
                                    StatusCode = 200,
                                    Body = JsonConvert.SerializeObject(requests1)
                                };
                            break;
                            case "Receive": 
                                var requests2 = await requestProvider.GetReceivedRequestByUserIDAsync(request.QueryStringParameters["inputRequestTradeFromID"]);
                                return new APIGatewayProxyResponse
                                {
                                    StatusCode = 200,
                                    Body = JsonConvert.SerializeObject(requests2)
                                };
                            break;
                        }
                        
                    }
                    else if(request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey("inputRequestItemID"))
                    {
                        
                        var requests = await requestProvider.GetRequestByRequestItemIDAsync(request.QueryStringParameters["inputRequestItemID"]);
                        return new APIGatewayProxyResponse
                        {
                            StatusCode = 200,
                            Body = JsonConvert.SerializeObject(requests)
                        };
                    }
                    break;
                case "POST":
                    if(request.QueryStringParameters == null)
                    {
                        var requestbody = JsonConvert.DeserializeObject<RequestModel>(request.Body);
                        if (requestbody == null){
                            return new APIGatewayProxyResponse {StatusCode = 400};
                        }
                        else if (requestbody != null)
                        {
                            if (await requestProvider.AddRequestWithImageAsync(requestbody))
                            {
                                return new APIGatewayProxyResponse 
                                { 
                                    StatusCode = 200
                                };
                            }
                            else
                            {
                                return new APIGatewayProxyResponse
                                {
                                    StatusCode = 400
                                };
                            }
                        }
                    }
                    else if(request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey("inputRequestItemID") && request.QueryStringParameters.ContainsKey("inputNewStatus")){
                            
                            if (await requestProvider.UpdateRequestsToRemovedBasedOnID(request.QueryStringParameters["inputRequestItemID"], request.QueryStringParameters["inputNewStatus"]))
                            {
                                return new APIGatewayProxyResponse 
                                { 
                                    StatusCode = 200
                                };
                            }
                            else
                            {
                                return new APIGatewayProxyResponse
                                {
                                    StatusCode = 400
                                };
                            }
                    }
                    else if(request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey("NewImage") && request.QueryStringParameters.ContainsKey("inputRequestID"))
                    {
                        var requestbody = JsonConvert.DeserializeObject<RequestModel>(request.Body);
                        switch (request.QueryStringParameters["NewImage"]) {
                            case "True":   
                                if (await requestProvider.DeleteImageByIDAsync(request.QueryStringParameters["inputRequestID"]))
                                {
                                    return new APIGatewayProxyResponse 
                                    { 
                                        StatusCode = 400
                                    };
                                }
                                else
                                {
                                    if (requestbody == null)
                                    {
                                        return new APIGatewayProxyResponse {StatusCode = 400};
                                    }
                                    else if (requestbody != null)
                                    {
                                        if (await requestProvider.AddRequestWithoutImageAsync(requestbody))
                                        {
                                            return new APIGatewayProxyResponse 
                                            { 
                                                StatusCode = 200
                                            };
                                        }
                                        else
                                        {
                                            return new APIGatewayProxyResponse
                                            {
                                                StatusCode = 400
                                            };
                                        }
                                    }
                                }
                            break;
                            case "False":
                                if (requestbody == null)
                                {
                                    return new APIGatewayProxyResponse {StatusCode = 400};
                                }
                                else if (requestbody != null)
                                {
                                    if (await requestProvider.AddRequestWithoutImageAsync(requestbody))
                                        {
                                            return new APIGatewayProxyResponse 
                                            { 
                                                StatusCode = 200
                                            };
                                        }
                                        else
                                        {
                                            return new APIGatewayProxyResponse
                                            {
                                               StatusCode = 400
                                            };
                                        }
                                }
                            break;
                        }
                        
                    }
                    break;
                case "PUT":
                    context.Logger.LogLine($"Put Request: {request.Path}\n");
                    if (!String.IsNullOrEmpty(contentType)) {
                        context.Logger.LogLine($"Content type: {contentType}");
                    }
                    context.Logger.LogLine($"Body: {request.Body}");
                    response.StatusCode = (int)HttpStatusCode.OK;
                    break;
                case "DELETE":
                    context.Logger.LogLine($"Delete Request: {request.Path}\n");
                    response.StatusCode = (int)HttpStatusCode.OK;
                    break;
                default:
                    context.Logger.LogLine($"Unrecognized verb {request.HttpMethod}\n");
                    response.StatusCode = (int)HttpStatusCode.BadRequest;
                    break;
            }

            return response;
        }
    }
}
