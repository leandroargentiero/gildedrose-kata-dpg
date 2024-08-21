import { MAXIMUM_QUALITY } from '@/contants/maximum-quality.constant';
import { MINIMUM_QUALITY } from '@/contants/minimum-quality.constant';
import { ItemName } from '@/enums/item.enum';
import { Item } from './item.entity';

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  public updateQuality() {
    for (let item of this.items) {
      if (item.name === ItemName.Conjured) {
        this.updateConjuredItem(item);
        continue;
      }

      if (item.name === ItemName.BackStagePasses) {
        this.updateBackStagePassItem(item);
        continue;
      }

      if (item.name === ItemName.Sulfuras) {
        continue;
      }

      if (item.name === ItemName.AgedBrie) {
        this.updateAgedBrieItem(item);
        continue;
      }

      this.updateDefaultItem(item);
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

  private increaseQuality(item: Item) {
    return this.isBelowMaximumQuality(item)
      ? (item.quality += 1)
      : item.quality;
  }

  private isAboveMinimumQuality(item: Item) {
    return item.quality > MINIMUM_QUALITY;
  }

  private isBelowMaximumQuality(item: Item) {
    return item.quality < MAXIMUM_QUALITY;
  }

  private updateAgedBrieItem(item: Item) {
    item.quality = this.increaseQuality(item);
    item.sellIn = this.decreaseSellIn(item);

    return item;
  }

  private updateBackStagePassItem(item: Item) {
    if (item.sellIn <= 5) {
      item.quality = this.increaseQuality(item);
      item.quality = this.increaseQuality(item);
      item.quality = this.increaseQuality(item);
    }

    if (item.sellIn > 5 && item.sellIn <= 10) {
      item.quality = this.increaseQuality(item);
      item.quality = this.increaseQuality(item);
    }

    if (item.sellIn <= 0) {
      item.quality = 0;
    }

    item.sellIn = this.decreaseSellIn(item);

    return item;
  }

  private updateConjuredItem(item: Item) {
    item.quality = this.decreaseQuality(item);
    item.quality = this.decreaseQuality(item);
    item.sellIn = this.decreaseSellIn(item);

    return item;
  }

  private updateDefaultItem(item: Item) {
    item.quality = this.decreaseQuality(item);
    item.sellIn = this.decreaseSellIn(item);

    return item;
  }
}
