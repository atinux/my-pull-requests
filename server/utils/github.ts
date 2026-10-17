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
const RepoCache = new Map()

// Read more about caching functions https://hub.nuxt.com/docs/features/cache#server-functions-caching
export async function fetchRepo(owner: string, name: string) {
  if (RepoCache.has(`${owner}/${name}`)) {
    return RepoCache.get(`${owner}/${name}`)
  }
  // Fetch repository details to get owner type
  // Can 404 if the repo is deleted, renamed, or not visible to the token
  // Cache the promise so parallel calls for the same repo share one request
  const data = useOctokit().request('GET /repos/{owner}/{name}', {
    owner,
    name,
  }).then(res => res.data).catch(() => null)

  RepoCache.set(`${owner}/${name}`, data)
  return data
}
