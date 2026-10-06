'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Monitor, Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useEffect, useState } from 'react'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

type ThemeOption = Theme | 'auto'

const options: { value: ThemeOption; label: string; Icon: React.ElementType }[] = [
  { value: 'auto', label: 'Auto', Icon: Monitor },
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
]

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState<ThemeOption | ''>('')

  const onThemeChange = (next: string) => {
    const themeToSet = next as ThemeOption
    setTheme(themeToSet === 'auto' ? null : themeToSet)
    setValue(themeToSet)
  }

  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey) as Theme | null
    setValue(preference ?? 'auto')
  }, [])

  return (
    <Tabs value={value} onValueChange={onThemeChange}>
      <TabsList
        aria-label="Select a theme"
        className="h-auto rounded-full p-1 border-text-base/20 border "
      >
        {options.map(({ value: optionValue, label, Icon }) => (
          <TabsTrigger
            key={optionValue}
            value={optionValue}
            aria-label={label}
            title={label}
            className="relative rounded-full px-4 py-3 md:px-3 md:py-2 data-[state=active]:bg-background data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-transparent"
          >
            {value === optionValue && (
              <motion.span
                layoutId="theme-selector-pill"
                className="absolute inset-0 rounded-full bg-background shadow-sm"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <Icon className="relative z-10 size-4" aria-hidden="true" />
            <span className="sr-only">{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
