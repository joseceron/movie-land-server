import { MovieGetterUseCase } from '../../../application/useCases/MovieGetter'
import { MovieCreatorUseCase } from '../../../application/useCases/MovieCreator'
import { InMemoryMovieRepository } from '../../implementations/InMemory/InMemoryMovieRepository'
import { UuidV4Generator } from '../../Uuidv4Generator'

(async () => {
  const uuidV4Generator = new UuidV4Generator()
  const inMemoryMovieRepository = new InMemoryMovieRepository()

  const movieCreatorUseCase = new MovieCreatorUseCase(inMemoryMovieRepository, uuidV4Generator)
  await movieCreatorUseCase.run({
    title: 'Fast & furious',
    year: '2022'
  })
  const movieGetterUseCase = new MovieGetterUseCase(inMemoryMovieRepository)
  const movies = await movieGetterUseCase.run()
  console.log(movies)
})()
