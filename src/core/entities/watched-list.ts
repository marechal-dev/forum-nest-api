export abstract class WatchedList<TItem> {
  public currentItems: TItem[];
  private initial: TItem[];
  private new: TItem[];
  private removed: TItem[];

  public constructor(initialItems?: TItem[]) {
    this.currentItems = initialItems || [];
    this.initial = initialItems || [];
    this.new = [];
    this.removed = [];
  }

  abstract compareItems(a: TItem, b: TItem): boolean;

  public getItems(): TItem[] {
    return this.currentItems;
  }

  public getNewItems(): TItem[] {
    return this.new;
  }

  public getRemovedItems(): TItem[] {
    return this.removed;
  }

  private isCurrentItem(item: TItem): boolean {
    return (
      this.currentItems.filter((v: TItem) => this.compareItems(item, v))
        .length !== 0
    );
  }

  private isNewItem(item: TItem): boolean {
    return (
      this.new.filter((v: TItem) => this.compareItems(item, v)).length !== 0
    );
  }

  private isRemovedItem(item: TItem): boolean {
    return (
      this.removed.filter((v: TItem) => this.compareItems(item, v)).length !== 0
    );
  }

  private removeFromNew(item: TItem): void {
    this.new = this.new.filter((v) => !this.compareItems(v, item));
  }

  private removeFromCurrent(item: TItem): void {
    this.currentItems = this.currentItems.filter(
      (v) => !this.compareItems(item, v),
    );
  }

  private removeFromRemoved(item: TItem): void {
    this.removed = this.removed.filter((v) => !this.compareItems(item, v));
  }

  private wasAddedInitially(item: TItem): boolean {
    return (
      this.initial.filter((v: TItem) => this.compareItems(item, v)).length !== 0
    );
  }

  public exists(item: TItem): boolean {
    return this.isCurrentItem(item);
  }

  public add(item: TItem): void {
    if (this.isRemovedItem(item)) {
      this.removeFromRemoved(item);
    }

    if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
      this.new.push(item);
    }

    if (!this.isCurrentItem(item)) {
      this.currentItems.push(item);
    }
  }

  public remove(item: TItem): void {
    this.removeFromCurrent(item);

    if (this.isNewItem(item)) {
      this.removeFromNew(item);

      return;
    }

    if (!this.isRemovedItem(item)) {
      this.removed.push(item);
    }
  }

  public update(items: TItem[]): void {
    const newItems = items.filter((a) => {
      return !this.getItems().some((b) => this.compareItems(a, b));
    });

    const removedItems = this.getItems().filter((a) => {
      return !items.some((b) => this.compareItems(a, b));
    });

    this.currentItems = items;
    this.new = newItems;
    this.removed = removedItems;
  }
}
