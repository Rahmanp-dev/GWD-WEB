import EventForm from "@/components/forms/EventForm";

const NewEventPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Event</h1>
      <EventForm isNew={true} />
    </div>
  );
};

export default NewEventPage;