import * as React from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ProductDescriptionProps } from "@/types/common";
import { ProductDescriptionScreen } from "./ProductDescriptionScreen";

function ProductDescriptionDialog(props: ProductDescriptionProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={!!props.productId} onOpenChange={props.onClose}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/5 z-[1050]" />
          <DialogContent className="z-[1051] h-[90vh] overflow-hidden border-none p-0">
            <VisuallyHidden>
              <DialogTitle />
            </VisuallyHidden>
            {props.productId && <ProductDescriptionScreen {...props} />}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={Boolean(props.productId)}
      onOpenChange={() => props.onClose()}
    >
      <DrawerContent className="z-[1051] h-[90vh] overflow-hidden border-none p-0">
        {props.productId && <ProductDescriptionScreen {...props} />}
      </DrawerContent>
    </Drawer>
  );
}

export default ProductDescriptionDialog;
