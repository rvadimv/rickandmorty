import type { Character } from '@/entities/character/model/types'
import s from './CharacterCard.module.scss'

type CharacterCardProps = {
  character: Character
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const { name, image, episode, status, species, location } = character

  return (
    <div className={s.characterCard}>
      <div className={s.left}>
        <img src={image} alt={name} />
      </div>
      <div className={s.right}>
        <h2>{name}</h2>
        <p>
          {status} - {species}
        </p>
        <p>Last known location:</p>
        <p>{location.name}</p>
        <p>First seen in:</p>
        <p>{episode[0]}</p>
      </div>
    </div>
  )
}
