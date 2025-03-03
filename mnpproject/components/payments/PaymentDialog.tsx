// PaymentDialog.tsx
"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface PaymentDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    livehouseName: string;
    livehousePrice: number;
    facilitiesPrice: number;
    qrCodeUrl: string;
    onPaymentComplete?: (file: File) => void;
    isLoading?: boolean; // Add isLoading prop
}

export default function PaymentDialog({
    isOpen,
    onOpenChange,
    livehouseName,
    livehousePrice,
    facilitiesPrice,
    qrCodeUrl,
    onPaymentComplete = () => { },
    isLoading = false, // Default to false
}: PaymentDialogProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const totalPrice: number = livehousePrice + facilitiesPrice;

    console.log('Dialog open state:', isOpen);
    console.log('File selected:', file);

    // Handle file selection
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files[0]) {
            const uploadedFile = e.target.files[0];
            setFile(uploadedFile);
            setValidationError(""); // Clear any previous validation errors
        }
    };

    // Handle file drop
    const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            setFile(droppedFile);
            setValidationError(""); // Clear any previous validation errors
        }
    };

    // Handle drag events
    const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        setIsDragging(false);
    };

    // Remove selected file
    const removeFile = (): void => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Handle payment completion with validation
    const handlePaymentComplete = (): void => {
        if (!file) {
            setValidationError("Please upload payment proof before confirming.");
            return;
        }

        // Call the onPaymentComplete callback with the file
        onPaymentComplete(file);

        // Reset state
        removeFile();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center font-bold">Payment Details</DialogTitle>
                </DialogHeader>

                {isLoading && (
                    <div className="absolute inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-lg font-semibold">Processing Payment...</p>
                            <div className="mt-4 flex justify-center">
                                {/* Add a spinner or loading animation here */}
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col items-center space-y-2 py-2">
                    <Card className="w-full">
                        <CardContent className="pt-4 px-4 ">
                            {/* Two-column layout for QR and payment info */}
                            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                                {/* QR Code Column */}
                                <div className="flex-shrink-0">
                                    <div className="bg-white p-1 rounded-md">
                                        <Image
                                            src={qrCodeUrl}
                                            alt="Payment QR Code"
                                            width={120}
                                            height={120}
                                            className="mx-auto"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 text-center mt-1">Scan to pay</p>
                                </div>

                                {/* Payment Information Column */}
                                <div className="flex-grow space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Livehouse</span>
                                        <span className="font-medium">{livehouseName}</span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Livehouse Price</span>
                                        <span>฿{livehousePrice}</span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Facilities Price</span>
                                        <span>฿{facilitiesPrice}</span>
                                    </div>

                                    <Separator className="my-1" />

                                    <div className="flex justify-between">
                                        <span className="font-semibold">Total Price</span>
                                        <span className="font-bold">฿{totalPrice}</span>
                                    </div>
                                </div>
                            </div>

                            {/* File Upload Section */}
                            <div className="mt-4">
                                <Label htmlFor="payment-proof" className="text-xs font-medium mb-1 block">
                                    Upload Payment Proof
                                </Label>

                                <div
                                    className={`border-2 border-dashed rounded-lg p-3 mt-1 text-center cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary/5' : validationError ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Input
                                        id="payment-proof"
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept="image/*,.pdf"
                                    />

                                    {file ? (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="bg-primary/10 p-1 rounded-full mr-2">
                                                    <Upload size={14} className="text-primary" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-xs font-medium truncate max-w-[150px]">{file.name}</p>
                                                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeFile();
                                                }}
                                                className="h-6 w-6"
                                            >
                                                <X size={14} />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                                <Upload size={12} className="text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium">Click to upload or drop files here</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Validation error message */}
                                {validationError && (
                                    <Alert variant="destructive" className="mt-2 py-2">
                                        <AlertTriangle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{validationError}</AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-2 w-full">
                        <Button
                            variant="outline"
                            className="w-1/2 py-1 h-8 text-sm"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="w-1/2 py-1 h-8 text-sm"
                            onClick={handlePaymentComplete}
                        >
                            Confirm Payment
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}