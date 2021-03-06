/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import Event from '../../models/event';
import Booking from '../../models/booking';
import { transformEvent, transformBooking } from './utils';

type BookEventArgType = {
  eventId: string;
};

type CancelBookingArgType = {
  bookingId: string;
};

export default {
  bookings: async (args: any, req: any) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const bookings = await Booking.find({ user: req.userId });
      return bookings.map(booking => transformBooking(booking));
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  bookEvent: async (args: BookEventArgType, req: any) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const booking = await Booking.findOne({
        user: req.userId,
        event: args.eventId,
      });
      if (booking) {
        throw new Error('Already booked!');
      }
      const fetchedEvent = await Event.findOne({ _id: args.eventId });
      const newBooking = new Booking({
        user: req.userId,
        event: fetchedEvent,
      });
      const result = await newBooking.save();
      return transformBooking(result);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  cancelBooking: async (args: CancelBookingArgType, req: any) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate('event');
      const event = transformEvent(booking._doc.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
