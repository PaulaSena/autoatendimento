
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
 } from "@/components/ui/sheet";
 
 import { CartContext } from "../contexts/cart";
 import CartProductItem from "./cart-product-item";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useContext } from "react";
 
 const CartSheet = () => {
   const { isOpen, toggleCart, products } = useContext(CartContext);
   return (
     <Sheet open={isOpen} onOpenChange={toggleCart}>
       <SheetContent className="w-[80%]">
         <SheetHeader>         
           <SheetTitle className="text-left">Sacola</SheetTitle>
            <SheetDescription className="caret-red-600 bold p-15">
               Que fominha! <br />
             </SheetDescription>
         </SheetHeader>
         {products.map((product: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
           <h1 key={product.id}>
             {product.name} - {product.quantity}
           </h1>
         ))}
         <div className="py-5">
           {products.map((product) => (
             <CartProductItem key={product.id} product={product} />
           ))}
         </div>
       </SheetContent>
     </Sheet>
   );
  }
 
export default CartSheet;
