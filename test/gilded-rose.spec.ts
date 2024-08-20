import { Item, GildedRose } from '@/gilded-rose';
import { MAXIMUM_QUALITY } from '@/contants/maximum-quality';
import { ItemName } from '@/enums/item.enum';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
});

describe('default items', () => {
  let gildedRose: GildedRose;

  beforeEach(() => {
    gildedRose = new GildedRose([]);
  });

  it('should update item for 1 day', () => {
    const newItem = new Item(ItemName.Default, 1, 1);
    gildedRose.items.push(newItem);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.name).toBe(ItemName.Default);
    expect(item.sellIn).toBe(0);
    expect(item.quality).toBe(0);
  });

  it('quality should decrease 2x when sell date has passed', () => {
    const newItem = new Item(ItemName.Default, 0, 4);
    gildedRose.items.push(newItem);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.name).toBe(ItemName.Default);
    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(2);
  });

  it('quality should never be negative', () => {
    const newItem = new Item(ItemName.Default, 0, 0);
    gildedRose.items.push(newItem);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.name).toBe(ItemName.Default);
    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(0);
  });
});

describe('aged brie items', () => {
  let gildedRose: GildedRose;

  beforeEach(() => {
    gildedRose = new GildedRose([]);
  });

  it('quality should increase', () => {
    const newItem = new Item(ItemName.AgedBrie, 2, 2);
    gildedRose.items.push(newItem);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.name).toBe(ItemName.AgedBrie);
    expect(item.sellIn).toBe(1);
    expect(item.quality).toBe(3);
  });

  it('quality should never be more than maximum quality', () => {
    const newItem = new Item(ItemName.AgedBrie, 2, MAXIMUM_QUALITY);
    gildedRose.items.push(newItem);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.name).toBe(ItemName.AgedBrie);
    expect(item.sellIn).toBe(1);
    expect(item.quality).toBe(MAXIMUM_QUALITY);
  });
});

describe('sulfura items', () => {
  let gildedRose: GildedRose;

  beforeEach(() => {
    gildedRose = new GildedRose([]);
  });

  it('should never be sold or decrease in quality', () => {
    const newItem = new Item(ItemName.Sulfuras, 2, 2);
    gildedRose.items.push(newItem);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.name).toBe(ItemName.Sulfuras);
    expect(item.sellIn).toBe(2);
    expect(item.quality).toBe(2);
  });
});

describe('backstage pass items', () => {
  let gildedRose: GildedRose;

  beforeEach(() => {
    gildedRose = new GildedRose([]);
  });

  it('quality should increase by 2 when sell in days are 10 or less', () => {
    const newItem = new Item(ItemName.BackStagePasses, 10, 2);
    gildedRose.items.push(newItem);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.name).toBe(ItemName.BackStagePasses);
    expect(item.sellIn).toBe(9);
    expect(item.quality).toBe(4);
  });
});
