export async function getJobList() {
  const response = await fetch('./data.json')
  if (!response.ok) {
    throw new Error('cannot retrieve job listing')
  }
  return response.json()
}
