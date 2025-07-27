import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  location: string;
  time: string;
  description: string;
  imageUrl: string;
  googleFormUrl: string;
  status: 'Upcoming' | 'Past';
  date: Date;
}

export type SerializedEvent = {
  _id: string;
  title: string;
  location: string;
  time: string;
  description: string;
  imageUrl: string;
  googleFormUrl: string;
  status: 'Upcoming' | 'Past';
  date: string;
};

export interface ICarouselImage extends Document {
  imageUrl: string;
}

export type SerializedCarouselImage = {
  _id: string;
  imageUrl: string;
};

const eventSchema: Schema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  googleFormUrl: { type: String, required: true },
  status: { type: String, enum: ['Upcoming', 'Past'], default: 'Upcoming' },
  date: { type: Date, required: true },
});

const carouselImageSchema: Schema = new Schema({
  imageUrl: { type: String, required: true },
});

const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);
export const CarouselImage = mongoose.models.CarouselImage || mongoose.model<ICarouselImage>('CarouselImage', carouselImageSchema);

export default Event;