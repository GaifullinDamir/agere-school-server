import { Controller } from "@nestjs/common";
import { Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('/api')
export class AppController {

    private appService;
    constructor(appService: AppService) {
        this.appService = appService;
    }

    @Get('/users')
    getUsers() {
        return this.appService.getUsers();
    }
};