"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { submitQuoteRequest } from "@/app/actions/submit-request-form";

/* -------------------------------------------------------------------------- */
/*  Options                                                                    */
/* -------------------------------------------------------------------------- */

const SERVICES = [
  {
    id: "visual-identity",
    title: "Visual Identity",
    description: "Logo, color, type, and brand direction.",
  },
  {
    id: "design-system",
    title: "Design System",
    description: "Reusable components, tokens, and documentation.",
  },
  {
    id: "production-mvp",
    title: "Production MVP",
    description: "A shippable first version of your product.",
  },
] as const;

const TIMELINES = [
  { id: "1-week", title: "1 Week", description: "Fast turnaround." },
  { id: "2-weeks", title: "2 Weeks", description: "Standard pace." },
  { id: "1-month", title: "1 Month", description: "Room to explore." },
  {
    id: "not-sure",
    title: "Not sure?",
    description: "I'd like to chat with you first.",
  },
] as const;

const BUDGET = { min: 800, max: 20_000, step: 200 } as const;

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/* -------------------------------------------------------------------------- */
/*  Schema                                                                     */
/* -------------------------------------------------------------------------- */

const serviceIds = SERVICES.map((s) => s.id) as [string, ...string[]];
const timelineIds = TIMELINES.map((t) => t.id) as [string, ...string[]];

const quoteSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  services: z.array(z.enum(serviceIds)).min(1, "Select at least one service"),
  timeline: z.enum(timelineIds, {
    message: "Select a timeline",
  }),
  budget: z
    .array(z.number())
    .length(2)
    .refine(([lo, hi]) => lo <= hi, "Invalid budget range"),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;

// Map the fields to their corresponding step in the carousel for validation
const STEP_FIELDS: (keyof QuoteFormValues)[][] = [
  ["firstName", "lastName", "email", "phone"], // Step 0
  ["services"], // Step 1
  ["timeline"], // Step 2
  ["budget"], // Step 3
];

/* -------------------------------------------------------------------------- */
/*  Reusable card                                                              */
/* -------------------------------------------------------------------------- */

function ChoiceCard({
  id,
  title,
  description,
  selected,
  control,
}: {
  id: string;
  title: string;
  description: string;
  selected: boolean;
  control: React.ReactNode;
}) {
  return (
    <FieldLabel htmlFor={id}>
      <Field
        orientation="horizontal"
        className={cn(
          "cursor-pointer rounded-lg p-4 transition-colors dark:bg-input/30 dark:hover:bg-secondary/20 ",
          selected
            ? "border-primary bg-primary/5 ring-1 ring-primary"
            : "hover:bg-accent/50",
        )}
      >
        <FieldContent>
          <FieldTitle>{title}</FieldTitle>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        {control}
      </Field>
    </FieldLabel>
  );
}

/* -------------------------------------------------------------------------- */
/*  Form                                                                       */
/* -------------------------------------------------------------------------- */

