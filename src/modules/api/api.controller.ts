import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('getSavedQueries')
export class ApiController {

    constructor (private apiService: ApiService) {}

    @Get() 
    getSavedQueries() {
        return this.apiService.getSavedQueries()
    }
}	