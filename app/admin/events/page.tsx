"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SerializedEvent } from "@/lib/models/Event";

const AdminEventsPage = () => {
    const [events, setEvents] = useState<SerializedEvent[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await fetch('/api/admin/events');
            const { data } = await res.json();
            setEvents(data);
        };
        fetchEvents();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this event?')) {
            try {
                const res = await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
                if (!res.ok) {
                    throw new Error('Failed to delete event');
                }
                setEvents(events.filter(event => event._id !== id));
                router.refresh();
            } catch (error) {
                console.error(error);
                alert('Failed to delete event');
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Events</h1>
                <Link href="/admin/events/new">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                        Add New Event
                    </button>
                </Link>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="py-3">Title</th>
                            <th className="py-3">Date</th>
                            <th className="py-3">Status</th>
                            <th className="py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event._id} className="border-b border-gray-700">
                                <td className="py-4">{event.title}</td>
                                <td className="py-4">{new Date(event.date).toLocaleDateString()}</td>
                                <td className="py-4">{event.status}</td>
                                <td className="py-4">
                                    <Link href={`/admin/events/${event._id}/edit`}>
                                        <button className="text-blue-400 hover:text-blue-300 mr-4">Edit</button>
                                    </Link>
                                    <button onClick={() => handleDelete(event._id)} className="text-red-400 hover:text-red-300">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminEventsPage;