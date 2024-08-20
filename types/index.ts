export interface Contributions {
  user: {
    username: string
    name: string
    avatar: string
  }
  prs: {
    repo: string
    title: string
    url: string
    created_at: string
    state: 'merged' | 'open' | 'closed'
    number: string
  }[]
}
