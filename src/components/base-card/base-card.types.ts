import type { MouseEvent } from 'react'

export interface BaseCardProps {
  title: string
  content: string
  useNew: boolean
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}
