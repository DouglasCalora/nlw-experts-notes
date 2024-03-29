import type { BaseCardProps } from './base-card.types'

import { clsx } from 'clsx'

function Shadow () {
  return (
    <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none' />
  )
}

export function BaseCard (props: BaseCardProps) {
  const staticClasses = 'rounded-md text-left flex outline-none p-5 text-sm relative hover:ring-2 hover:ring-slate-700 focus-visible:ring-2 focus-visible:ring-lime-400'

  const classes = clsx(
    staticClasses,

    props.useNew
      ? 'bg-slate-700 hover:ring-slate-700 focus-visible:ring-lime-400'
      : 'bg-slate-800 hover:ring-slate-700'
  )

  return (
    <button
      className={classes}
      onClick={props.onClick}
    >
      <div className='space-y-3'>
        <span className='text-slate-300 font-medium leading-5'>
          {props.title}
        </span>

        <p className='text-slate-400 left-6'>
          {props.content}
        </p>
      </div>

      {!props.useNew && <Shadow />}
    </button>
  )
}
