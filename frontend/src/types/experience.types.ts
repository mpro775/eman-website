export interface Experience {
    _id: string;
    name: string;
    description: string;
    order: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateExperienceDto {
    name: string;
    description: string;
    order?: number;
}

export interface UpdateExperienceDto extends Partial<CreateExperienceDto> { }
