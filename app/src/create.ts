import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SongService } from './services/SongService';

export const createSongHandler = async (
    event: APIGatewayProxyEvent
    ): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        const songCreated = await SongService.createSong(JSON.parse(event.body || '{}'));
        response = {
            statusCode: 200,
            body: JSON.stringify(songCreated),
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