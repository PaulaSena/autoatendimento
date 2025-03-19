'Use client';
import { zodResolver } from '@hookform/resolvers/zod';
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
    .min(5)
    .refine((value) => isValidCpf(value), {
      message: 'CPF invalido.',
    }),
});

type formSchema = z.infer<typeof formSchema>;

const FinishOrderButton = () => {
  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      cel: '',
      cpf: '',
    },
  });

  const onsubmit = (data: formSchema) => {
    console.log({ data });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-full rounded-full "> Finalizar pedido</Button>
      </DrawerTrigger>
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
              onSubmit={form.handleSubmit(onsubmit)}
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
                  <DrawerClose asChild className="shadow-slate-500">
                    <Button className="w-55 rounded-full" variant="destructive">
                      {' '}
                      Cancelar{' '}
                    </Button>
                  </DrawerClose>
                  <Button className="w-80  rounded-full" type="submit">
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

export default FinishOrderButton;
