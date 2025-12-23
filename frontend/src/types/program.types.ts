export interface UsedProgram {
  _id: string;
  image: string;
  name: string;
  orderNumber: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUsedProgramDto {
  image: string;
  name: string;
  orderNumber?: number;
}

export interface UpdateUsedProgramDto extends Partial<CreateUsedProgramDto> {}

