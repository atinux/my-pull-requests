import { Octokit } from 'octokit'

export default defineCachedEventHandler(async () => {
  const octokit = new Octokit({
    auth: process.env.NUXT_GITHUB_TOKEN,
  })
  // Fetch user from token
  const userResponse = await octokit.request('GET /user')
  const user = {
    name: userResponse.data.name ?? userResponse.data.login,
    username: userResponse.data.login,
    avatar: userResponse.data.avatar_url,
  }
  // Fetch pull requests from user
  const { data } = await octokit.request('GET /search/issues', {
    q: `type:pr+author:"${user.username}"+-user:"${user.username}"`,
    per_page: 50,
    page: 1,
  })

  const prs = await Promise.all(
    data.items
      .filter(pr => !(pr.state === 'closed' && !pr.pull_request?.merged_at))
      .map(async pr => {
        const [owner, repo] = pr.repository_url.split('/').slice(-2)
        
        // Fetch repository details to get owner type
        const { data: repoDetails } = await octokit.request('GET /repos/{owner}/{repo}', {
          owner,
          repo,
        })

        return {
          repo: `${owner}/${repo}`,
          title: pr.title,
          url: pr.html_url,
          created_at: pr.created_at,
          state: pr.pull_request?.merged_at ? 'merged' : pr.state,
          number: pr.number,
          type: repoDetails.owner.type, // Add type information (User or Organization)
        }
      })
  )

  return {
    user,
    prs,
  }
}, {
  group: 'api',
  name: 'contributions',
  getKey: () => 'all',
  swr: true,
  maxAge: 60 * 5, // 5 minutes
})
