import type { Character } from '@/entities/character/model/types'
import s from './CharacterCard.module.scss'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

type CharacterCardProps = {
  character: Character
  firstEpisodeName?: string
  isEpisodeLoading?: boolean
}

type StatusIndicator = 'unknown' | 'alive' | 'dead'

export const CharacterCard = ({
  character,
  firstEpisodeName,
  isEpisodeLoading,
}: CharacterCardProps) => {
  const { name, image, status, species, location } = character

  const locationFrom = useLocation()

  const statusIndicator: StatusIndicator =
    status === 'Alive' ? 'alive' : status === 'Dead' ? 'dead' : 'unknown'

  return (
    <article>
      <Link className={s.card} to={`/characters/${character.id}`} state={{ from: locationFrom }}>
        <img src={image} alt={name} className={s.img} />
        <div className={s.content}>
          <h2 className={s.title}>{name}</h2>
          <span className={s.status}>
            <span className={clsx(s.statusIcon, s[`statusIcon--${statusIndicator}`])} />
            {status} - {species}
          </span>
          <p className={s.meta}>
            <span className={s.label}>Last known location:</span>
            <span className={s.value}>{location.name}</span>
          </p>
          <p className={s.meta}>
            <span className={s.label}>First seen in:</span>
            <span className={s.value}>
              {isEpisodeLoading ? '\u00A0' : (firstEpisodeName ?? 'Unknown episode')}
            </span>
          </p>
        </div>
      </Link>
    </article>
  )
}
