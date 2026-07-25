import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

/** One `[icon] label … value` row in the project detail sidebar. */
export interface IProjectDetail {
  /** Key into the shared frontend icon registry (frontend/src/utils/detailIcons.ts). */
  icon: string;
  label: string;
  value: string;
}

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'ProjectCategory', required: true })
  category: MongooseSchema.Types.ObjectId;

  /**
   * Detail-page gallery, in display order. `image` stays the card cover and is
   * NOT part of this list; the viewer falls back to `[image]` when it is empty.
   */
  @Prop({ type: [String], default: [] })
  gallery: string[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  /**
   * Free-form detail rows. Mixed (not a sub-schema) on purpose: Mongoose would
   * stamp an `_id` onto every row, which the admin form then echoes back and
   * `forbidNonWhitelisted` rejects with a 400. Shape is enforced by the DTO.
   */
  @Prop({ type: [Object], default: [] })
  details: IProjectDetail[];

  /** External URL for the "زيارة المشروع مباشر" CTA. Empty hides the button. */
  @Prop({ type: String, trim: true, default: '' })
  projectLink: string;

  /** External URL for Figma Community CTA. Empty hides the button. */
  @Prop({ type: String, trim: true, default: '' })
  figmaLink: string;

  createdAt: Date;
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

// Indexes for better performance
ProjectSchema.index({ name: 'text', description: 'text' });
ProjectSchema.index({ category: 1 });

