import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";

class SettingsController {
    async create(request: Request, response: Response): Promise<Response> {
        const { chat, username } = request.body;
        const settingsService = new SettingsService();

        try {
            const settings = await settingsService.create({ chat, username });
    
            return response.json(settings);
        } catch(err) {
            return response.status(400).json({
                message: err.message
            });
        }
    }

    async findByUserName(request: Request, response: Response) {
        const { username } = request.params;
        const settingsService = new SettingsService();

        const setting = await settingsService.findByUserName(username);

        return response.json(setting);
    }

    async update(request: Request, response: Response) {
        const { username } = request.params;
        const { chat } = request.body;

        const settingsService = new SettingsService();

        const setting = await settingsService.update(username, chat);

        return response.json(setting);
    }
}

export { SettingsController }