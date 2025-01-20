export interface BaseModelInterface {
  find: (id) => Promise<object>;
  findById: (id) => Promise<object>;
  save: (id) => Promise<object>;
  findOne: (id) => Promise<object>;
}
