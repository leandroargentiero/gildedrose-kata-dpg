import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  it('should update item for 1 day', () => {
    const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(0);
  });
});
