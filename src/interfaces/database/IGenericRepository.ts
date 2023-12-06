export interface IGenericRepository<T> {
  findById(): Promise<T>;
  create(): Promise<T>;
  update(): Promise<T>;
  delete(): Promise<T>;
  filter(): Promise<any>;
}
