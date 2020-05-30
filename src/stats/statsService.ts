export interface StatsService {
    getServerMemberCount(): Promise<number>;
    getServerTotalMessages(): Promise<number>;
    getServerTotalReactions(): Promise<number>;
}