export default defineEventHandler(async () => {
  const octokit = useOctokit()
  const userResponse = await octokit.request('GET /user')
  const user: User = {
    name: userResponse.data.name ?? userResponse.data.login,
    username: userResponse.data.login,
    avatar: userResponse.data.avatar_url,
  }

  const { data } = await octokit.request('GET /search/issues', {
    q: `type:issue+author:"${user.username}"`,
    per_page: 50,
    page: 1,
    advanced_search: 'true',
  })

  const issues: Issue[] = []
  for (const issue of data.items) {
    const [owner, name] = issue.repository_url.split('/').slice(-2)
    const repo = await fetchRepo(owner!, name!)

    issues.push({
      repo: `${owner}/${name}`,
      title: issue.title,
      url: issue.html_url,
      created_at: issue.created_at,
      state: issue.state as 'open' | 'closed',
      number: issue.number,
      type: repo.owner.type,
      stars: repo.stargazers_count,
    })
  }

  return { user, issues } as Issues
})
