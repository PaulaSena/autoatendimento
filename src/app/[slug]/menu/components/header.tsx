"use client"

import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantHeaderProps{
    restaurant: Pick<Restaurant,"name" | "coverImageUrl">;
}

const RestaurantHeader = ({restaurant}:RestaurantHeaderProps) => {
    const router =useRouter()
    return (
            <div>
      <div className="relative h-[250px] w-full">
      <Button variant="secondary" size="icon" className="absolute left-4 top-4 z-50 rounded-full" 
      onClick={()=>router.back()}>
   
   <ChevronLeftIcon/>
      </Button>
      
      <Image src={restaurant.coverImageUrl} alt={restaurant.name} fill className="object-cover" />
      
      <Button variant="secondary" size="icon" className="absolute right-4 top-4 z-50 rounded-full">
      <ScrollTextIcon/> 
      </Button> 
      </div>
    </div>
      );
      // receber a imagem como props interface direto do prisma, para usar o hooks e voltar pra pagina home
}
 
export default RestaurantHeader;