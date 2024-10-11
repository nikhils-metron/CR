import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ApiService {

    private readonly API_URL = 'https://integration.cybereason.net:8443/rest/savedQueries/all'

    async getSavedQueries() {
        const cookie = process.env.COOKIES;

        try {
            const response = await axios.get(this.API_URL, {
            headers: { 
                'Cookie': cookie,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            });
            return response.data;
        } catch (error) {
            throw new HttpException(
            'Error fetching data',
            HttpStatus.BAD_GATEWAY,
            );
        }
    }
    
}
