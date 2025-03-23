"use server";

import { ConsumptionMethod } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";
import { removeCpfPunctuation } from "../helpers/cpf";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  customerCel: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });
  if (!restaurant) {
    throw new Error("Restaurante não encontrado");
  }
  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });
 const productsWithPricesAndQuantities = input.products.map((product) => {
    const foundProduct = productsWithPrices.find((p) => p.id === product.id);
    if (!foundProduct) {
      throw new Error(`Product with ID ${product.id} not found`);
    }
    return {
      productId: product.id,
      quantity: product.quantity,
      price: foundProduct.price,
    };
  });

  if (productsWithPricesAndQuantities.length === 0) {
    throw new Error("No valid products were found for this order.");
  }
   //productId: product.id,
    //quantity: product.quantity,
    //price: productsWithPrices.find((p) => p.id === product.id)!.price,
    // }));
  const order = await db.order.create({
    data: {
      status: "PENDING",
      customerName: input.customerName,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      customerCel: input.customerCel,
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      total: productsWithPricesAndQuantities.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
      consumptionMethod: input.consumptionMethod,
      restaurantId: restaurant.id,
    },
  });

  if (!order) {
  throw new Error("Order creation failed");
}
revalidatePath(`/${input.slug}/orders`);
  // redirect(
  //   `/${input.slug}/orders?cpf=${removeCpfPunctuation(input.customerCpf)}`,
  // );
  return order;
};
