"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Seat {
    id: string;
    isAvailable: boolean;
}

const dummySeats: Seat[] = Array.from({ length: 50 }, (_, i) => ({
    id: `Seat ${i + 1}`,
    isAvailable: i % 5 !== 0,
}));

const SeatSelection = () => {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const toggleSeat = (seatId: string) => {
        setSelectedSeats((prevSeats) =>
            prevSeats.includes(seatId)
                ? prevSeats.filter((id) => id !== seatId)
                : [...prevSeats, seatId]
        );
    };

    const isSeatSelected = (seatId: string) => selectedSeats.includes(seatId);

    return (
        <div className="flex justify-center items-center h-screen bg-secondary">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Select Your Seats</CardTitle>
                    <CardDescription>Choose your preferred seats for the show.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-10 gap-2">
                        {dummySeats.map((seat) => (
                            <Button
                                key={seat.id}
                                variant={isSeatSelected(seat.id) ? "default" : "outline"}
                                disabled={!seat.isAvailable}
                                onClick={() => toggleSeat(seat.id)}
                                className={isSeatSelected(seat.id) ? "bg-accent text-white" : ""}
                            >
                                {seat.id}
                            </Button>
                        ))}
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button>Continue to Booking</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SeatSelection;
