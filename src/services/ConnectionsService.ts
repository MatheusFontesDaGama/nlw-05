import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}

class ConnectionsService {
    private connetionsRepository: Repository<Connection>;

    constructor() {
        this.connetionsRepository = getCustomRepository(ConnectionsRepository);
    }

    async create({ socket_id, user_id, admin_id, id }: IConnectionCreate): Promise<Connection> {
        const connection = this.connetionsRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        });

        await this.connetionsRepository.save(connection);

        return connection;
    }

    async findByUserId(user_id: string): Promise<Connection> {
        const connection = await this.connetionsRepository.findOne({
            user_id
        });

        return connection;
    }

    async findAllWithoutAdmin(): Promise<Connection[]> {
        const connections = await this.connetionsRepository.find({
            where: { admin_id: null },
            relations: ["user"]
        });

        return connections;
    }

    async findBySocketID(socket_id: string): Promise<Connection> {
        const connection = await this.connetionsRepository.findOne({
            socket_id
        });
        
        return connection;
    }

    async updateAdminID(user_id: string, admin_id: string): Promise<void> {
        await this.connetionsRepository
            .createQueryBuilder()
            .update(Connection)
            .set({ admin_id })
            .where("user_id = :user_id", {
                user_id
            })
            .execute();
    }
}

export { ConnectionsService }