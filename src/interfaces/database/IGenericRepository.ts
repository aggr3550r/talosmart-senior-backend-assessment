import { PageOptionsDTO } from '../../dtos/paging/page-options.dto';

export interface IGenericRepository<T> {
  findById(id: string, withFields?: boolean): Promise<T>;
  create(data: T): Promise<T>;
  update(id: string, data: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
  filter(pageOptionsDTO: PageOptionsDTO): Promise<any>;
}
