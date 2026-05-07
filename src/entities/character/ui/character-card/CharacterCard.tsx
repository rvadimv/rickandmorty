import type { Character } from '@/entities/character/model/types'
import s from './CharacterCard.module.scss'
import { Link, useLocation } from 'react-router-dom'

type CharacterCardProps = {
  character: Character
  firstEpisodeName?: string
}

export const CharacterCard = ({ character, firstEpisodeName }: CharacterCardProps) => {
  const { name, image, status, episode, species, location } = character

  const locationFrom = useLocation()

  return (
    <article className={s.card}>
      <img src={image} alt={name} className={s.img} />
      <div className={s.content}>
        <Link to={`/characters/${character.id}`} state={{ from: locationFrom }}>
          <h2 className={s.name}>{name}</h2>
        </Link>
        <span>
          {status} - {species}
        </span>
        <p>
          <span>Last known location:</span>
          <br />
          {location.name}
        </p>
        <p>First seen in: {firstEpisodeName ?? 'Unknown episode'}</p>
      </div>
    </article>
  )
}
