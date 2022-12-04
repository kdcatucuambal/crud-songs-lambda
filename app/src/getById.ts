import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SongService } from "./services/SongService";

export const getSongByIdHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        const song = await SongService.getById(event.pathParameters?.id ?? '');
        response = {
            statusCode: 200,
            body: JSON.stringify(song),
        };
    } catch (err: unknown) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened',
            }),
        };
    }
    return response;
}