export function QuoteRequestForm() {
  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      services: [],
      timeline: undefined,
      budget: [800, 3_000],
    },
  });

  const [status, setStatus] = useState<
    "not submitted" | "successful" | "error"
  >("not submitted");

  // Carousel API and Tracking State
  const [api, setApi] = useState<CarouselApi>();
  const [currentStep, setCurrentStep] = useState(0);
  const [isValidating, setIsValidating] = useState(false);

  const handleNext = async () => {
    setIsValidating(true); // Disable button

    const fieldsToValidate = STEP_FIELDS[currentStep];
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      api?.scrollNext();
    }

    setIsValidating(false); // Re-enable button
  };

  useEffect(() => {
    if (!api) return;

    // 1. Define a single handler for updating the step
    const updateStep = () => {
      setCurrentStep(api.selectedScrollSnap());
    };

    // 2. Call it once to set the initial state
    updateStep();

    // 3. Attach it to your event listeners
    api.on("select", updateStep);
    api.on("reInit", updateStep); // Good practice to catch re-initializations

    // 4. Clean up the listeners when the component unmounts
    return () => {
      api.off("select", updateStep);
      api.off("reInit", updateStep);
    };
  }, [api, setCurrentStep]);

  const handlePrev = () => {
    api?.scrollPrev();
  };

  const onSubmit = (values: QuoteFormValues) => {
    console.log(values);
    submitQuoteRequest(values)
      .then((res) => {
        if ("success" in res && res.success) {
          setStatus("successful");
        }
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  };

  if (status === "successful") {
    return <div>Request submitted successfully</div>;
  } else if (status === "not submitted") {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-8">
        {/* Progress Indicator */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium text-muted-foreground">
            Step {currentStep + 1} of {STEP_FIELDS.length}
          </p>
          <div className="flex gap-2">
            {STEP_FIELDS.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 w-10 rounded-full transition-colors",
                  currentStep >= index ? "bg-primary" : "bg-primary/20",
                )}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 
            watchDrag={false} ensures users can't swipe on mobile past the validation.
            We use setApi to connect our local state to the Embla instance.
          */}
          <Carousel setApi={setApi} opts={{ watchDrag: false }}>
            <Card className=" dark:bg-(--surface-subtle)">
              <CardContent>
                <CarouselContent className="p-1">
                  {/* Step 0: Contact */}
                  <CarouselItem>
                    <FieldSet>
                      <FieldLegend className="text-title font-bold">
                        Contact
                      </FieldLegend>
                      <FieldDescription>How can i reach you?</FieldDescription>

                      <FieldGroup>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field>
                            <FieldLabel htmlFor="firstName">
                              First name
                            </FieldLabel>
                            <Input id="firstName" {...register("firstName")} />
                            {errors.firstName && (
                              <FieldError>
                                {errors.firstName.message}
                              </FieldError>
                            )}
                          </Field>

                          <Field>
                            <FieldLabel htmlFor="lastName">
                              Last name
                            </FieldLabel>
                            <Input id="lastName" {...register("lastName")} />
                            {errors.lastName && (
                              <FieldError>{errors.lastName.message}</FieldError>
                            )}
                          </Field>
                        </div>

                        <Field>
                          <FieldLabel htmlFor="email">Email</FieldLabel>
                          <Input
                            id="email"
                            type="email"
                            {...register("email")}
                          />
                          {errors.email && (
                            <FieldError>{errors.email.message}</FieldError>
                          )}
                        </Field>

                        <Field>
                          <FieldLabel htmlFor="phone">Phone</FieldLabel>
                          <Input id="phone" type="tel" {...register("phone")} />
                          {errors.phone && (
                            <FieldError>{errors.phone.message}</FieldError>
                          )}
                        </Field>
                      </FieldGroup>
                    </FieldSet>
                  </CarouselItem>

                  {/* Step 1: Services */}
                  <CarouselItem>
                    <FieldSet>
                      <FieldLegend className="text-title font-bold">
                        Services
                      </FieldLegend>
                      <FieldDescription>
                        Select everything you need.
                      </FieldDescription>

                      <Controller
                        control={control}
                        name="services"
                        render={({ field }) => (
                          <FieldGroup className="gap-3">
                            {SERVICES.map((service) => {
                              const checked = field.value?.includes(service.id);
                              return (
                                <ChoiceCard
                                  key={service.id}
                                  id={service.id}
                                  title={service.title}
                                  description={service.description}
                                  selected={checked}
                                  control={
                                    <Checkbox
                                      id={service.id}
                                      checked={checked}
                                      onCheckedChange={(state) => {
                                        const next = state === true;
                                        field.onChange(
                                          next
                                            ? [...field.value, service.id]
                                            : field.value.filter(
                                                (v) => v !== service.id,
                                              ),
                                        );
                                      }}
                                    />
                                  }
                                />
                              );
                            })}
                          </FieldGroup>
                        )}
                      />
                      {errors.services && (
                        <FieldError>{errors.services.message}</FieldError>
                      )}
                    </FieldSet>
                  </CarouselItem>

                  {/* Step 2: Timeline */}
                  <CarouselItem>
                    <FieldSet>
                      <FieldLegend className="text-title font-bold">
                        Timeline
                      </FieldLegend>
                      <FieldDescription>
                        When do you need this?
                      </FieldDescription>

                      <Controller
                        control={control}
                        name="timeline"
                        render={({ field }) => (
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="gap-3"
                          >
                            {TIMELINES.map((t) => (
                              <ChoiceCard
                                key={t.id}
                                id={t.id}
                                title={t.title}
                                description={t.description}
                                selected={field.value === t.id}
                                control={
                                  <RadioGroupItem value={t.id} id={t.id} />
                                }
                              />
                            ))}
                          </RadioGroup>
                        )}
                      />
                      {errors.timeline && (
                        <FieldError>{errors.timeline.message}</FieldError>
                      )}
                    </FieldSet>
                  </CarouselItem>

                  {/* Step 3: Budget */}
                  <CarouselItem>
                    <FieldSet>
                      <FieldLegend className="text-title font-bold">
                        Budget
                      </FieldLegend>
                      <FieldDescription>
                        Drag to set your range.
                      </FieldDescription>

                      <Controller
                        control={control}
                        name="budget"
                        render={({ field }) => (
                          <Field className="gap-4 pt-2">
                            <div className="flex items-center justify-between text-sm font-medium">
                              <span>{usd.format(field.value[0])}</span>
                              <span>{usd.format(field.value[1])}</span>
                            </div>
                            <Slider
                              min={BUDGET.min}
                              max={BUDGET.max}
                              step={BUDGET.step}
                              value={field.value}
                              onValueChange={field.onChange}
                              minStepsBetweenThumbs={1}
                            />
                          </Field>
                        )}
                      />
                    </FieldSet>
                  </CarouselItem>
                </CarouselContent>
              </CardContent>
            </Card>

            {/* Custom Navigation Footer */}
            <div className="mt-6 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0 || isSubmitting || isValidating}
              >
                Previous
              </Button>

              {currentStep < STEP_FIELDS.length - 1 ? (
                <Button
                  key="next-btn"
                  type="button"
                  onClick={handleNext}
                  disabled={isValidating}
                >
                  {isValidating ? "Checking..." : "Next"}
                </Button>
              ) : (
                <Button key="submit-btn" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Request Quote"}
                </Button>
              )}
            </div>
          </Carousel>
        </form>
      </div>
    );
  } else {
    return (
      <div>There was an error sending your request. Please try again.</div>
    );
  }
}
