"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BookingDetails {
    movieTitle: string;
    showtime: string;
    seats: string[];
    totalCost: number;
}

const dummyBooking: BookingDetails = {
    movieTitle: "The Cinematic Adventure",
    showtime: "Saturday, 8:00 PM",
    seats: ["A1", "A2", "A3"],
    totalCost: 45,
};

const BookingSummary = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-secondary">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                    <CardDescription>Review your booking details before confirming.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p><strong>Movie:</strong> {dummyBooking.movieTitle}</p>
                        <p><strong>Showtime:</strong> {dummyBooking.showtime}</p>
                        <p><strong>Seats:</strong> {dummyBooking.seats.join(', ')}</p>
                        <p><strong>Total Cost:</strong> ${dummyBooking.totalCost}</p>
                    </div>
                    <div className="flex justify-between mt-6">
                        <Button variant="outline">Edit Booking</Button>
                        <Button>Confirm Booking</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BookingSummary;
