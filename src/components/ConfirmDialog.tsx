import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { FC } from "react";

interface ConfirmDialogProps {
  showConfirmDialog: boolean;
  setShowConfirmDialog: (show: boolean) => void;
  handleConfirm: () => void;
};


export const ConfirmDialog : FC<ConfirmDialogProps> = ({ showConfirmDialog, setShowConfirmDialog, handleConfirm}) => {
  return (
    <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to perform this action
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex space-x-2 sm:justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowConfirmDialog(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
