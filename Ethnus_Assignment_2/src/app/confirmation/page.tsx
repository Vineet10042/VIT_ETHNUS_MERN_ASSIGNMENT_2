"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { generateQRCode } from '@/services/qr-code';

const ConfirmationPage = () => {
    const [qrCode, setQrCode] = useState<string | null>(null);

    useEffect(() => {
        const generateQrCode = async () => {
            const data = "Booking Reference: 12345XYZ";
            const qrCodeDataURL = await generateQRCode(data);
            setQrCode(qrCodeDataURL);
        };

        generateQrCode();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-secondary">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Booking Confirmed!</CardTitle>
                    <CardDescription>Your booking is successful. Here are the details.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <p className="mb-4">Your booking reference: <strong>12345XYZ</strong></p>
                    {qrCode && (
                        <img src={qrCode} alt="QR Code" className="w-48 h-48 mb-4" />
                    )}
                    <p className="text-sm text-muted-foreground">
                        Show this QR code at the entrance for validation.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default ConfirmationPage;
