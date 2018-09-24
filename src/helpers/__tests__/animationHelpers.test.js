import * as helpers from '../animationHelpers';

// jest.useFakeTimers();

describe('Test animationHelpers', () => {
  describe('Test pause', () => {
    it('Pauses for 2000ms', async () => {
      const result = await helpers.pause();
      expect(result).toEqual('ok');
      // expect(setTimeout).toHaveBeenCalledTimes(1);
      // expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    });

    it('Pauses for 500ms', async () => {
      const result = await helpers.pause(500);
      expect(result).toEqual('ok');
      // expect(setTimeout).toHaveBeenCalledTimes(1);
      // expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    });
  });

  describe('Test shouldAnimateCard', () => {
    it('should animate', () => {
      const input = { old: { flip: false }, current: { flip: true } };
      const result = helpers.shouldAnimateCard(input);
      expect(result).toEqual(true);
    });

    it('should NOT animate', () => {
      const input = { old: { flip: true }, current: { flip: true } };
      const result = helpers.shouldAnimateCard(input);
      expect(result).toEqual(false);
    });
  });

  describe('Test isCentered ', () => {
    it('should animate', () => {
      const input = { old: { centered: false }, current: { centered: true } };
      const result = helpers.isCentered(input);
      expect(result).toEqual(true);
    });

    it('should NOT animate current is true', () => {
      const input = { old: { flip: true }, current: { flip: true } };
      const result = helpers.isCentered(input);
      expect(result).toEqual(false);
    });

    it('should NOT animate current is false', () => {
      const input = { old: { flip: true }, current: { flip: false } };
      const result = helpers.isCentered(input);
      expect(result).toEqual(false);
    });
  });

  describe('Test shouldAnimateOff ', () => {
    it('should animate', () => {
      const table = [{ code: '123' }];
      const input = { current: { winner: 3, table, code: '123' } };
      const result = helpers.shouldAnimateOff(input);
      expect(result).toEqual(true);
    });

    it('should NOT animate, card code is not in table', () => {
      const table = [{ code: '13' }];
      const input = { current: { winner: null, table, code: '123' } };
      const result = helpers.shouldAnimateOff(input);
      expect(result).toEqual(false);
    });

    it('should NOT animate, winner is null', () => {
      const table = [{ code: '123' }];
      const input = { current: { winner: null, table, code: '123' } };
      const result = helpers.shouldAnimateOff(input);
      expect(result).toEqual(false);
    });
  });

  describe('Test shouldRotateCard  ', () => {
    it('should animate card is in new, but not in old table', () => {
      const table = [{ code: '123' }, { code: '13' }];
      const input = { current: { winner: 3, table, code: '123' }, old: { table: [{ code: '13' }] } };
      const result = helpers.shouldRotateCard(input);
      expect(result).toEqual(true);
    });

    it('should NOT animate, card code is not in either tables', () => {
      const table = [{ code: '13' }];
      const input = { current: { winner: 3, table, code: '123' }, old: { table: [{ code: '13' }] } };
      const result = helpers.shouldRotateCard(input);
      expect(result).toEqual(false);
    });

    it('should NOT animate, card code is in both tables', () => {
      const table = [{ code: '123' }];
      const input = { current: { winner: 3, table, code: '123' }, old: { table: [{ code: '123' }] } };
      const result = helpers.shouldRotateCard(input);
      expect(result).toEqual(false);
    });
  });
});
