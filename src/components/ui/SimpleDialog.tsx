import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
} from "@/components/ui/drawer";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface SimpleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  text?: any;
  actionButtonText?: any;
  actionButtonFormId?: string;
  actionButtonType?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  onGoBack?: () => void;
  isLoading?: boolean;
  className?: string;
}

function SimpleDialog({
  isOpen,
  onClose,
  children,
  title,
  text,
  actionButtonText,
  actionButtonFormId,
  onClick,
  isLoading = false,
  onGoBack,
  className,
}: SimpleDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const isTextHeader = Boolean(title || text);

  const actionButton = actionButtonText ? (
    <div className="w-full">
      <LoadingButton
        loading={isLoading}
        type={onClick ? "button" : "submit"}
        form={actionButtonFormId}
        className="w-full"
        onClick={onClick}
      >
        {actionButtonText}
      </LoadingButton>
    </div>
  ) : undefined;

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/5 z-[1100]" />
          <DialogContent
            className={cn(
              "z-[1101] h-[90vh] overflow-hidden border-none",
              className,
            )}
          >
            {(isTextHeader || onGoBack) && (
              <DialogHeader>
                {onGoBack && (
                  <Button
                    className="mb-4"
                    onClick={onGoBack}
                    size="icon"
                    variant="ghost"
                  >
                    <ArrowLeft />
                  </Button>
                )}

                {title && <DialogTitle>{title}</DialogTitle>}
                {text && <DialogDescription>{text}</DialogDescription>}
              </DialogHeader>
            )}
            <div className="flex-1 overflow-auto">{children}</div>
            <DialogFooter>{actionButton}</DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 bg-black/5 z-[1100]" />
        <DrawerContent
          className={cn(
            "z-[1101] h-[90vh] overflow-hidden border-none p-0",
            className,
          )}
        >
          {isTextHeader && (
            <DrawerHeader className="text-left">
              {title && <DrawerTitle>{title}</DrawerTitle>}
              {text && <DrawerDescription>{text}</DrawerDescription>}
            </DrawerHeader>
          )}
          <div className="flex-1 overflow-auto px-4">{children}</div>

          <DrawerFooter className="pt-2">{actionButton}</DrawerFooter>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}

export default SimpleDialog;
