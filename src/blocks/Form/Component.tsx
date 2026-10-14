'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

// Direction-aware slide animation
const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 64 : -64, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -64 : 64, opacity: 0 }),
}

const transition = { duration: 0.22, ease: 'easeInOut' } as const

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    trigger,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  console.log(formFromProps)

  // Split fields into pages at every `pageBreak` block.
  // Empty pages (leading/trailing/double breaks) are dropped.
  const pages = useMemo(() => {
    const result: FormFieldBlock[][] = [[]]
    for (const field of formFromProps?.fields ?? []) {
      if ((field.blockType as string) === 'pageBreak') {
        result.push([])
      } else {
        result[result.length - 1].push(field)
      }
    }
    const nonEmpty = result.filter((page) => page.length > 0)
    return nonEmpty.length ? nonEmpty : [[]]
  }, [formFromProps?.fields])

  // Page state
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isValidating, setIsValidating] = useState(false)
  const isMultiPage = pages.length > 1
  const isLast = currentStep >= pages.length - 1

  // Validate only the current page's fields before advancing
  const handleNext = async () => {
    const names = pages[currentStep]
      .map((field) => ('name' in field ? field.name : undefined))
      .filter((name): name is string => Boolean(name))

    setIsValidating(true)
    const isStepValid = await trigger(names as Parameters<typeof trigger>[0])
    setIsValidating(false)

    if (isStepValid) {
      setDirection(1)
      setCurrentStep((s) => Math.min(s + 1, pages.length - 1))
    }
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentStep((s) => Math.max(0, s - 1))
  }

  // Enter on an early page advances instead of submitting
  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !isLast && !(e.target instanceof HTMLTextAreaElement)) {
      e.preventDefault()
      void handleNext()
    }
  }

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}

      {/* Bordered box animates its height via `layout`.
          borderRadius goes through `style` so Motion can scale-correct it. */}
      <motion.div
        layout
        style={{ borderRadius: '0.8rem' }}
        className="p-4 lg:p-6 border border-border bg-background overflow-hidden"
        transition={transition}
      >
        {/* Counter-scales the contents so nothing stretches mid-tween */}
        <motion.div layout="position" transition={transition}>
          <FormProvider {...formMethods}>
            {!isLoading && hasSubmitted && confirmationType === 'message' && (
              <RichText data={confirmationMessage} />
            )}
            {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
            {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
            {!hasSubmitted && (
              <form
                id={formID}
                // Only the last page is allowed to actually submit
                onSubmit={(e) => {
                  e.preventDefault()
                  if (isLast) void handleSubmit(onSubmit)(e)
                }}
                onKeyDown={onKeyDown}
              >
                {isMultiPage && (
                  <p className="mb-4 text-sm text-muted-foreground">
                    Step {currentStep + 1} of {pages.length}
                  </p>
                )}

                {/* Clips the sliding page; p-1 keeps focus rings visible */}
                <div className="relative overflow-hidden p-1">
                  <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={transition}
                      className="grid grid-cols-2 gap-x-4 gap-y-6"
                    >
                      {pages[currentStep]?.map((field, index) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const Field: React.FC<any> =
                          fields?.[field.blockType as keyof typeof fields]
                        const width = 'width' in field ? Number(field.width) : undefined
                        if (Field) {
                          return (
                            <div
                              className={cn('col-span-2', width === 50 && 'md:col-span-1')}
                              key={index}
                            >
                              <Field
                                form={formFromProps}
                                {...field}
                                {...formMethods}
                                control={control}
                                errors={errors}
                                register={register}
                                // grid handles width now; stop <Width> applying max-width %
                                width={undefined}
                              />
                            </div>
                          )
                        }
                        return null
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Button container */}
                <div className="mt-6 flex justify-between gap-4">
                  {isMultiPage && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrev}
                      disabled={currentStep === 0 || isValidating || isLoading}
                    >
                      Previous
                    </Button>
                  )}

                  {isLast ? (
                    <Button key="submit-btn" form={formID} type="submit" variant="default">
                      {submitButtonLabel}
                    </Button>
                  ) : (
                    <Button
                      key="next-btn"
                      type="button"
                      onClick={() => void handleNext()}
                      disabled={isValidating}
                    >
                      {isValidating ? 'Checking...' : 'Next'}
                    </Button>
                  )}
                </div>
              </form>
            )}
          </FormProvider>
        </motion.div>
      </motion.div>
    </div>
  )
}
