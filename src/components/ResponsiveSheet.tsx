"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { LoadingButton } from "@/components/ui/LoadingButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ResponsiveSheetProps {
  title?: React.ReactNode;
  titleClassName?: string;
  description?: React.ReactNode;
  headerClassName?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onMainBtnClick?: () => void;
  formId?: string;
  loading?: boolean;
  children?: React.ReactNode;
  hideMainBtn?: boolean;
  hideCloseBtn?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  className?: string;
  innerContentClassName?: string;
  footer?: React.ReactNode;
}

export function ResponsiveSheet(props: ResponsiveSheetProps) {
  const {
    title,
    titleClassName,
    description,
    headerClassName,
    open,
    setOpen,
    onMainBtnClick,
    loading,
    children,
    hideMainBtn,
    hideCloseBtn,
    formId,
    submitLabel = "Submit",
    cancelLabel = "Cancel",
    className,
    innerContentClassName,
    footer,
  } = props;

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const shouldRenderHeader = title || description;

  const hideFooter = hideMainBtn && hideCloseBtn;

  const defaultFooter = hideFooter ? null : (
    <div
      className={cn(
        "flex",
        isDesktop && "space-x-2.5",
        !isDesktop && "flex-col space-y-2.5",
      )}
    >
      {!hideCloseBtn && (
        <Button
          disabled={loading}
          onClick={() => setOpen(false)}
          className="flex-1"
          variant="outline"
        >
          {cancelLabel}
        </Button>
      )}
      {!hideMainBtn && (
        <LoadingButton
          loading={loading}
          disabled={loading}
          form={formId}
          type={onMainBtnClick ? "button" : "submit"}
          onClick={onMainBtnClick}
          className="flex-1"
        >
          {submitLabel}
        </LoadingButton>
      )}
    </div>
  );

  const footerContent = footer ?? defaultFooter;

  const contentComponent = <div className="px-2">{children}</div>;

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className={className}>
          {shouldRenderHeader && (
            <SheetHeader className={cn("text-left", headerClassName)}>
              {title && (
                <SheetTitle className={titleClassName}>{title}</SheetTitle>
              )}
              {description && (
                <SheetDescription>{description}</SheetDescription>
              )}
            </SheetHeader>
          )}
          <div className={cn("flex-1 overflow-y-auto", innerContentClassName)}>
            {contentComponent}
          </div>
          {footerContent && (
            <SheetFooter className="pt-2">{footerContent}</SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent
        className={cn("max-h-[100svh] h-[100svh] flex flex-col", className)}
      >
        {shouldRenderHeader && (
          <DrawerHeader className={cn("!text-left", headerClassName)}>
            {title && (
              <DrawerTitle className={titleClassName}>{title}</DrawerTitle>
            )}
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
        )}
        <div className={cn("flex-1 overflow-y-auto", innerContentClassName)}>
          {contentComponent}
        </div>
        {footerContent && (
          <DrawerFooter className="pt-2">
            {footer ? (
              footerContent
            ) : (
              <DrawerClose asChild>{footerContent}</DrawerClose>
            )}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
