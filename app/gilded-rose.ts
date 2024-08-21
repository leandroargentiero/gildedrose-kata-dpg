import { MINIMUM_QUALITY } from './contants/minimum-quality';
import { ItemName } from './enums/item.enum';

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  public updateQuality() {
    for (let item of this.items) {
      if (item.name === ItemName.Default) {
        this.updateDefaultItem(item);
        continue;
      }

      if (
        item.name != 'Aged Brie' &&
        item.name != 'Backstage passes to a TAFKAL80ETC concert'
      ) {
        if (item.quality > 0) {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            item.quality = item.quality - 1;
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != 'Aged Brie') {
          if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.quality > 0) {
              if (item.name != 'Sulfuras, Hand of Ragnaros') {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }

    return this.items;
  }

  private decreaseQuality(item: Item) {
    if (this.isAboveMinimumQuality(item)) {
      item.quality -= 1;
    }

    if (this.isAboveMinimumQuality(item) && this.hasPassedSellDate(item)) {
      item.quality -= 1;
    }

    return item.quality;
  }

  private decreaseSellIn(item: Item) {
    return (item.sellIn -= 1);
  }

  private hasPassedSellDate(item: Item) {
    return item.sellIn <= 0;
  }

  private isAboveMinimumQuality(item: Item) {
    return item.quality > MINIMUM_QUALITY;
  }

  private updateDefaultItem(item: Item) {
    item.quality = this.decreaseQuality(item);
    item.sellIn = this.decreaseSellIn(item);

    return item;
  }
}
