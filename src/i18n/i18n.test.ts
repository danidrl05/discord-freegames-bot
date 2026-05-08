import { describe, it, expect } from 'vitest';
import { t } from './index';
import en from './en';
import ca from './ca';
import es from './es';

describe('t()', () => {
  it('returns english translations for "en"', () => {
    expect(t('en')).toEqual(en);
  });

  it('returns catalan translations for "ca"', () => {
    expect(t('ca')).toEqual(ca);
  });

  it('returns spanish translations for "es"', () => {
    expect(t('es')).toEqual(es);
  });

  it('falls back to english for unknown language', () => {
    expect(t('fr')).toEqual(en);
    expect(t('')).toEqual(en);
    expect(t('xyz')).toEqual(en);
  });

  it('returns correct nested values', () => {
    expect(t('en').games.noGames).toBe('No free games found with your current filters.');
    expect(t('ca').settings.dailyEnabled).toBe('✅ Activat');
    expect(t('es').daily.header).toBe('🎮 ¡Juegos gratuitos de hoy!');
  });
});