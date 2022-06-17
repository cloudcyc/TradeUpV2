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
namespace TradeUpUser
{
    // If you rename this class, you will need to update the invocation shim
    // to match if you intend to test the function with 'amplify mock function'
    public class TradeUpUser
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
            var userProvider = new UserProvider(new AmazonDynamoDBClient());
            switch (request.HttpMethod) {
                case "GET":
                    if(request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey("inputUserEmail") && request.QueryStringParameters.ContainsKey("inputUserPassword"))
                    // if(request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey("inputUserEmail"))
                    {
                        var users = await userProvider.GetUserByEmailAndPasswordAsync(request.QueryStringParameters["inputUserEmail"],request.QueryStringParameters["inputUserPassword"]);
                        return new APIGatewayProxyResponse
                        {
                            StatusCode = 200,
                            Body = JsonConvert.SerializeObject(users)
                        };
                    }
                    else if (request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey("inputUserEmail"))
                    {
                        var users = await userProvider.GetUserByEmailAsync(request.QueryStringParameters["inputUserEmail"]);
                        return new APIGatewayProxyResponse
                        {
                            StatusCode = 200,
                            Body = JsonConvert.SerializeObject(users)
                        };
                    }
                    else if (request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey("inputUserID") && request.QueryStringParameters.ContainsKey("inputUserRole"))
                    {
                        var users = await userProvider.GetOtherAdminAsync(request.QueryStringParameters["inputUserRole"],request.QueryStringParameters["inputUserID"]);
                        return new APIGatewayProxyResponse
                        {
                            StatusCode = 200,
                            Body = JsonConvert.SerializeObject(users)
                        };
                    }
                    else if (request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey("inputUserID"))
                    {
                        var users = await userProvider.GetUserByIDAsync(request.QueryStringParameters["inputUserID"]);
                        return new APIGatewayProxyResponse
                        {
                            StatusCode = 200,
                            Body = JsonConvert.SerializeObject(users)
                        };
                    }
                    
                    break;
                case "POST":
                var user = JsonConvert.DeserializeObject<UserModel>(request.Body);
                    if(request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey("NewUser"))
                    {
                        if (user == null)
                        {
                            return new APIGatewayProxyResponse {StatusCode = 400};
                        }
                        else if (user != null)
                        {
                            if (await userProvider.AddNewUser(user))
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
                    else if (request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey("UpdateUser"))
                    {
                        if (user == null)
                        {
                            return new APIGatewayProxyResponse {StatusCode = 400};
                        }
                        else if (user != null)
                        {
                            if (await userProvider.AddNewUser(user))
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
                case "PUT":
                    context.Logger.LogLine($"Put Request: {request.Path}\n");
                    if (!String.IsNullOrEmpty(contentType)) {
                        context.Logger.LogLine($"Content type: {contentType}");
                    }
                    context.Logger.LogLine($"Body: {request.Body}");
                    response.StatusCode = (int)HttpStatusCode.OK;
                    break;
                case "DELETE":
                    if(request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey("inputUserEmail") && request.QueryStringParameters.ContainsKey("inputUserID") )
                    {
                        if (await userProvider.DeleteUserAsync(request.QueryStringParameters["inputUserEmail"],request.QueryStringParameters["inputUserID"]))
                        {
                            return new APIGatewayProxyResponse 
                            { 
                                StatusCode = 200
                            };
                        }
                        else{
                            return new APIGatewayProxyResponse
                            {
                                StatusCode = 400
                            };
                        }
                    }
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
