'Use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { isValidCpf } from '@/helpers/cpf';

const formSchema = z.object({
  name: z.string().trim().min(5, {
    message: 'O nome é Obrigatório.',
  }),
  cel: z.string().trim().min(10).max(13, {
    message: 'O número de whatsap obrigatório para entrega do produto.',
  }),
  cpf: z
    .string()
    .trim()
    .min(5, {
      message: 'O CPF é obrigatório.',
    })
    .refine((value) => isValidCpf(value), {
      message: 'CPF inválido.',
    }),
});

type formSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const [isLoading] = useState(false);
  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      cel: '',
      cpf: '',
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data: formSchema) => {
    console.log({ data });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex justify-center">
            Finalizar Pedido
          </DrawerTitle>
          <DrawerDescription className="flex justify-center pt-2">
            Preencha os campos corretamente para facilitar a entrega do seu
            pedido!
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full rounded-full space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome:</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Qual seu número com DDD."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Digite seu CPF:</FormLabel>
                    <FormControl>
                      {/*<Input placeholder="Qual número do seu CPF." {...field} />*/}
                      <PatternFormat
                        placeholder=" Qual numero do seu CPF..."
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <div className="flex justify-between">
                  <DrawerClose asChild className="shadow-2xl">
                    <Button
                      className="mr-2 w-40 rounded-full"
                      variant="destructive"
                    >
                      Cancelar
                    </Button>
                  </DrawerClose>

                  <Button
                    type="submit"
                    variant="outline"
                    className=" shadow-slate-300 w-full rounded-full bg-lime-600 text-slate-200"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2Icon className="animate-ping" />}
                    Finalizar
                  </Button>
                </div>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;
