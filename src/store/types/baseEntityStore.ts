export interface BaseEntityStore {
  create: { status?: statusEnum; message?: string };
  update: { status?: statusEnum; message?: string };
  list?: { status?: statusEnum; message?: string };
  get?: { status?: statusEnum; essage?: string };
  delete?: { status?: statusEnum; message?: string };
  archive?: { status?: statusEnum; message?: string };
}

export enum statusEnum {
  idle = "idle",
  loading = "loading",
  success = "success",
  error = "error",
}
