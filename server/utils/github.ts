import type { H3Event } from 'h3'
import { Octokit } from 'octokit'

let _octokit: Octokit

export function useOctokit() {
  if (!_octokit) {
    _octokit = new Octokit({
      auth: process.env.NUXT_GITHUB_TOKEN,
    })
  }
  return _octokit
}

// In memory cache as this is called internally in /api/contributions
let RepoCache: Record<string, any> = new Map()

// Read more about caching functions https://hub.nuxt.com/docs/features/cache#server-functions-caching
export async function fetchRepo (owner: string, name: string) {
  if (RepoCache.has(`${owner}/${name}`)) {
    return RepoCache.get(`${owner}/${name}`)
  }
  // Fetch repository details to get owner type
  console.log(`Fetching repository details for ${owner}/${name}`)
  const { data } = await useOctokit().request('GET /repos/{owner}/{name}', {
    owner,
    name,
  })

  RepoCache.set(`${owner}/${name}`, data)
  return data
}
