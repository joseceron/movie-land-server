import request from 'supertest'
import { Server } from '../../Server'

const PORT = process.env.PORT ?? '2426'
const server = new Server(PORT)
const app = server._app

let movieId: String = ''

describe('Test GET/movies', () => {
  test('It should response with 200 success', async () => {
    const response = await request(app)
      .get('/movies')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(Array.isArray(response.body)).toBe(true)
  })
})

describe('Test POST /movies', () => {
  const completeMovieData = {
    title: 'movieTest',
    year: '1900'
  }
  test('It should respond with 201 created', async () => {
    const response = await request(app)
      .post('/movies')
      .send(completeMovieData)
      .expect('Content-Type', /json/)
      .expect(201)

    const body = response.body
    movieId = body.id

    expect(Object.keys(body).length).toBe(3)
    expect(body).toMatchObject(completeMovieData)
  })
})

describe('Test GET /movies:movieId', () => {
  test('It should get movie by movieId', async () => {
    const response = await request(app)
      .get(`/movies/${movieId}`)
      .expect('Content-Type', /json/)
      .expect(200)

    const body = response.body
    const keysSize = Object.keys(body).length
    expect(keysSize).toBe(3)
    expect(body.id).toBe(movieId)
  })
})

describe('Test PUT /movies', () => {
  const movieUpdateData = {
    title: 'movieTestUpdated!',
    year: '1950'
  }
  test('It should update the movie', async () => {
    const response = await request(app)
      .put(`/movies/${movieId}`)
      .send(movieUpdateData)
      .expect('Content-Type', /json/)
      .expect(200)

    const body = response.body
    expect(Object.keys(body).length).toBe(3)
  })
})

describe('Test DELETE /movies', () => {
  test('It should respond with 204', async () => {
    const response = await request(app)
      .delete(`/movies/${movieId}`)
      .expect(204)
    expect(response.noContent).toBe(true)
  })
})
