const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export class ApiService {
  static async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
      },
    })
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }

  static async post<T, D>(endpoint: string, data: D): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }
}