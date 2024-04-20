'use client'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React, { ReactNode } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { upsertPromptSchema } from '@/app/app/_components/upsertPromptSchema'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DialogTriggerProps } from '@radix-ui/react-dialog'
import { addOrUpdatePrompt } from './actions'
import { useToast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'
import { Loader, Trash2 } from 'lucide-react'

interface AddPromptModalTypes extends DialogTriggerProps {
  children: ReactNode
  dataPrompt?: { id?: string; tags?: string[] }
}

export default function AddPromptModal({
  children,
  dataPrompt,
  ...rest
}: AddPromptModalTypes) {
  const [tags, setTags] = React.useState<string[]>(dataPrompt?.tags ?? [''])
  const [openModal, setOpenModal] = React.useState<boolean>(false)

  const { toast } = useToast()
  const formDefaultValues = dataPrompt ? dataPrompt : {}

  const form = useForm<z.infer<typeof upsertPromptSchema>>({
    resolver: zodResolver(upsertPromptSchema),
    defaultValues: formDefaultValues,
  })

  function removeTag(index: number) {
    const newTags = tags.filter((_, i) => i !== index)
    setTags(newTags)
    form.setValue('tags', newTags) // Atualizar o estado dos campos do formulário
  }

  async function onSubmit(values: z.infer<typeof upsertPromptSchema>) {
    if (dataPrompt) {
      values = { ...values, id: dataPrompt.id }
    }

    await addOrUpdatePrompt(values)
    form.reset()
    toast({
      title: 'Sucesso!',
      description: 'Seu prompt está pronto para uso.',
    })
    setOpenModal(false)
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger {...rest} onClick={() => setOpenModal(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="m-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input placeholder="Titulo do prompt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Textarea placeholder=" Texto do prompt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-2">
              {tags.map((field, index) => (
                <div key={index}>
                  <FormField
                    control={form.control}
                    name={`tags.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Tag {index + 1}
                          <Button
                            type="button"
                            variant={'link'}
                            size={'icon'}
                            onClick={() => removeTag(index)}
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </Button>
                        </FormLabel>
                        <FormDescription />
                        <FormControl>
                          <Input
                            autoComplete="off"
                            {...field}
                            placeholder="Tag do prompt"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button
                type="button"
                variant={'secondary'}
                onClick={() => setTags([...tags, ''])}
              >
                Adicionar tag
              </Button>

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader size={16} className="animate-spin" />
                )}
                Enviar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
