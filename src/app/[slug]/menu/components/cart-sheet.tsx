import { useContext, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { formatCurrency } from '@/helpers/format-currency';

import { CartContext } from '../contexts/cart';
import CartProductItem from './cart-product-item';
import FinishOrderDialog from './finish-order-dialog';

const CartSheet = () => {
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
          <SheetDescription className=" text-red-900 justify-center bold p-15">
            Que fominha! 😋 <br />
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col py-5 h-full pb-14">
          <div className="flex-auto ">
            {products.map((product) => (
              <h1 key={product.id}>
                <CartProductItem key={product.id} product={product} />
              </h1>
            ))}
          </div>

          {/* Total */}
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total </p>
                <p className="text-sm font-semibold">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>
          <Button
            className="w-80  rounded-full"
            type="submit"
            onClick={() => setFinishOrderDialogIsOpen(true)}
          >
            Finalizar
          </Button>
          <FinishOrderDialog
            open={finishOrderDialogIsOpen}
            onOpenChange={setFinishOrderDialogIsOpen}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
