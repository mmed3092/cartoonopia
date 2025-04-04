type Character = {
  id: string
  active: boolean
  name: string
  subtitle: string
  description: string
  image_url: string
  strength: number
  speed: number
  skill: number
  fear_factor: number
  power: number
  intelligence: number
  wealth: number
}

type User = {
  _id: string
  username: string
  email: string
}

type Favourite = {
  user_id: {
    _id: string
  }
  characters: Array<string>
}

type Contribution = {
  contribution_id: string
  user_id: string
  action: "AddCharacter" | "EditCharacter" | "DeleteCharacter"
  status: "Approved" | "Pending" | "Rejected"
  reviewed_by: string | null
  date: string
  data: {
    id: string
    name?: string
    subtitle?: string
    description?: string
    image_url?: string
    strength?: number
    speed?: number
    skill?: number
    fear_factor?: number
    power?: number
    intelligence?: number
    wealth?: number
  }
}

type Change = {
  user_id: string
  action: "AddCharacter" | "EditCharacter" | "DeleteCharacter"
  reviewed_by: string
  date: Date
  character_id: string
  old_data: {
    id: string
    name?: string
    active?: boolean
    subtitle?: string
    description?: string
    image_url?: string
    strength?: number
    speed?: number
    skill?: number
    fear_factor?: number
    power?: number
    intelligence?: number
    wealth?: number
  }
  new_data: {
    id: string
    active?: boolean
    name?: string
    subtitle?: string
    description?: string
    image_url?: string
    strength?: number
    speed?: number
    skill?: number
    fear_factor?: number
    power?: number
    intelligence?: number
    wealth?: number
  }
}

export { Character, User, Favourite, Contribution, Change }
