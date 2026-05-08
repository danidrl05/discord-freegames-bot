export interface Game {
    id: number;
    title: string;
    thumbnail: string;
    short_description: string;
    open_giveaway_url: string;
    platforms: string;
    genre: string;
    end_date: string;
}

const BASE_URL = 'https://www.gamerpower.com/api';

export async function getAllGames(): Promise<Game[]> {
    const res = await fetch(`${BASE_URL}/giveaways?type=game`);
    if (!res.ok) throw new Error(`GamerPower API error: ${res.status}`);
    return res.json() as Promise<Game[]>;
}

export async function getFilteredGames(platforms?: string, genres?: string): Promise<Game[]> {
    const games = await getAllGames();

    return games.filter((game) => {
        const matchesPlatform = platforms
            ? platforms.split(',').some((p) => game.platforms?.toLowerCase().includes(p.toLowerCase().trim()))
            : true;

        const matchesGenre = genres
            ? genres.split(',').some((g) => game.genre?.toLowerCase().includes(g.toLowerCase().trim()))
            : true;

        return matchesPlatform && matchesGenre;
    });
}