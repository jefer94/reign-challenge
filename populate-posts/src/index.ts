import fetchPosts from "./fetchPosts"

fetchPosts()
setInterval(fetchPosts, 1000 * 3600) // 1 hour
