'use client'

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SignOutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

export default function SignOutDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  message = "คุณต้องการออกจากระบบใช่หรือไม่?" 
}: SignOutDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-zinc-800 text-zinc-100 border-zinc-700">
        <AlertDialogHeader>
          <AlertDialogTitle>ยืนยันการออกจากระบบ</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-700 text-zinc-100 hover:bg-zinc-600 hover:text-zinc-100">
            ยกเลิก
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            ออกจากระบบ
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}