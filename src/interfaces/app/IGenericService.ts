import { PageOptionsDTO } from '../../dtos/paging/page-options.dto';
import { PageDTO } from '../../dtos/paging/page.dto';

export interface IGenericAppService<T> {
  create(data: T, id?: string): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
  findById(id: string, withException?: boolean): Promise<T>;
  getAll(queryOptions: PageOptionsDTO, userId?: string): Promise<PageDTO<T>>;
}
