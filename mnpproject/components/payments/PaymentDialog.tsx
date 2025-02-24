// PaymentDialog.tsx
"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface PaymentDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    livehouseName: string;
    livehousePrice: number;
    facilitiesPrice: number;
    qrCodeUrl: string;
    onPaymentComplete?: () => void;
    onFileUpload?: (file: File) => void;
}

export default function PaymentDialog({
    isOpen,
    onOpenChange,
    livehouseName,
    livehousePrice,
    facilitiesPrice,
    qrCodeUrl = "/api/placeholder/200/200", // Placeholder image
    onPaymentComplete = () => { },
    onFileUpload = () => { }
}: PaymentDialogProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const totalPrice: number = livehousePrice + facilitiesPrice;

    // Handle file selection
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files[0]) {
            const uploadedFile = e.target.files[0];
            setFile(uploadedFile);

            // Log file information
            console.log('File uploaded:', {
                name: uploadedFile.name,
                type: uploadedFile.type,
                size: `${(uploadedFile.size / 1024).toFixed(2)} KB`,
                lastModified: new Date(uploadedFile.lastModified).toLocaleString()
            });

            // Call the onFileUpload callback if provided
            if (onFileUpload) {
                onFileUpload(uploadedFile);
            }
        }
    };

    // Handle file drop
    const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            setFile(droppedFile);

            // Log file information
            console.log('File dropped:', {
                name: droppedFile.name,
                type: droppedFile.type,
                size: `${(droppedFile.size / 1024).toFixed(2)} KB`,
                lastModified: new Date(droppedFile.lastModified).toLocaleString()
            });

            // Call onFileUpload callback if provided
            if (onFileUpload) {
                onFileUpload(droppedFile);
            }
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

    // Handle payment completion
    const handlePaymentComplete = (): void => {
        // Log payment completion with file information
        console.log('Payment completed with file:', file ? {
            fileName: file.name,
            fileType: file.type,
            fileSize: `${(file.size / 1024).toFixed(2)} KB`
        } : 'No file uploaded');

        removeFile();
        onPaymentComplete();
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">Payment Details</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center space-y-4 py-4">
                    <Card className="w-full">
                        <CardContent className="pt-6">
                            {/* QR Code Section */}
                            <div className="flex flex-col items-center mb-6">
                                <p className="text-sm text-gray-500 mb-2">Scan to pay</p>
                                <div className="bg-white p-2 rounded-md mb-2">
                                    <Image
                                        src={qrCodeUrl}
                                        alt="Payment QR Code"
                                        width={200}
                                        height={200}
                                        className="mx-auto"
                                    />
                                </div>
                            </div>

                            {/* Payment Information Section */}
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Livehouse</span>
                                    <span className="font-medium">{livehouseName}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Livehouse Price</span>
                                    <span>฿{livehousePrice}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Facilities Price</span>
                                    <span>฿{facilitiesPrice}</span>
                                </div>

                                <Separator className="my-2" />

                                <div className="flex justify-between">
                                    <span className="font-semibold">Total Price</span>
                                    <span className="font-bold text-lg">฿{totalPrice}</span>
                                </div>
                            </div>

                            {/* File Upload Section */}
                            <div className="mt-6">
                                <Label htmlFor="payment-proof" className="text-sm font-medium mb-2 block">
                                    Upload Payment Proof
                                </Label>

                                <div
                                    className={`border-2 border-dashed rounded-lg p-6 mt-2 text-center cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'
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
                                                <div className="bg-primary/10 p-2 rounded-full mr-3">
                                                    <Upload size={16} className="text-primary" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-sm font-medium truncate max-w-[180px]">{file.name}</p>
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
                                            >
                                                <X size={16} />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="mx-auto w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                <Upload size={20} className="text-primary" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">Drop files here or click to upload</p>
                                                <p className="text-xs text-gray-500">Upload payment receipt or confirmation</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-2 mt-4 w-full">
                        <Button
                            variant="outline"
                            className="w-1/2"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="w-1/2"
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