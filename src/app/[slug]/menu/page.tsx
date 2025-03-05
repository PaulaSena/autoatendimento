import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";
import RestaurantHeader from "./components/header";
import RestaurantCategories from "./components/categories";


interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  //Join categorias e produtos
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include:{
      menuCategories:{
        include:{
          products:true
        },
      }
    }
});

   // console.log({restaurant})
    //console.log(restaurant?.menuCategories)

  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant}/>
    </div>
  );
};

export default RestaurantMenuPage;

// renderisando um client component dentro do server component para voltar uma pagina usando hooks- dentro do menu criar uma pasta chamada componentes e um arquivo chamado header


// http://localhost:3000/autoatendimento-lysena/menu?consumptionMethod=dine_in
