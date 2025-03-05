"use client"
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MenuCategory, Prisma, Restaurant } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

 //Join categorias e produtos  

interface RestaurantCategoriesProps{
    restaurant: Prisma.RestaurantGetPayload<{
        
        include:{
        menuCategories:{
            include:{
            products:true
            },
        }
        }
    }>;
}

const RestaurantCategories = ({restaurant}:RestaurantCategoriesProps) => {
   
   //criar usestate para armazenar a categoria e não precisar recarregar a pagina
   const[selectedCategory, setSelectedCategory]=useState<MenuCategory>(restaurant.menuCategories[0])
   //Clicar em uma categoria e selecionar ela
   const handleCategoryClick=(category:MenuCategory)=>{
    setSelectedCategory(category)
   }
   const getCategoryButtonVariant=(category: MenuCategory)=>{
    return selectedCategory.id === category.id?"default":"secondary" 
   }

   return ( 

        <div className="relative z-50 mt-[-1rem] rounded-t-3xl border bg-white">
            <div className="p-5">

                <div className="flex items-center gap-3 ">
                    <Image 
                    src={restaurant.avatarImageUrl} 
                    alt={restaurant.name} 
                    height={45} 
                    width={45}
                    />
                    <div>
                        <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                        <p className="text-xs opacity-55">{restaurant.description}</p>
                    </div>
        
                </div>
            <div className=" flex items-center gap-1 text-xs text-green-500 pt-2">
                        <ClockIcon size={12}/>
                        <p>Aberto!</p>
                    </div>
                    <ScrollArea className="w-full">
                        <div className="flex w-max space-x-4 pd-5 pt-2">
                            {restaurant.menuCategories.map(category =>(
                            <Button onClick={()=> handleCategoryClick (category)}key={category.id} variant={
                               getCategoryButtonVariant(category)
                               }size="sm" className="rounded-full">
                                    {category.name}
                                </Button>
                            ))}

                        </div>
                        <ScrollBar orientation="horizontal" className="pt-4"/>
                    </ScrollArea>

            </div>
        </div>
     );
    };
 
export default RestaurantCategories;