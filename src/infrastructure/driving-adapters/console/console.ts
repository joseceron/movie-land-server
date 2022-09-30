import { InMemoryMovieRepository } from '../../implementations/InMemory/InMemoryMovieRepository'
import { UuidV4Generator } from '../../Uuidv4Generator'

import { MovieCreatorUseCase } from '../../../application/useCases/MovieCreator'
import { MovieGetterUseCase } from '../../../application/useCases/MovieGetter'
import { MovieUpdaterUseCase } from '../../../application/useCases/MovieUpdater'
import { MovieDeleterUseCase } from '../../../application/useCases/MovieDeleter'

(async () => {
  const uuidV4Generator = new UuidV4Generator()
  const inMemoryMovieRepository = new InMemoryMovieRepository()

  const movieCreatorUseCase = new MovieCreatorUseCase(inMemoryMovieRepository, uuidV4Generator)
  await movieCreatorUseCase.run({
    title: 'Fast & furious',
    year: '2022'
  })
  // Getting movies
  const movieGetterUseCase = new MovieGetterUseCase(inMemoryMovieRepository)
  const movies = await movieGetterUseCase.run()
  console.log(movies)

  // Updating movies
  console.log('update---')
  const movieUpdaterUseCase = new MovieUpdaterUseCase(inMemoryMovieRepository)
  await movieUpdaterUseCase.run({
    id: movies[0].id,
    title: 'movie updated'
  })

  const movies2 = await movieGetterUseCase.run()
  console.log(movies2)

  // Delete a movie
  console.log('delete---')
  const movieDeleterUseCase = new MovieDeleterUseCase(inMemoryMovieRepository)
  await movieDeleterUseCase.run(movies[0].id)
  const movies3 = await movieGetterUseCase.run()
  console.log(movies3)
})()
