import { v4 as uuid } from 'uuid';

interface Data {
  id: string;
}

type CreateData<T extends Data> = Omit<T, 'id'>;
type UpdateData<T extends Data> = Partial<Omit<T, 'id'>>;

export class TemporaryDatabase<T extends Data> {
  private readonly dataBase = new Map<Data['id'], T>();

  public createData(data: CreateData<T>): T {
    const item = { ...data, id: uuid() } as T;
    this.dataBase.set(item.id, item);
    return item;
  }

  public getDataById(id: Data['id']): T | null {
    return this.dataBase.get(id) ?? null;
  }

  public getData() {
    return [...this.dataBase.values()];
  }

  public getDataByField(field: keyof T, value: unknown): T | null {
    for (const item of this.getData()) {
      if (item[field] === value) return item;
    }
    return null;
  }

  public getDatasByField(field: keyof T, value: unknown): T[] {
    const items: T[] = [];
    for (const item of this.getData()) {
      if (item[field] === value) items.push(item);
    }
    return items;
  }

  public deleteData(id: Data['id']): T | null {
    const item = this.getDataById(id);
    if (!item) return null;
    this.dataBase.delete(id);
    return item;
  }

  public updateData(id: Data['id'], data: UpdateData<T>): T | null {
    const item = this.deleteData(id);
    if (!item) return null;
    const updatedItem = { ...item, ...data };
    this.dataBase.set(id, updatedItem);
    return updatedItem;
  }
}
