import { Injectable } from "@nestjs/common";

@Injectable()
export class ParsersService {
    constructor() {}

    parseYouTubeUrlToId(url: string): string {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        if (this.isYouTubeUrl(url)) {
            var match = url.match(regExp);
            return (match&&match[7].length==11)? match[7] : '';
        }
        return '';
        
    }

    private isYouTubeUrl(url: string): Boolean {
        const shortener = /^(?:https?\:\/\/)?(?:www\.)?youtu\.be/;
        const main = /^(?:https?\:\/\/)?(?:www\.)?youtube\.com\/+(?:watch|embed)/;
        return shortener.test(url) || main.test(url);
    }
}