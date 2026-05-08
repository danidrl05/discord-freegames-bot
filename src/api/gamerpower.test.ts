import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllGames, getFilteredGames } from './gamerpower';

const mockGames = [
  {
    id: 1,
    title: 'Game A',
    thumbnail: '',
    short_description: '',
    open_giveaway_url: 'https://example.com/a',
    platforms: 'PC, Steam',
    genre: 'RPG',
    end_date: '2026-12-31',
  },
  {
    id: 2,
    title: 'Game B',
    thumbnail: '',
    short_description: '',
    open_giveaway_url: 'https://example.com/b',
    platforms: 'PC, Epic Games Store',
    genre: 'Shooter',
    end_date: '2026-12-31',
  },
  {
    id: 3,
    title: 'Game C',
    thumbnail: '',
    short_description: '',
    open_giveaway_url: 'https://example.com/c',
    platforms: 'Android, iOS',
    genre: 'RPG',
    end_date: '2026-12-31',
  },
];

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => mockGames,
  }));
});

describe('getAllGames', () => {
  it('returns all games from the API', async () => {
    const games = await getAllGames();
    expect(games).toHaveLength(3);
  });

  it('throws an error if the API returns a non-ok response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 403 }));
    await expect(getAllGames()).rejects.toThrow('GamerPower API error: 403');
  });
});

describe('getFilteredGames', () => {
  it('returns all games when no filters are applied', async () => {
    const games = await getFilteredGames();
    expect(games).toHaveLength(3);
  });

  it('filters by platform', async () => {
    const games = await getFilteredGames('Steam');
    expect(games).toHaveLength(1);
    expect(games[0].title).toBe('Game A');
  });

  it('filters by genre', async () => {
    const games = await getFilteredGames(undefined, 'RPG');
    expect(games).toHaveLength(2);
  });

  it('filters by platform and genre combined', async () => {
    const games = await getFilteredGames('Android', 'RPG');
    expect(games).toHaveLength(1);
    expect(games[0].title).toBe('Game C');
  });

  it('filters with multiple platforms separated by comma', async () => {
    const games = await getFilteredGames('Steam, Epic Games Store');
    expect(games).toHaveLength(2);
  });

  it('returns empty array when no games match', async () => {
    const games = await getFilteredGames('GOG');
    expect(games).toHaveLength(0);
  });

  it('is case insensitive', async () => {
    const games = await getFilteredGames('steam');
    expect(games).toHaveLength(1);
  });
});